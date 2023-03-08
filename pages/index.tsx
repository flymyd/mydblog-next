import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import FluidWrapper from "@/components/layouts/fluidWrapper";
import WelcomeTypeWriter from "@/components/index/welcomeTypeWriter";
import IndexLayout from "@/components/layouts";
import {useRouter} from "next/router";

export default function Home(props: any) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>下北沢研究院</title>
      </Head>
      <div className="flex flex-col" style={{overflowX: 'hidden'}}>
        {
          //不从blog-index锚点进入时有欢迎页
          router.asPath.indexOf('blog-index') !== -1 ? <></> : <div style={{height: '100vh', background: '#000'}}>
            <FluidWrapper>
              <div className="flex flex-col mt-5">
                <h1 className="font-bold text-5xl my-5" style={{fontFamily: 'ZpixLite, system-ui', color: '#32CD32'}}>Hi
                  there</h1>
                <WelcomeTypeWriter style={{width: "fit-content"}}/>
              </div>
            </FluidWrapper>
          </div>
        }
        <div id="blog-index" style={{height: '100vh'}}>
          <IndexLayout>
            <FluidWrapper>
              <div>
                {router.asPath}
              </div>
            </FluidWrapper>
          </IndexLayout>
        </div>
      </div>
    </>
  )
}

