import 'reset-css';
import '@/styles/globals.css'
import {
  createDOMRenderer,
  FluentProvider,
  GriffelRenderer,
  SSRProvider,
  RendererProvider,
  webLightTheme, ProgressBar, Portal,
} from '@fluentui/react-components';
import type {AppProps} from 'next/app';
import Head from "next/head";
import {useEffect, useState} from "react";
import {Router} from "next/router";

type EnhancedAppProps = AppProps & { renderer?: GriffelRenderer };

function MyApp({Component, pageProps, renderer}: EnhancedAppProps) {
  const [loading, setLoading] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
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
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setShowSearch((prevState) => !prevState)
      } else if (event.key === "Escape") {
        event.preventDefault();
        setShowSearch(false);
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
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
          <FluentProvider theme={webLightTheme}>
            <div style={{position: 'fixed', width: '100%', zIndex: 10000}}>
              {loading && <ProgressBar thickness="large"></ProgressBar>}
            </div>
            {
              showSearch ? <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 10001,
                overflowY: 'scroll'
              }}>
                <div style={{height: '100vh', background: 'red', opacity: 0.5}} onWheel={event => {
                  event.stopPropagation();
                }}>
                  {
                    new Array(10).fill(114).map((v, i) => (<p key={i}>测试遮罩测试遮罩测试遮罩</p>))
                  }
                </div>
              </div> : <></>
            }
            <div style={{position: 'relative', zIndex: 1}}>
              <Component {...pageProps} />
            </div>
          </FluentProvider>
        </SSRProvider>
      </RendererProvider>
    </>
  );
}

export default MyApp;
