import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import atob from 'atob';
import os from 'os';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import logger from './logger';
import App from '../src/App';
import generatePdf from '../browser';

const PORT = process.env.PORT || 8888;
const APIPrefix = '/api/tower-analytics/v1';

const app = express();
app.use(cors());
app.use(express.json()); // body parser is deprecated
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : os.tmpdir(),
}));

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

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.post(`${APIPrefix}/generate_pdf/`, async (req, res) => {
  const rhIdentity = req.headers['x-rh-identity'];

  if (!rhIdentity) {
      return res.status(401).send('Unauthorized access not allowed');
  }

  const tenant = JSON.parse(atob(rhIdentity))['identity']['internal']['org_id'];
  const url = `http://localhost:${PORT}`;

  try {
    const pathToPdf = await generatePdf(url, req.body);
    const pdfFilename = pathToPdf.split('/').pop();

    if (!fs.existsSync(pathToPdf)) {
      throw new Error(`${pdfFilename} does not exist on the server.`);
    }

    logger.info(`${pdfFilename} has been created.`, { tenant });
    logger.info(`Sending ${pdfFilename} to the client.`, { tenant });

    res.status(200).sendFile(pathToPdf, err => {
      if (err) {
        throw new Error(`Sending of ${pdfFilename} failed: ${err}`, { tenant });
      }
      
      fs.unlink(pathToPdf, err => {
        if (err) {
          logger.warn(`Failed to unlink ${pdfFilename}: ${err}`, { tenant });
        }
        logger.info(`${pdfFilename} finished downloading.`, { tenant });
      });
    });

  } catch (error) {
    logger.error(`${error}`, { tenant });
    res.status(500).json({ error });
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
