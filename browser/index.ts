import { replaceString } from './helpers';

import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid';
import os from 'os';
import { getHeaderandFooterTemplates } from '../server/render-template';
import { SupportedTemplates } from '../server/types';

const A4Width = 210;
const A4Height = 297;

const margins = {
  top: '2cm',
  bottom: '2cm',
  right: '1cm',
  left: '1cm',
};
// Get margin off and make it bigger resolution
const pageWidth = (A4Height - 20) * 4;
const pageHeight = (A4Width - 40) * 4;

const setWindowProperty = (
  page: puppeteer.Page,
  name: string,
  value: undefined
) =>
  page.evaluateOnNewDocument(`
    Object.defineProperty(window, '${name}', {
      get() {
        return '${replaceString(value)}'
      }
    })
  `);

const getNewPdfName = () => {
  const pdfFilename = `report_${uuidv4()}.pdf`;
  return `${os.tmpdir()}/${pdfFilename}`;
};

const generatePdf = async (
  url: string,
  rhIdentity: string,
  template: SupportedTemplates
) => {
  const pdfPath = getNewPdfName();

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();

  await page.setViewport({ width: pageWidth, height: pageHeight });

  // Enables console logging in Headless mode - handy for debugging components
  page.on('console', (msg) => console.log(`[Headless log] ${msg.text()}`));

  await setWindowProperty(
    page,
    'customPupeteerParams',
    JSON.stringify({
      pupeteerParams: {
        pageWidth,
        pageHeight,
      },
    }) as undefined // probably a typings issue in pupetter
  );

  await page.setExtraHTTPHeaders({
    'x-rh-identity': rhIdentity,
  });
  const pageStatus = await page.goto(url, { waitUntil: 'networkidle2' });
  if (!pageStatus.ok()) {
    throw new Error(
      `Pupeteer error while loading the react app: ${pageStatus.statusText()}`
    );
  }

  const { headerTemplate, footerTemplate } =
    getHeaderandFooterTemplates(template);

  await page.pdf({
    path: pdfPath,
    format: 'a4',
    printBackground: true,
    landscape: true,
    margin: margins,
    displayHeaderFooter: true,
    headerTemplate,
    footerTemplate,
  });

  await browser.close();
  return pdfPath;
};

export default generatePdf;

// Usage params:
// const pathToPdf = generatePdfFromHtml(url, {
//   slug: 'hosts_changed_by_job_template',
//   data: {/*api data*/},
//   label: 'Total unique hosts',
//   y: 'total_unique_host_count',
//   xTickFormat: 'formatDateAsDayMonth',
// });
