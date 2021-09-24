const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');
const os = require('os');

const A4Width = 210;
const A4Height = 297;

const setWindowProperty = (page, name, value) =>
  page.evaluateOnNewDocument(`
    Object.defineProperty(window, '${name}', {
      get() {
        return '${value}'
      }
    })
  `);

const getNewPdfName = () => {
  const pdfFilename = `report_${uuidv4()}.pdf`;
  return `${os.tmpdir()}/${pdfFilename}`;
}

const generatePdf = async (url, data) => {
  const pdfPath = getNewPdfName();

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-gpu']});
  const page = await browser.newPage();

  await page.setViewport({ width: A4Height * 5 - 20, height: A4Width * 5 - 10 });
  
  await setWindowProperty(page, 'customPupeteerParams', JSON.stringify(data));

  const pageStatus = await page.goto(url, { waitUntil: 'networkidle2' });
  if (!pageStatus.ok()) {
    throw new Error(`Pupeteer error while loading the react app: ${pageStatus.statusText()}`);
  }

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    landscape: true,
    margin: {
      top: '0.5cm',
      bottom: '0.5cm',
      right: '1cm',
      left: '1cm'
    }
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
