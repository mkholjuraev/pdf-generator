import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import atob from 'atob';
import { performance } from 'perf_hooks';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import logger from './logger';
import templateMapper from '../templates';
import generatePdf from '../browser';
import { PDFNotFoundError, SendingFailedError } from './errors';
import getTemplateData from './data-access';

const PORT = process.env.PORT || 8000;
const APIPrefix = '/api/tower-analytics/v1';

const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('^/$', (_req, res, _next) => {
  const App = templateMapper['automation-analytics']
  return res.send(
    `<div id="root">${renderToStaticMarkup(<App />)}</div>`
  )
});

app.post(`${APIPrefix}/generate_pdf`, async (req, res) => {
  const rhIdentity = req.headers['x-rh-identity'];

  if (!rhIdentity) {
    return res.status(401).send('Unauthorized access not allowed');
  }

  const tenant = JSON.parse(atob(rhIdentity as string))['identity']['internal']['org_id'];
  const url = `http://localhost:${PORT}`;

  try {
    // Custom script to get the params for our app
    const startGeneration = performance.now();
    const params = await getTemplateData('automation-analytics', { slug: 'aa_2_1_onboarding', ...req.body, rhIdentity, dataFetchingParams: {slug: 'changesMade'} });
    let elapsed = performance.now() - startGeneration;
    logger.log('info', `Total Data collection time: ${elapsed} ms`, {
      tenant,
      elapsed,
    });

    // Generate the pdf
    const startRender = performance.now();
    const pathToPdf = await generatePdf(url, params);
    elapsed = performance.now() - startRender;
    logger.log('info', `Total Rendering time: ${elapsed} ms`, {
      tenant,
      elapsed,
    });

    const pdfFileName = pathToPdf.split('/').pop();

    if (!fs.existsSync(pathToPdf)) {
      throw new PDFNotFoundError(pdfFileName);
    }

    logger.log('info', `${pdfFileName} has been created.`, { tenant });
    logger.log('info', `Sending ${pdfFileName} to the client.`, { tenant });

    res.status(200).sendFile(pathToPdf, (err) => {
      if (err) {
        const errorMessage = new SendingFailedError(pdfFileName, err);
        logger.log('error', errorMessage.message, { tenant });
        throw errorMessage;
      }

      fs.unlink(pathToPdf, (err) => {
        if (err) {
          logger.log('warn', `Failed to unlink ${pdfFileName}: ${err}`, {
            tenant,
          });
        }
        logger.log('info', `${pdfFileName} finished downloading.`, { tenant });
      });
    });

    elapsed = performance.now() - startGeneration;
    logger.log(
      'info',
      `Total Data collection + PDF Rendering + Download time: ${elapsed} ms`,
      { tenant, elapsed }
    );
  } catch (error) {
    logger.log('error', error.code + ': ' + error.message, { tenant });
    res.status(error.code).send(error.message);
  }
});

app.get('/healthz', (_req, res, _next) => {
  return res.status(200).send('Build assets available');
});

if (process.env.NODE_ENV === 'development') {
  app.listen(PORT, () => logger.log('info', `Listening on port ${PORT}`));
} else {
  app.listen(PORT, () => logger.log('info', `Listening on port ${PORT}`));
}
