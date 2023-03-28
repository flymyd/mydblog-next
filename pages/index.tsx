import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import FluidWrapper from "@/components/layouts/FluidWrapper";
import IndexLayout from "@/components/layouts/IndexLayout";
import {useRouter} from "next/router";
import useScroll from "@/hooks/useScroll";
import {CSSProperties, useEffect, useRef} from "react";

const homeTextStyle: CSSProperties = {fontSize: 60, lineHeight: '1em', width: '1em', fontFamily: 'HomeXingSC'}
export default function Home(props: any) {
  const router = useRouter()
  const mainRef = useRef(null)
  const [x, y] = useScroll(mainRef)
  useEffect(() => {
    console.log(y)
  })
  return (
    <>
      <Head>
        <title>下北沢研究院</title>
      </Head>
      <IndexLayout>
        <main className="h-layout w-screen" style={{scrollSnapType: 'y mandatory', overflowY: 'scroll'}} ref={mainRef}>
          <section className="snap-center h-layout w-screen relative">
            <video poster="/home-preload.jpg" src="https://mydblog.obs.cn-east-3.myhuaweicloud.com/home-mini.mp4"
                   autoPlay loop playsInline muted controls={false}
                   className="h-layout w-screen object-cover"
                   style={{filter: 'blur(7px) brightness(125%) opacity(0.3)'}}/>
            <FluidWrapper style={{zIndex: 100, position: 'absolute', top: 44, left: 0, width: '100%'}}>
              <div className="flex flex-row">
                <div style={homeTextStyle}>
                  <span>携剑去</span>
                </div>
                <div style={homeTextStyle}>
                  <span>辞别楼外青山</span>
                </div>
              </div>
            </FluidWrapper>
          </section>
          <section className="snap-start min-h-layout w-full bg-green-700 opacity-25">
            <FluidWrapper>
              <span style={{color: '#FFF'}}>测试页面2</span>
            </FluidWrapper>
          </section>
        </main>
      </IndexLayout>
    </>
  )
}

