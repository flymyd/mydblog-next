import Head from 'next/head'
import useTypewriter from "react-typewriter-hook"
import {useScroll, animated, useSpring} from '@react-spring/web'
import styles from '@/styles/Index.module.scss'
import {useRouter} from "next/router";
import NonSSRWrapper from "@/components/layouts/NonSSRWrapper";
import {useEffect, useRef, useState} from "react";
import IndexLayout from "@/components/layouts";
import {Button} from "@fluentui/react-components";

const PAGE_COUNT = 5
"use client"
export default function Home(props: any) {
  const blog = useTypewriter("MYD's blog");
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (containerRef.current?.scrollTop) {
      containerRef.current.scrollTop = 0
    }
  }, [])
  const {scrollYProgress} = useScroll({
    container: containerRef,
    default: {
      immediate: true,
    },
  })
  return (
    <>
      <Head>
        <title>下北沢研究院</title>
      </Head>
      <NonSSRWrapper>
        <div ref={containerRef} className={styles.body}>
          <div className={styles.animated__layers}>
            <animated.div
              className={styles.dot}
              style={{
                clipPath: scrollYProgress.to(val => `circle(${val * 100}%)`),
              }}>
              <IndexLayout>
                <div className="flex flex-col items-center justify-center" style={{fontSize: 50, marginTop: 500}}>
                  {JSON.stringify(scrollYProgress)}
                </div>
                <Button onClick={() => router.replace('/detail/3')}>跳转测试</Button>
              </IndexLayout>
            </animated.div>
          </div>
          {new Array(PAGE_COUNT).fill(null).map((_, index) => (
            <div className={styles.full__page} key={index}/>
          ))}
        </div>
      </NonSSRWrapper>
    </>
  )
}

