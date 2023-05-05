import {FC} from "react";
import IndexLayout from "@/components/layouts/IndexLayout";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import IndexCurtain from "@/components/index/IndexCurtain";
import styles from '@/styles/About.module.scss';

const About: FC = () => {
  return (
    <>
      <IndexLayout>
        <main className="h-layout w-screen" style={{scrollSnapType: 'y mandatory', overflowY: 'scroll'}}>
          {/*<IndexCurtain/>*/}
          <section className="snap-start min-h-layout w-full">
            <div className={[styles['title-container'], 'min-h-layout'].join(' ')}>
              <div className={[styles['title-text'], 'min-h-layout'].join(' ')}>
                <div className="flex flex-col gap-5">
                  <span>欢迎访问，</span>
                  <span>这是一个小小的前端部落格。</span>
                </div>
              </div>
            </div>
          </section>
          <section className="snap-start min-h-layout w-full">
            <div className={[styles['title-container'], styles['title-container-blue'], 'min-h-layout'].join(' ')}>
              <div className={[styles['title-text'], 'min-h-layout'].join(' ')}>
                <div className="flex flex-col gap-5">
                  <span>该网站使用Next.js构建，</span>
                  <span>由Vercel托管，</span>
                  <span>CloudFlare提供加速服务。</span>
                </div>
              </div>
            </div>
          </section>
          <section className="snap-start min-h-layout w-full">
            <div className={styles['container-red']}>
              {/*<div className={[styles['title-container'], 'h-[20vh]'].join(' ')}>*/}
              {/*  <div className={[styles['title-text'], styles['intro-text'], 'h-[20vh]'].join(' ')}>*/}
              {/*    <div className="flex flex-col gap-5 mt-[30vh]">*/}
              {/*      <span>网站使用Next.js构建，</span>*/}
              {/*      <span>由Vercel托管，</span>*/}
              {/*      <span>CloudFlare提供加速服务。</span>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className={styles.text}>
                <div className={styles.txt}>
                  <div className="flex flex-col gap-5">
                    <span>{'> '}我擅长的语言是JavaScript、TypeScript ;</span>
                    <span>{'> '}也会写些Java ;</span>
                    <span>{'> '}有时候会搞点Python、Shell脚本 ;</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="snap-start min-h-layout w-full">
            <div className={styles.container}>
              <div className={styles.text}>
                <div className={styles.txt}>
                  <div className="flex flex-col gap-5">
                    <span>Vue 2、Vue 3、React.js都能拿捏，</span>
                    <span>uni-app、Electron富有开发经验，</span>
                    <span>Nest.js、TypeORM也不是没写过。</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="snap-start min-h-layout w-full">
            <div className={styles['container-green']}>
              <div className={styles.text}>
                <div className={styles.txt}>
                  <div className="flex flex-col gap-5">
                    <span>极强的知识获取能力 √</span>
                    <span>较强的自我驱动力 √</span>
                    <span>良好的分析问题和解决问题的能力 √</span>
                    <span>善于学习和总结分析 √</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="snap-start min-h-layout w-full bg-[#111]">
            <FluidWrapper>
              <div className="flex flex-col items-center justify-center min-h-layout text-white text-[50px]">
                <div className="flex flex-col gap-20">
                  <span>👉有事相询：<a className="underline"
                                     href="mailto:flymyd@foxmail.com">flymyd@foxmail.com</a></span>
                  <span>👉看看简历：<a className="underline cursor-pointer">点我</a></span>
                  <span>👉GitHub：<a className="underline cursor-pointer" target="_blank" rel="noreferrer"
                                   href="https://github.com/flymyd">点我</a></span>
                </div>
              </div>
            </FluidWrapper>
          </section>
        </main>
      </IndexLayout>
    </>
  )
}
export default About;
