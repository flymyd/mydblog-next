import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import FluidWrapper from "@/components/layouts/FluidWrapper";
import IndexLayout from "@/components/layouts/IndexLayout";
import {useRouter} from "next/router";
import useScroll from "@/hooks/useScroll";
import {useEffect, useRef} from "react";

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
        <main className="h-screen w-screen" style={{scrollSnapType: 'y mandatory', overflowY: 'scroll'}} ref={mainRef}>
          <section className="snap-start h-screen w-screen relative">
            <video src="https://mydblog.obs.cn-east-3.myhuaweicloud.com/pl.mp4" muted autoPlay loop controls={false}
                   style={{width: '100vw', height: '100vh', objectFit: 'cover', filter: 'blur(3px)'}}/>
            <FluidWrapper style={{zIndex: 100, position: 'absolute', top: 400, left: '0'}}>
              <div className="py-5">
                测试123123
              </div>
            </FluidWrapper>
          </section>
          <section className="snap-start min-h-screen w-full bg-green-700 opacity-25">
            <FluidWrapper>
              <span style={{color: '#FFF'}}>asdasdad</span>
            </FluidWrapper>
          </section>
        </main>
      </IndexLayout>
    </>
  )
}

