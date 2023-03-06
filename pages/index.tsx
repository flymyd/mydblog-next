import Head from 'next/head'
import useTypewriter from "react-typewriter-hook"
import {useScroll, animated, useSpring} from '@react-spring/web'
import styles from '@/styles/Index.module.scss'
import {useRouter} from "next/router";
import NonSSRWrapper from "@/components/layouts/NonSSRWrapper";
import {useRef} from "react";
import IndexLayout from "@/components/layouts";
import {Button} from "@fluentui/react-components";

const PAGE_COUNT = 5
export default function Home(props: any) {
  const blog = useTypewriter("MYD's blog");
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null!)

  const [textStyles, textApi] = useSpring(() => ({
    y: '100%',
  }))

  const {scrollYProgress} = useScroll({
    container: containerRef,
    onChange: ({value: {scrollYProgress}}) => {
      if (scrollYProgress > 0.7) {
        textApi.start({y: '0'})
      } else {
        textApi.start({y: '100%'})
      }
    },
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
                test
                <Button onClick={()=>router.push('/detail/3')}>跳转测试</Button>
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

