import { getAll } from '../repos/blogs';
import { getCssString } from '../stitches.config';
import { BlogScreenshot } from './post-screenshot';
import fs from 'fs';
import puppeteer from 'puppeteer';
import { renderToStaticMarkup } from 'react-dom/server';

const createScreenshot =
  (page: puppeteer.Page) => async (html: string, slug: string) => {
    const htmlContent = `
  <!doctype html>
  <html>
    <head><meta charset='UTF-8'><title>Test</title></head>
    <style
     id="stitches"
    >${getCssString()}</style>
    
    <style>    
      * {
        box-sizing: border-box;
      }
    </style>
    <body>${html}</body>
  </html>
`;

    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 3 });
    await page.setContent(htmlContent);

    const rootElement = await page.$('#root');

    await rootElement.screenshot({ path: `./public/socialImages/${slug}.png` });
  };

export async function generateSocialCards() {
  const { CHROME_TOKEN } = process.env;

  if (!CHROME_TOKEN) {
    throw Error('The CHROME_TOKEN environment variable is not set');
  }

  fs.mkdirSync('./public/socialImages', { recursive: true });

  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.lab.incipher.io?token=${CHROME_TOKEN}`,
  });
  const page = await browser.newPage();

  const htmlPosts = (await getAll()).map((blog) => [
    renderToStaticMarkup(<BlogScreenshot blog={blog} />),
    blog.slug,
  ]);

  const screenshot = createScreenshot(page);

  for (const [html, slug] of htmlPosts) {
    await screenshot(html, slug);
  }

  await page.close();
  await browser.close();

  console.log('Social images generated correctly');
}
