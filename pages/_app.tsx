import {
  createDOMRenderer,
  FluentProvider,
  GriffelRenderer,
  SSRProvider,
  RendererProvider,
  webLightTheme,
} from '@fluentui/react-components';
import type {AppProps} from 'next/app';
import Head from "next/head";

type EnhancedAppProps = AppProps & { renderer?: GriffelRenderer };

function MyApp({Component, pageProps, renderer}: EnhancedAppProps) {
  return (
    <>
      <Head>
        <meta name="description" content="flymyd 下北沢研究所"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.png"/>
      </Head>
      <RendererProvider renderer={renderer || createDOMRenderer()}>
        <SSRProvider>
          <FluentProvider theme={webLightTheme}>
            <Component {...pageProps} />
          </FluentProvider>
        </SSRProvider>
      </RendererProvider>
    </>
  );
}

export default MyApp;
