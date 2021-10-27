import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import atob from 'atob';
import http from 'http';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import logger from './logger';
import App from '../src/App';
import generatePdf from '../browser';
import reports from '../src/pdf/schemas';
import {
  PDFNotImplementedError,
  PDFNotFoundError,
  SendingFailedError, PDFRequestError,
} from './errors';

const PORT = process.env.PORT || 8000;
const APIPrefix = '/api/tower-analytics/v1';

const FASTAPI_HOST = process.env.FASTAPI_HOST || 'fastapi';
const FASTAPI_PORT = process.env.FASTAPI_PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use('^/$', (_req, res, _next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.error('Something went wrong while reading the file!', err);
      return res.status(500).send('Something went wrong while reading the file!', err);
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
  const {offset, limit, sort_options, sort_order} = req.body.queryParams
  const options = {
    hostname: FASTAPI_HOST,
    port: FASTAPI_PORT,
    path: `${req.body.endpointUrl}?offset=${offset}&limit=${limit}&sort_by=${sort_options}:${sort_order}`,
    protocol: 'http:',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rh-identity': rhIdentity
    }
  }

  try {
    if (!reports.find(({ slug }) => slug === req.body.slug)) {
      throw new PDFNotImplementedError();
    }

    const pdfRequest = http.request(options, async (resp) => {
      let data = '';
      resp.on('data', chunk => {
        data += chunk;
      });

      resp.on('end', async () => {

        const pathToPdf = await generatePdf(url, {
          data: JSON.parse(data),
          slug: req.body.slug,
          label: req.body.label,
          y: req.body.y,
          x_tick_format: req.body.x_tick_format}
        );
        const pdfFileName = pathToPdf.split('/').pop();

        if (!fs.existsSync(pathToPdf)) {
          throw new PDFNotFoundError(pdfFileName);
        }

        logger.info(`${pdfFileName} has been created.`, { tenant });
        logger.info(`Sending ${pdfFileName} to the client.`, { tenant });

        res.status(200).sendFile(pathToPdf, err => {
          if (err) {
            throw new SendingFailedError(pdfFileName, err);
          }

          fs.unlink(pathToPdf, err => {
            if (err) {
              logger.warn(`Failed to unlink ${pdfFileName}: ${err}`, { tenant });
            }
            logger.info(`${pdfFileName} finished downloading.`, { tenant });
          });
        });
      });
    })

    pdfRequest.on("error", (err) => {
      throw new PDFRequestError(err.message);
    });

    pdfRequest.write(JSON.stringify(req.body.queryParams));
    pdfRequest.end();
  } catch (error) {
    logger.error(error.code + ': ' + error.message);
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
  const checkForBuildAssets = setInterval(function() {
    const indexHtml = path.resolve('./build/index.html');
    if (fs.existsSync(indexHtml)) {
      clearInterval(checkForBuildAssets);
      logger.info(`Listening on port ${PORT}`)
    } else {
      logger.info('Waiting to start PDF API server')
    }
  }, 3000);
  
  app.listen(PORT, () => checkForBuildAssets);
} else {
  app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
}
