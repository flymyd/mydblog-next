import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import FluidWrapper from "@/components/layouts/FluidWrapper";
import WelcomeTypeWriter from "@/components/index/WelcomeTypeWriter";
import IndexLayout from "@/components/layouts/IndexLayout";
import {useRouter} from "next/router";
import {Button} from "@fluentui/react-components";

export default function Home(props: any) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>下北沢研究院</title>
      </Head>
      <main className="h-screen w-screen" style={{scrollSnapType: 'y mandatory', overflowY: 'auto'}}>
        {
          //不从blog-index锚点进入时有欢迎页
          router.asPath.indexOf('blog-index') !== -1 ? <></> :
            <section className="snap-start h-screen w-full bg-black">
              <FluidWrapper>
                <div className="flex flex-col mt-5">
                  <h1 className="font-bold text-5xl my-5"
                      style={{fontFamily: 'ZpixLite, system-ui', color: '#32CD32'}}>Hi
                    there</h1>
                  <WelcomeTypeWriter style={{width: "fit-content"}}/>
                </div>
              </FluidWrapper>
            </section>
        }
        <section className="snap-center min-h-screen w-full">
          <IndexLayout>
            <FluidWrapper>
              <div>
                <Button onClick={() => router.push('/detail/2')}>测试跳转文章页</Button>
              </div>
            </FluidWrapper>
          </IndexLayout>
        </section>
      </main>
    </>
  )
}

