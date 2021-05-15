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

    <style>
      @font-face {
        font-family: 'iA Writer Mono S';
        /* TODO: Load iA Writer Mono S instead of iAWriter Duospace */
        src: url('https://fonts.cdnfonts.com/s/18144/iAWriterDuospace-Regular.woff');
        font-style: normal;
        font-weight: 400;
        font-display: swap;
      }

      @font-face {
        font-family: 'iA Writer Mono S';
        /* TODO: Load iA Writer Mono S instead of iAWriter Duospace */
        src: url('https://fonts.cdnfonts.com/s/18144/iAWriterDuospace-Bold.woff');
        font-style: 'bold';
        font-weight: '500';
        font-display: swap;
      }

      @font-face {
        font-family: 'GT Walsheim Pro';
        src: url('https://fonts.cdnfonts.com/s/25964/GTWalsheimProRegular.woff');
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: 'GT Walsheim Pro';
        src: url('https://fonts.cdnfonts.com/s/25964/GTWalsheimProBold.woff');
        font-weight: 700;
        font-style: normal;
      }
    </style>

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
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

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
