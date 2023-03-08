import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import NonSSRWrapper from "@/components/layouts/nonSSRWrapper";
import {Parallax, ParallaxLayer} from '@react-spring/parallax'
import FluidWrapper from "@/components/layouts/fluidWrapper";
import WelcomeTypeWriter from "@/components/index/welcomeTypeWriter";
import {Text} from "@fluentui/react-components";
import {useSpring, animated, useTransition} from "@react-spring/web";
import {useRef} from "react";
import IndexLayout from "@/components/layouts";

const alignCenter = {display: 'flex', alignItems: 'center'}
const url = (name: string, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

export default function Home(props: any) {
  return (
    <>
      <Head>
        <title>下北沢研究院</title>
      </Head>
      <NonSSRWrapper>
        <Parallax pages={2}>
          <ParallaxLayer offset={0} speed={0} style={{background: '#000'}}>
            <FluidWrapper>
              <div className="flex flex-col mt-5">
                <h1 className="font-bold text-5xl my-5" style={{fontFamily: 'ZpixLite, system-ui', color: '#32CD32'}}>Hi
                  there</h1>
                <WelcomeTypeWriter style={{width: "fit-content"}}/>
              </div>
            </FluidWrapper>
          </ParallaxLayer>
          <ParallaxLayer offset={0.8} speed={0} style={{background: "linear-gradient(#000, #BBB)"}}></ParallaxLayer>
          <ParallaxLayer offset={1} speed={0} style={{backgroundColor: "#fff"}}>
            <IndexLayout>

            </IndexLayout>
          </ParallaxLayer>
        </Parallax>
      </NonSSRWrapper>
    </>
  )
}

