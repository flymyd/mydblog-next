import Head from 'next/head'
import styles from '@/styles/Index.module.scss'
import FluidWrapper from "@/components/layouts/FluidWrapper";
import IndexLayout from "@/components/layouts/IndexLayout";
import {useRouter} from "next/router";

export default function Home(props: any) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>下北沢研究院</title>
      </Head>
      <main className="h-screen w-screen">
        <section className="snap-center min-h-screen w-full">
          <IndexLayout>
            <div className="opacity-60 fixed h-screen w-screen">
              <img src="https://cdn.jsdelivr.net/gh/Mark-1215/CDN/uploads/content/Apple-Wallpaper-2.jpg" style={{width: '100%', height: '100%'}} />
            </div>
            <FluidWrapper>
              <div className="py-5">

              </div>
            </FluidWrapper>
          </IndexLayout>
        </section>
      </main>
    </>
  )
}

