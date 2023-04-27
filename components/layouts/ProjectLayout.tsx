import {CSSProperties, FC, ReactNode} from "react";
import Head from "next/head";
import ToHomeRow from "@/components/ToHomeRow";

const ProjectLayout: FC<{ children: ReactNode, style?: CSSProperties, title?: string, showNavi?: boolean }> = ({
                                                                                                                 children,
                                                                                                                 style,
                                                                                                                 title,
                                                                                                                 showNavi = true
                                                                                                               }) => {
  return (
    <>
      <Head>
        <title>{title ? title : '下北沢研究院'}</title>
      </Head>
      <main style={{...style, minHeight: '100vh'}}>
        {
          showNavi ? <header>
            <ToHomeRow/>
          </header> : ''
        }
        {children}
      </main>
    </>
  )
}
export default ProjectLayout;
