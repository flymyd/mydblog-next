import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import NonSSRWrapper from "@/components/layouts/NonSSRWrapper";
import {Parallax, ParallaxLayer} from '@react-spring/parallax'
import FluidWrapper from "@/components/layouts/FluidWrapper";
import WelcomeTypeWriter from "@/components/index/welcomeTypeWriter";
import {Text} from "@fluentui/react-components";

const alignCenter = {display: 'flex', alignItems: 'center'}

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>下北沢研究院</title>
      </Head>
      <NonSSRWrapper>
        {/*<div className={styles.background} />*/}
        <Parallax pages={5}>
          <ParallaxLayer offset={0} speed={0.5}>
            <FluidWrapper>
              <div className="flex flex-col mt-5">
                <h1 className="font-bold text-5xl my-5" style={{fontFamily: 'FounderPixels, system-ui'}}>MYD&apos;s
                  Blog</h1>
                <WelcomeTypeWriter style={{width: "fit-content"}}/>
              </div>
            </FluidWrapper>
          </ParallaxLayer>

          <ParallaxLayer sticky={{start: 1, end: 3}} style={{...alignCenter, justifyContent: 'flex-start'}}>
            <div className={`${styles.card} ${styles.sticky}`}>
              <p>I'm a sticky layer</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={1.5} speed={1.5} style={{...alignCenter, justifyContent: 'flex-end'}}>
            <div className={`${styles.card} ${styles.parallax} ${styles.purple}`}>
              <p>I'm not</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={2.5} speed={1.5} style={{...alignCenter, justifyContent: 'flex-end'}}>
            <div className={`${styles.card} ${styles.parallax} ${styles.blue}`}>
              <p>Neither am I</p>
            </div>
          </ParallaxLayer>
        </Parallax>

      </NonSSRWrapper>
    </>
  )
}

