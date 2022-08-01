import express, { Request } from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import atob from 'atob';
import { performance } from 'perf_hooks';
import promBundle from 'express-prom-bundle';

import logger from './logger';
import generatePdf, { previewPdf } from '../browser';
import { PDFNotFoundError, SendingFailedError } from './errors';
import getTemplateData from './data-access';
import renderTemplate from './render-template';
import ServiceNames from './data-access/service-names';
import config from './config';
import { processOrientationOption } from '../browser/helpers';

const PORT = config.webPort;
const APIPrefix = '/api/crc-pdf-generator/v1';
type PreviewOptions = unknown;
type ReqQuery = {
  orientation?: string;
  template?: string;
};
export type PreviewHandlerRequest = Request<
  PreviewOptions,
  any,
  unknown,
  ReqQuery
>;

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(logger);

// Middlware that activates on all routes, responsible for rendering the correct
// template/component into html to the requester.
app.use('^/$', async (req, res, _next) => {
  let template: ServiceNames = req.query.template as ServiceNames;
  if (!template) {
    console.info('Missing template, using "demo"');
    template = ServiceNames.vulnerability;
  }
  try {
    const templateData = await getTemplateData(req.headers, template);
    const HTMLTemplate: string = renderTemplate(
      template,
      templateData as Record<string, unknown>
    );
    res.send(HTMLTemplate);
  } catch (error) {
    res.send(`<div>Unable to render ${template}!</div>`);
    console.error(error);
  }
});

app.get(`${APIPrefix}/hello`, (req, res) => {
  return res.status(200).send('<h1>Well this works!</h1>');
});

app.post(`${APIPrefix}/generate`, async (req, res) => {
  const rhIdentity = req.headers['x-rh-identity'] as string;
  const orientationOption = processOrientationOption(req);

  if (!rhIdentity) {
    return res.status(401).send('Unauthorized access not allowed');
  }

  const template: ServiceNames = req.query.template as ServiceNames;

  const tenant = JSON.parse(atob(rhIdentity))['identity']['internal']['org_id'];
  const url = `http://localhost:${PORT}?template=${template}`;

  try {
    const startGeneration = performance.now();
    let elapsed = performance.now() - startGeneration;
    console.info('info', `Total Data collection time: ${elapsed} ms`, {
      tenant,
      elapsed,
    });

    // Generate the pdf
    const startRender = performance.now();
    const pathToPdf = await generatePdf(
      url,
      rhIdentity,
      template,
      orientationOption
    );
    elapsed = performance.now() - startRender;
    console.info('info', `Total Rendering time: ${elapsed} ms`, {
      tenant,
      elapsed,
    });

    const pdfFileName = pathToPdf.split('/').pop();

    if (!fs.existsSync(pathToPdf)) {
      throw new PDFNotFoundError(pdfFileName);
    }

    console.info('info', `${pdfFileName} has been created.`, { tenant });
    console.info('info', `Sending ${pdfFileName} to the client.`, { tenant });

    res.status(200).sendFile(pathToPdf, (err) => {
      if (err) {
        const errorMessage = new SendingFailedError(pdfFileName, err);
        console.info('error', errorMessage.message, { tenant });
        throw errorMessage;
      }

      fs.unlink(pathToPdf, (err) => {
        if (err) {
          console.info('warn', `Failed to unlink ${pdfFileName}: ${err}`, {
            tenant,
          });
        }
        console.info('info', `${pdfFileName} finished downloading.`, {
          tenant,
        });
      });
    });

    elapsed = performance.now() - startGeneration;
    console.info(
      'info',
      `Total Data collection + PDF Rendering + Download time: ${elapsed} ms`,
      { tenant, elapsed }
    );
  } catch (error) {
    console.info('error', `${error.code}: ${error.message}`, { tenant });
    res.status((error.code as number) || 500).send(error.message);
  }
});

app.get(`/preview`, async (req: PreviewHandlerRequest, res) => {
  const template: ServiceNames = req.query.template as ServiceNames;
  const templateData = await getTemplateData(req.headers, template);
  const orientationOption = processOrientationOption(req);

  const url = `http://localhost:${PORT}?template=${template}`;
  try {
    const startGeneration = performance.now();
    let elapsed = performance.now() - startGeneration;
    console.info('info', `Total Data collection time: ${elapsed} ms`, {
      elapsed,
    });

    // Generate the pdf
    const startRender = performance.now();

    const pdfBuffer = await previewPdf(
      url,
      template,
      templateData as Record<string, unknown>,
      orientationOption // could later turn into a full options object for other things outside orientation.
    );
    res.set('Content-Type', 'application/pdf');
    res.status(200).send(pdfBuffer);

    elapsed = performance.now() - startRender;
    console.info('info', `Total Rendering time: ${elapsed} ms`, {
      elapsed,
    });

    elapsed = performance.now() - startGeneration;
    console.info(
      'info',
      `Total Data collection + PDF Rendering + Download time: ${elapsed} ms`,
      { elapsed }
    );
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
