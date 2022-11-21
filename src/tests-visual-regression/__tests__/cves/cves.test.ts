import puppeteer, { Browser, Page } from 'puppeteer';

describe('vulnerability CVES visual regression testing', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('pdf-preview', async () => {
    await page.goto(
      `${global.SEVER_HOST}/?service=vulnerability&template=cve`,
      {
        waitUntil: 'networkidle2',
      }
    );

    const image = await page.screenshot({
      fullPage: true,
    });
    expect(image).toMatchImageSnapshot({
      failureThresholdType: 'pixel',
      failureThreshold: 100,
    });
  });
});
