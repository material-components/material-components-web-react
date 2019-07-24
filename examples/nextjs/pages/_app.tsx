import React from 'react';
import App, {Container} from 'next/app';
import Head from 'next/head';

import './_mdc.css';

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return (
      <Container>
        <Head>
          <title>{'MDC React - ' + Component.name}</title>
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=5.0'
          />
        </Head>
        <Component {...pageProps} />
      </Container>
    );
  }
}
