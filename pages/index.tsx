import Head from 'next/head'
import useTypewriter from "react-typewriter-hook"
import {Button, Text} from "@fluentui/react-components";
import IndexLayout from "@/components/layouts";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import {useRouter} from "next/router";

export default function Home(props: any) {
  const blog = useTypewriter("MYD's blog");
  const router = useRouter();
  return (
    <>
      <Head>
        <title>下北沢研究院</title>
      </Head>
      <IndexLayout>
        <FluidWrapper>
          <Button appearance={'primary'} onClick={() => router.push('/detail/3')}>测试跳转文章</Button>
        </FluidWrapper>
      </IndexLayout>
    </>
  )
}

