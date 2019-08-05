import Document, {Html, Head, Main, NextScript} from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='ko'>
        <Head>
          <base href='/' />
          <meta name='robots' content='index,follow' />
          <meta name='author' content='Google' />
          <meta name='keywords' content='nextjs,material,components,react' />
          <meta name='description' content='MDC React example with next.js!' />
          <link rel='icon' href='/static/favicon.ico' />
          <link rel='stylesheet' href='/static/reset.css' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
