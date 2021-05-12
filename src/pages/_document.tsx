import '../rss';
import { getCssString } from '../stitches.config';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssString() }}
          />

          <link rel="icon" href="/favicon.svg" crossOrigin="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
