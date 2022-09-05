import express, { Request } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import atob from 'atob';
import promBundle from 'express-prom-bundle';
import type { IncomingHttpHeaders } from 'http';
import winston from 'winston';
import expressWinston from 'express-winston';

import config from './config';
import generatePdf, { previewPdf } from '../browser';
import { PDFNotFoundError, SendingFailedError } from './errors';
import getTemplateData from './data-access';
import renderTemplate from './render-template';
import ServiceNames from './data-access/service-names';
import { processOrientationOption } from '../browser/helpers';
import { getPolicyData } from './data-access/complianceDescriptor';

const PORT = config.webPort;
const APIPrefix = '/api/crc-pdf-generator/v1';
export const OPTIONS_HEADER_NAME = 'x-pdf-gen-options';
type PreviewOptions = unknown;
type ReqQuery = {
  orientation?: string;
  template: string;
  service: ServiceNames;
};
export type PreviewHandlerRequest = Request<
  PreviewOptions,
  any,
  unknown,
  ReqQuery
>;

export type GenerateHandlerReqyest = Request<
  unknown,
  unknown,
  Record<string, any>,
  { service: ServiceNames; template: string }
>;

export type HelloHandlerRequest = Request<
  unknown,
  unknown,
  unknown,
  { policyId: string; totalHostCount: number }
>;

export interface PupetterBrowserRequest
  extends Request<
    unknown,
    unknown,
    unknown,
    { service: ServiceNames; template: string }
  > {
  headers: IncomingHttpHeaders & {
    [OPTIONS_HEADER_NAME]?: string;
  };
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    requestWhitelist: ['url', 'method', 'httpVersion', 'originalUrl', 'query'],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: 'HTTP {{req.method}} {{req.url}}',
    expressFormat: true,
    colorize: false,
  })
);

// Middlware that activates on all routes, responsible for rendering the correct
// template/component into html to the requester.
app.use('^/$', async (req: PupetterBrowserRequest, res, _next) => {
  let service: ServiceNames = req.query.service;
  let template: string = req.query.template;
  if (!service) {
    console.info('Missing service, using "demo"');
    service = ServiceNames.demo;
  }
  if (!template) {
    console.info('Missing template, using "demo"');
    template = 'demo';
  }

  const templateConfig = {
    service,
    template,
  };
  try {
    const configHeaders: string | undefined = req.headers[OPTIONS_HEADER_NAME];
    if (configHeaders) {
      delete req.headers[OPTIONS_HEADER_NAME];
    }

    const templateData = await getTemplateData(
      req.headers,
      templateConfig,
      configHeaders ? JSON.parse(configHeaders) : undefined
    );
    const HTMLTemplate: string = renderTemplate(
      templateConfig,
      templateData as Record<string, unknown>
    );
    res.send(HTMLTemplate);
  } catch (error) {
    console.log(error);
    res.send(`<div>Unable to render ${template}!</div>`);
  }
});

app.get(`${APIPrefix}/hello`, async (req: HelloHandlerRequest, res) => {
  const rhIdentity = req.headers['x-rh-identity'] as string;
  const policyId = req.query.policyId;
  const totalHostCount = req.query.totalHostCount;
  try {
    await getPolicyData(
      { 'x-rh-identity': rhIdentity },
      { policyId, totalHostCount }
    );
  } catch (error) {
    console.log(error);
  }
  return res.status(200).send('<h1>Well this works!</h1>');
});

app.post(`${APIPrefix}/generate`, async (req: GenerateHandlerReqyest, res) => {
  const rhIdentity = req.headers['x-rh-identity'] as string;
  const orientationOption = processOrientationOption(req);

  if (!rhIdentity) {
    return res.status(401).send('Unauthorized access not allowed');
  }

  const service = req.body.service;
  const template = req.body.template;
  const dataOptions = req.body;

  const tenant = JSON.parse(atob(rhIdentity))['identity']['internal']['org_id'];
  const url = `http://localhost:${PORT}?template=${template}&service=${service}`;

  try {
    // Generate the pdf
    const pathToPdf = await generatePdf(
      url,
      rhIdentity,
      {
        service,
        template,
      },
      orientationOption,
      dataOptions
    );

    const pdfFileName = pathToPdf.split('/').pop();

    if (!fs.existsSync(pathToPdf)) {
      throw new PDFNotFoundError(pdfFileName);
    }

    res.status(200).sendFile(pathToPdf, (err) => {
      if (err) {
        const errorMessage = new SendingFailedError(pdfFileName, err);
        throw errorMessage;
      }

      fs.unlink(pathToPdf, (err) => {
        if (err) {
          console.info('warn', `Failed to unlink ${pdfFileName}: ${err}`, {
            tenant,
          });
        }
      });
    });
  } catch (error) {
    res.status((error.code as number) || 500).send(error.message);
  }
});

app.get(`/preview`, async (req: PreviewHandlerRequest, res) => {
  const service: ServiceNames = req.query.service;
  const template: string = req.query.service;
  const templateData = await getTemplateData(req.headers, {
    service,
    template,
  });
  const orientationOption = processOrientationOption(req);

  const url = `http://localhost:${PORT}?template=${template}`;
  try {
    const pdfBuffer = await previewPdf(
      url,
      {
        service,
        template,
      },
      templateData as Record<string, unknown>,
      orientationOption // could later turn into a full options object for other things outside orientation.
    );
    res.set('Content-Type', 'application/pdf');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.info('error', `${error.code}: ${error.message}`);
    res.status((error.code as number) || 500).send(error.message);
  }
});

app.get('/healthz', (_req, res, _next) => {
  return res.status(200).send('Build assets available');
});

app.listen(PORT, () => console.info('info', `Listening on port ${PORT}`));

const metricsApp = express();

const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  metricsPath: config.metricsPath,
  promClient: {
    collectDefaultMetrics: {},
  },
});

metricsApp.use(metricsMiddleware);
metricsApp.listen(config.metricsPort, () => {
  console.info(`Metrics server listening on port ${config.metricsPort}`);
});
