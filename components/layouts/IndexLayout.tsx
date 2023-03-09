import {CSSProperties, FC, ReactNode} from "react";
import Header from '@/components/header/Header';
import Head from "next/head";

const IndexLayout: FC<{ children: ReactNode, style?: CSSProperties }> = ({children, style}) => {
  return (
    <>
      <Head>
        <title>下北沢研究院</title>
      </Head>
      <header>
        <Header/>
      </header>
      <main style={{...style}}>
        {children}
      </main>
    </>
  )
}
export default IndexLayout;
