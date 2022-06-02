const puppeteer = require('puppeteer');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

describe('demo template visual regression testing', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
    });
  });

  afterAll(async () => {
    await browser.close()
  })

  test('foo', () => {
    expect(true).toBe(true);
  });
});
