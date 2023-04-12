import {createDOMRenderer, FluentProvider, renderToStyleElements, useThemeClassName} from '@fluentui/react-components';
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';
import {ServerStyles, createStylesServer} from '@mantine/next';
import {useEffect} from "react";

const stylesServer = createStylesServer();

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const renderer = createDOMRenderer();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App =>
          function EnhancedApp(props) {
            const enhancedProps = {
              ...props,
              renderer,
            };
            return <App {...enhancedProps} />;
          },
      });

    const initialProps = await Document.getInitialProps(ctx);
    const styles = renderToStyleElements(renderer);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <ServerStyles html={initialProps.html} server={stylesServer} key="styles"/>
          {styles}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="zh" className='scroll-smooth'>
        <Head/>
        <body>
        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
