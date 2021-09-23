import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import regeneratorRuntime from 'regenerator-runtime';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

const fs = require("fs");
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const atob = require('atob');
const os = require('os');
const https = require('https');
const puppeteer = require('puppeteer');

const defaultOptions = {
    format: "A4",
    printBackground: true,
    landscape: true,
    viewPortWidth: 1754,
    viewPortHeight: 1240
};

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : os.tmpdir(),
}));

app.use(express.json()); // body parser is deprecated

app.use(express.static(path.resolve(__dirname, '..', 'build')));

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}]: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: 'PDF API Server' }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});

const APIPrefix = '/api/tower-analytics/v1';

app.get(['/', '/example', '/report'], (req, res) => {
  const context = {};
  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Error while reading index file:', err);
      return res.status(500).send('Error while reading index file');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

const generatePdfFromHtml = async (req, res, report_name, render_component, api_data, options, tenant_id) => {
  const browser = await puppeteer.launch( {args: ['--no-sandbox', '--disable-gpu']} );

  const page = await browser.newPage();
  await page.setViewport({ width: options.viewPortWidth, height: options.viewPortHeight });

// For debugging
//  page.on('console', msg => console.log(msg.text()));

  const windowSet = (page, name, value) => {
    page.evaluateOnNewDocument(`
      Object.defineProperty(window, '${name}', {
        get() {
          return '${value}'
        }
      })
    `)
  };

  await windowSet(page, 'reportName', report_name);
  await windowSet(page, 'apiData', JSON.stringify(api_data));

  try {
    let url = '';
        switch(render_component) {
          case 'Example':
            url = `http://localhost:${port}/example`;
            break;
          case 'Report':
            url = `http://localhost:${port}/report`;
            break;
          default:
            url = `http://localhost:${port}/`;
        }
        const ssrResponse = await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('#root');

        const timeStamp = Date.now();
        const pdfFilename = `report_${timeStamp}.pdf`;

        const absolutePathPdfFile = `${os.tmpdir()}/${pdfFilename}`;

        await page.pdf({
          path: absolutePathPdfFile,
          format: options.format,
          printBackground: options.printBackground,
          landscape: options.landscape
        });

        await browser.close();

        if (ssrResponse._status !== 200) {
          const msg = `Server could not generate PDF. Error: ${ssrResponse._statusText}`;
          logger.error(msg, {"tenant": tenant_id});
          return res.status(500).send(msg);
        }

        if (fs.existsSync(absolutePathPdfFile)) {
          logger.info(`Created PDF: ${absolutePathPdfFile}`, {"tenant": tenant_id});

          logger.info(`Begin Download ${pdfFilename}`);
          res.status(200).sendFile(absolutePathPdfFile, err => {
              if (err) {
                    logger.error(`Download failed: ${err}`, {"tenant": tenant_id});
                        return res.status(500).send(err);
              }
              fs.unlink(absolutePathPdfFile, err => {
                  if (err) {
                        logger.warn(`File unlink failed: ${err}`, {"tenant": tenant_id});
                  }
                  logger.info(`End Download ${pdfFilename}`);
              });
          });
        } else {
            const msg = `${pdfFilename} does not exist on the server`;
            logger.warn(msg, {"tenant": tenant_id});
            return res.status(404).send(msg);
        }

        } catch(err) {
            logger.error(`${err}`, {"tenant": tenant_id})
            res.status(500).json({error: err});
        }
};

// `/healthz` route required for Readiness/Liveness probe in Stage/Prod
app.get('/healthz', (req, res) => {
    const indexHtml = path.resolve('./build/index.html');
    if (fs.existsSync(indexHtml)) {
        return res.status(200).send('Build assets available');
    }
});

app.post(`${APIPrefix}/generate_pdf/`, (req, res) => {
    const rhIdentity = req.headers['x-rh-identity'];

    if (!rhIdentity) {
        return res.status(401).send('Unauthorized access not allowed');
    }

    const tenant_id = JSON.parse(atob(rhIdentity))['identity']['internal']['org_id'];

    // styling_options
    let options = defaultOptions;
    const {format, printBackground, landscape, viewPortWidth, viewPortHeight} = req.body.styling_options;
    logger.info(`styling_options=[format|printBackground|landscape|viewPortWidth|viewPortHeight]:
                [${format}|${printBackground}|${landscape}|${viewPortWidth}|${viewPortHeight}]`,
        {"tenant": tenant_id});

    options.format = format || defaultOptions.format;
    options.printBackground = printBackground || defaultOptions.printBackground;
    options.landscape = landscape || defaultOptions.landscape;

    const {report_name, render_component, api_data} = req.body;

    // Render details
    logger.info(`render details=[report_name|render_component]:
                [${report_name}|${render_component}]`,
        {"tenant": tenant_id});

    try {
        return generatePdfFromHtml(req, res, report_name, render_component, api_data, options, tenant_id);
    }
    catch (err) {
        logger.error(`${err}`, {"tenant": tenant_id})
        res.status(500).json({error: err});
    }
});


if (process.env.NODE_ENV === 'development') {
    // For Development environment only
    const checkForBuildAssets = setInterval(function() {
    const indexHtml = path.resolve('./build/index.html');
    if (fs.existsSync(indexHtml)) {
        clearInterval(checkForBuildAssets);
        logger.info(`Listening on port ${port}`)
    } else {
         logger.info('Waiting to start PDF API server')
    }
   }, 3000);
    app.listen(port, () => checkForBuildAssets);
} else {
    app.listen(port, () => logger.info(`Listening on port ${port}`));
}
