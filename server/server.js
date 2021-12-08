import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import atob from 'atob';
import { performance } from 'perf_hooks';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import logger from './logger';
import App from '../src/App';
import generatePdf from '../browser';
import { PDFNotFoundError, SendingFailedError } from './errors';
import getParamsForGenerator from './aapScript';

const PORT = process.env.PORT || 8000;
const APIPrefix = '/api/tower-analytics/v1';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('^/$', (_req, res, _next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.error('Something went wrong while reading the file!', err);
      return res
        .status(500)
        .send('Something went wrong while reading the file!', err);
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${renderToStaticMarkup(<App />)}</div>`
      )
    );
  });
});

app.post(`${APIPrefix}/generate_pdf/`, async (req, res) => {
  const rhIdentity = req.headers['x-rh-identity'];

  if (!rhIdentity) {
    return res.status(401).send('Unauthorized access not allowed');
  }

  const tenant = JSON.parse(atob(rhIdentity))['identity']['internal']['org_id'];
  const url = `http://localhost:${PORT}`;

  try {
    // Custom script to get the params for our app
    const startGeneration = performance.now();
    const params = await getParamsForGenerator({ ...req.body, rhIdentity });
    let elapsed = performance.now() - startGeneration;
    logger.log('info', `Total Data collection time: ${elapsed} ms`, { tenant, elapsed });

    // Generate the pdf
    const startRender = performance.now();
    const pathToPdf = await generatePdf(url, params);
    elapsed = performance.now() - startRender;
    logger.log('info', `Total Rendering time: ${elapsed} ms`, { tenant, elapsed });

    const pdfFileName = pathToPdf.split('/').pop();

    if (!fs.existsSync(pathToPdf)) {
      throw new PDFNotFoundError(pdfFileName);
    }

    logger.log('info', `${pdfFileName} has been created.`, { tenant });
    logger.log('info', `Sending ${pdfFileName} to the client.`, { tenant });

    res.status(200).sendFile(pathToPdf, (err) => {
      if (err) {
        throw new SendingFailedError(pdfFileName, err);
      }

      fs.unlink(pathToPdf, (err) => {
        if (err) {
          logger.log('warn', `Failed to unlink ${pdfFileName}: ${err}`, { tenant });
        }
        logger.log('info', `${pdfFileName} finished downloading.`, { tenant });
      });
    });
    elapsed = performance.now() - startGeneration;
    logger.log('info', `Total Data collection + PDF Rendering + Download time: ${elapsed} ms`, { tenant, elapsed });
  } catch (error) {
    logger.log('error', error.code + ': ' + error.message, { tenant });
    res.status(error.code).send(error.message);
  }
});

app.get('/healthz', (_req, res, _next) => {
  const indexHtml = path.resolve('./build/index.html');
  if (fs.existsSync(indexHtml)) {
    return res.status(200).send('Build assets available');
  }
});

if (process.env.NODE_ENV === 'development') {
  const checkForBuildAssets = setInterval(function () {
    const indexHtml = path.resolve('./build/index.html');
    if (fs.existsSync(indexHtml)) {
      clearInterval(checkForBuildAssets);
      logger.log('info', `Listening on port ${PORT}`);
    } else {
      logger.log('info', 'Waiting to start PDF API server');
    }
  }, 3000);

  app.listen(PORT, () => checkForBuildAssets);
} else {
  app.listen(PORT, () => logger.log('info', `Listening on port ${PORT}`));
}
