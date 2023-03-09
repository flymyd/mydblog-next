import 'reset-css';
import '@/styles/globals.css'
import {
  createDOMRenderer,
  FluentProvider,
  GriffelRenderer,
  SSRProvider,
  RendererProvider,
  webLightTheme, ProgressBar,
} from '@fluentui/react-components';
import type {AppProps} from 'next/app';
import Head from "next/head";
import {useEffect, useState} from "react";
import {Router} from "next/router";

type EnhancedAppProps = AppProps & { renderer?: GriffelRenderer };

function MyApp({Component, pageProps, renderer}: EnhancedAppProps) {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const start = () => setLoading(true)
    const end = () => setLoading(false)
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])
  return (
    <>
      <Head>
        <meta name="description" content="flymyd 下北沢研究院"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.png"/>
      </Head>
      <RendererProvider renderer={renderer || createDOMRenderer()}>
        <SSRProvider>
          <FluentProvider theme={webLightTheme}>
            {/*{loading ? <ProgressBar thickness="large" /> : <div className="loading-placeholder" style={{height: 4}}></div>}*/}
            <div style={{position: 'fixed', width: '100%', zIndex: 100}}>
              {loading && <ProgressBar thickness="large"></ProgressBar>}
            </div>
            <div>
              <Component {...pageProps} />
            </div>
          </FluentProvider>
        </SSRProvider>
      </RendererProvider>
    </>
  );
}

export default MyApp;
