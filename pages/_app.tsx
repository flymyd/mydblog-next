import 'reset-css';
import '@/styles/globals.css'
import {
  createDOMRenderer,
  FluentProvider,
  GriffelRenderer,
  SSRProvider,
  RendererProvider,
  webLightTheme, ProgressBar
} from '@fluentui/react-components';
import type {AppProps} from 'next/app';
import Head from "next/head";
import {useEffect, useState} from "react";
import {Router} from "next/router";
import SearchController from "@/components/Search/SearchController";
import {AppStateStore} from "@/store/AppStateStore";
type EnhancedAppProps = AppProps & { renderer?: GriffelRenderer };
function MyApp({Component, pageProps, renderer}: EnhancedAppProps) {
  const [loading, setLoading] = useState(false)
  const [lastRouteLoaded, setLastRouteLoaded] = useState(0)
  useEffect(() => {
    const start = () => setLoading(true)
    const end = () => {
      setLoading(false)
      setLastRouteLoaded(new Date().getTime())
    }
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
        <meta name="description" content="MYD's blog 下北沢研究院"/>
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0, viewport-fit=cover, minimum-scale=1, maximum-scale=1.0, user-scalable=0"/>
        <link rel="icon" href="/favicon.png"/>
      </Head>
      <RendererProvider renderer={renderer || createDOMRenderer()}>
        <SSRProvider>
          <AppStateStore>
            <FluentProvider theme={webLightTheme}>
              <div style={{position: 'fixed', width: '100%', zIndex: 10000}}>
                {loading && <ProgressBar thickness="large"></ProgressBar>}
              </div>
              <SearchController lastRouteLoaded={lastRouteLoaded}/>
              {/*<div style={{zIndex: 1, display: showSearch ? 'none' : 'block'}}>*/}
              <div style={{zIndex: 1}}>
                <Component {...pageProps} />
              </div>
            </FluentProvider>
          </AppStateStore>
        </SSRProvider>
      </RendererProvider>
    </>
  );
}

export default MyApp;
