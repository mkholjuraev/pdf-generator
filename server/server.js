import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import atob from 'atob';
import http from 'http';
import axios from 'axios';

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

  try {
    if (!reports.find(({ slug }) => slug === req.body.slug)) {
      throw new PDFNotImplementedError();
    }
    const queryParams = req.body.queryParams
    const fastApiUrl = `http://${req.body.apiHost}:${req.body.apiPort}${req.body.endpointUrl}?&sort_by=${sort_options}:${sort_order}`

    // get data for current report displayed in UI
    const promise = async () => {
      return await axios.post(`${fastApiUrl}&offset=${offset}&limit=${limit}`, queryParams)
      .then(async (response) => {
        return response.data
      })
      .catch((err) => {
        throw new PDFRequestError(err);
      });
    }

    const currentData = await promise().then((res) => {
      return res
    })

    let extraData = null;
    if (req.body.showExtraRows === 'True') {
      const excludeOthers = {'include_others': false}
      const promiseCount = currentData.meta.count-limit > 100 ? 4 : currentData.meta.count/25
      let newOffset = 0
      // get extra data
      const promises = [];
      for(let i=0; i<promiseCount; i++) {
        promises.push(axios.post(`${fastApiUrl}&offset=${newOffset}&limit=25`, {...excludeOthers, ...queryParams}))
        newOffset += 25
      }
      const allPromises = async () => {
        let data = {'meta': {}}
        return await Promise.all(promises)
          .then((response) => {
            data.meta.legend = response.map((p) => p.data.meta.legend);
            data.meta.legend = data.meta.legend.reduce((a, b) => a.concat(b), []);
            return data;
          })
          .catch((err) => {
            throw new PDFRequestError(err);
          })
      }

      extraData = await allPromises().then((res) => {
        return res
      })
    }

    const pathToPdf = await generatePdf(url, {
      data: currentData,
      extraData: extraData,
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
        logger.log('error', err, { tenant });
        throw new SendingFailedError(pdfFileName, err);
      }

      fs.unlink(pathToPdf, err => {
        if (err) {
          logger.warn(`Failed to unlink ${pdfFileName}: ${err}`, { tenant });
        }
        logger.info(`${pdfFileName} finished downloading.`, { tenant });
      });
    });
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
