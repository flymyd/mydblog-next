import {createDOMRenderer, FluentProvider, renderToStyleElements, useThemeClassName} from '@fluentui/react-components';
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';
import {useEffect} from "react";

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
          {styles}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="zh">
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
