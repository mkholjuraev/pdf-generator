const puppeteer = require('puppeteer');

describe('demo template visual regression testing', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('foo', async () => {
    await page.goto(`${SEVER_HOST}/?template=demo`);
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      failureThresholdType: 'pixel',
      failureThreshold: 100,
    });
  });
});
