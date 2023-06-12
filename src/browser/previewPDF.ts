import puppeteer from 'puppeteer';
import {
  CHROMIUM_PATH,
  margins,
  pageHeight,
  pageWidth,
  setWindowProperty,
} from './helpers';
import ServiceNames from '../common/service-names';
import templates from '../templates';
import config from '../common/config';
import renderTemplate, {
  getHeaderAndFooterTemplates,
} from '../server/render-template';

const previewPdf = async (
  url: string,
  templateConfig: { service: ServiceNames; template: string },
  templateData: Record<string, unknown>,
  orientationOption?: boolean
) => {
  const browserMargins = {
    ...margins,
    ...templates?.[templateConfig.service]?.[templateConfig.template]
      ?.browserMargins,
  };
  const landscape =
    typeof orientationOption !== 'undefined'
      ? orientationOption
      : templates?.[templateConfig.service]?.[templateConfig.template]
          ?.landscape;
  const browser = await puppeteer.launch({
    headless: true,
    ...(config?.IS_PRODUCTION
      ? {
          // we have a different dir structure than pupetter expects. We have to point it to the correct chromium executable
          executablePath: CHROMIUM_PATH,
        }
      : {}),
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: pageWidth, height: pageHeight });
  await page.setContent(renderTemplate(templateConfig, templateData));

  // // Enables console logging in Headless mode - handy for debugging components
  page.on('console', (msg) => console.log(`[Headless log] ${msg.text()}`));
  const { headerTemplate, footerTemplate } =
    getHeaderAndFooterTemplates(templateConfig);

  await setWindowProperty(
    page,
    'customPuppeteerParams',
    JSON.stringify({
      puppetteerParams: {
        pageWidth,
        pageHeight,
      },
    })
  );

  const pageStatus = await page.goto(url, { waitUntil: 'networkidle2' });

  const pdfBuffer = await page.pdf({
    format: 'a4',
    printBackground: true,
    margin: browserMargins,
    displayHeaderFooter: true,
    headerTemplate,
    footerTemplate,
    landscape,
  });

  if (!pageStatus?.ok()) {
    throw new Error(
      `Pupeteer error while loading the react app: ${pageStatus?.statusText()}`
    );
  }

  await browser.close();
  return pdfBuffer;
};

export default previewPdf;
