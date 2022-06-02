import puppeteer, { Browser, Page } from "puppeteer";

const margins = {
  top: '2cm',
  bottom: '2cm',
  right: '1cm',
  left: '1cm',
};

describe('demo template visual regression testing', () => {
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

  test('foo', async () => {
    await page.goto(`${global.SEVER_HOST}/?template=demo`, {
      waitUntil: 'networkidle2',
    });

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      failureThresholdType: 'pixel',
      failureThreshold: 100,
    });
  });
});
