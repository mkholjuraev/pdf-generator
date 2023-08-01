import WP from 'workerpool';
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import fse from 'fs-extra';
import os from 'os';
import fs from 'fs';
import {
  CHROMIUM_PATH,
  TemplateConfig,
  createCacheKey,
  getViewportConfig,
  pageHeight,
  pageWidth,
  setWindowProperty,
} from './helpers';
import { getHeaderAndFooterTemplates } from '../server/render-template';
import config from '../common/config';

// 10 minutes cache
const CACHE_TIMEOUT = 10 * 60 * 10000;

const redirectFontFiles = async (request: puppeteer.HTTPRequest) => {
  if (request.url().endsWith('.woff') || request.url().endsWith('.woff2')) {
    const modifiedUrl = request.url().replace(/^http:\/\/localhost:8000\//, '');
    const fontFile = `./dist/${modifiedUrl}`;
    fs.readFile(fontFile, async (err, data) => {
      if (err) {
        await request.respond({
          status: 404,
          body: `An error occurred while loading font ${modifiedUrl} : ${err}`,
        });
      }
      await request.respond({
        body: data,
        status: 200,
      });
    });
  } else {
    await request.continue();
  }
};

const generateCache: {
  [cacheKey: string]: {
    promiseLock: Promise<string>;
    expiration: number;
  };
} = {};

function cleanStaleCache(cacheKey: string, fileName: string) {
  setTimeout(() => {
    console.info('Calling clean stale cache for: ', fileName);
    delete generateCache[cacheKey];
    fse.unlink(fileName, (err) => {
      if (err) {
        console.info('warn', `Failed to unlink ${fileName}: ${err}`);
      }
    });
  }, CACHE_TIMEOUT);
}

async function retrieveFilenameFromCache(cacheKey: string) {
  const entry = generateCache[cacheKey];
  if (!entry) {
    return;
  }
  const fileName = await entry.promiseLock;
  // do not return if file does not exist
  if (!fse.existsSync(fileName)) {
    return;
  }
  if (entry.expiration < Date.now()) {
    delete generateCache[cacheKey];
    fse.unlink(fileName, (err) => {
      if (err) {
        console.info('warn', `Failed to unlink ${fileName}: ${err}`);
      }
    });
    return;
  }

  return entry.promiseLock;
}

function fillCache(cacheKey: string, promiseLock: Promise<string>) {
  const entry = generateCache[cacheKey];
  if (entry) {
    return;
  }
  // add 10 minutes cache expiration
  const expiration = new Date(Date.now() + CACHE_TIMEOUT);
  generateCache[cacheKey] = {
    expiration: expiration.getTime(),
    promiseLock,
  };
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  promiseLock.then((filename) => {
    cleanStaleCache(cacheKey, filename);
  });
}

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
  templateConfig: TemplateConfig;
  templateData: Record<string, unknown>;
  orientationOption?: boolean;
  rhIdentity: string;
  dataOptions: Record<string, any>;
}) => {
  const cacheKey = createCacheKey({
    templateConfig,
    orientationOption,
    url,
    rhIdentity,
    dataOptions,
  });
  try {
    const fileName = await retrieveFilenameFromCache(cacheKey);
    if (fileName) {
      console.log(`${fileName} found in cache. No new generation needed`);
      return fileName;
    }
  } catch (error) {
    console.error(
      `Unable to retrieve cache ${error}. Generating report from scratch.`
    );
  }

  const pdfPath = getNewPdfName();
  const createFilename = async () => {
    const { browserMargins, landscape } = getViewportConfig(
      templateConfig,
      orientationOption
    );
    const browserUrl = 'http://127.0.0.1:29222';
    let browser: puppeteer.Browser;
    try {
      browser = await puppeteer.connect({
        browserURL: browserUrl,
      });
      console.log(`reusing browser connection`);
    } catch (error) {
      console.error(`could not fetch browser status; starting a new browser`);
      browser = await puppeteer.launch({
        headless: true,
        ...(config?.IS_PRODUCTION
          ? {
              // we have a different dir structure than puppeteer expects. We have to point it to the correct chromium executable
              executablePath: CHROMIUM_PATH,
            }
          : {}),
        args: [
          '--no-sandbox',
          '--disable-gpu',
          '--remote-debugging-port=29222',
          '--no-zygote',
          '--no-first-run',
          '--disable-dev-shm-usage',
          '--single-process',
          '--mute-audio',
          "--proxy-server='direct://'",
          '--proxy-bypass-list=*',
          '--user-data-dir=/tmp/',
        ],
      });
    }

    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
    );

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
      // }) as undefined // probably a typings issue in puppeteer
    );

    await page.setExtraHTTPHeaders({
      ...(dataOptions
        ? {
            [config?.OPTIONS_HEADER_NAME as string]:
              JSON.stringify(dataOptions),
          }
        : {}),

      ...(config?.IS_DEVELOPMENT && !rhIdentity
        ? {}
        : { 'x-rh-identity': rhIdentity }),
    });

    // Intercept font requests from chrome and send them from dist
    await page.setRequestInterception(true);
    page.on('request', async (request) => {
      await redirectFontFiles(request);
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
        `Puppeteer error while loading the react app: ${pageStatus?.statusText()}`
      );
    }

    const { headerTemplate, footerTemplate } =
      getHeaderAndFooterTemplates(templateConfig);

    try {
      await page.pdf({
        path: pdfPath,
        format: 'a4',
        printBackground: true,
        margin: browserMargins,
        displayHeaderFooter: true,
        headerTemplate,
        footerTemplate,
        landscape,
        timeout: 45_000,
      });
    } catch (error: any) {
      throw new Error(`Failed to print pdf: ${error.message || error}`);
    } finally {
      await page.close();
      browser.disconnect();
    }

    return pdfPath;
  };

  const promiseLock = createFilename();
  fillCache(cacheKey, promiseLock);
  return promiseLock;
};

// register new worker to pool
WP.worker({
  generatePdf,
});
