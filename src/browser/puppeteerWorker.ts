import WP from 'workerpool';
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import {
  CHROMIUM_PATH,
  getViewportConfig,
  pageHeight,
  pageWidth,
  setWindowProperty,
} from './helpers';
import { getHeaderAndFooterTemplates } from '../server/render-template';
import ServiceNames from '../common/service-names';
import config from '../common/config';

const getNewPdfName = () => {
  const pdfFilename = `report_${uuidv4()}.pdf`;
  return `${os.tmpdir()}/${pdfFilename}`;
};

const generatePdf = async ({
  url,
  rhIdentity,
  templateConfig,
  orientationOption,
  dataOptions,
}: {
  url: string;
  templateConfig: { service: ServiceNames; template: string };
  templateData: Record<string, unknown>;
  orientationOption?: boolean;
  rhIdentity: string;
  dataOptions: Record<string, any>;
}) => {
  const { browserMargins, landscape } = getViewportConfig(
    templateConfig,
    orientationOption
  );
  const pdfPath = getNewPdfName();
  const browser = await puppeteer.launch({
    headless: true,
    ...(config?.IS_PRODUCTION
      ? {
          // we have a different dir structure than puppeteer expects. We have to point it to the correct chromium executable
          executablePath: CHROMIUM_PATH,
        }
      : {}),
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();

  await page.setViewport({ width: pageWidth, height: pageHeight });

  // Enables console logging in Headless mode - handy for debugging components
  page.on('console', (msg) => console.log(`[Headless log] ${msg.text()}`));

  await setWindowProperty(
    page,
    'customPuppeteerParams',
    JSON.stringify({
      puppeteerParams: {
        pageWidth,
        pageHeight,
      },
    })
    // }) as undefined // probably a typings issue in pupetter
  );

  await page.setExtraHTTPHeaders({
    ...(dataOptions
      ? {
          [config?.OPTIONS_HEADER_NAME as string]: JSON.stringify(dataOptions),
        }
      : {}),

    ...(config?.IS_DEVELOPMENT && !rhIdentity
      ? {}
      : { 'x-rh-identity': rhIdentity }),
  });
  const pageStatus = await page.goto(url, { waitUntil: 'networkidle2' });
  // get the error from DOM if it exists
  const error = await page.evaluate(() => {
    const elem = document.getElementById('error');
    if (elem) {
      return elem.innerText;
    }
  });

  // error happened during page rendering
  if (error && error.length > 0) {
    let response: any;
    try {
      // error should be JSON
      response = JSON.parse(error);
    } catch {
      // fallback to initial error value
      response = error;
    }

    throw response;
  }
  if (!pageStatus?.ok()) {
    throw new Error(
      `Pupeteer error while loading the react app: ${pageStatus?.statusText()}`
    );
  }

  const { headerTemplate, footerTemplate } =
    getHeaderAndFooterTemplates(templateConfig);

  await page.pdf({
    path: pdfPath,
    format: 'a4',
    printBackground: true,
    margin: browserMargins,
    displayHeaderFooter: true,
    headerTemplate,
    footerTemplate,
    landscape,
  });

  await browser.close();
  return pdfPath;
};

// register new worker to pool
WP.worker({
  generatePdf,
});
