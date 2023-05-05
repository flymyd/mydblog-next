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
                  <span>这个小小的前端部落格。</span>
                </div>
              </div>
            </div>
          </section>
          <section className="snap-start min-h-layout w-full">
            <div className={styles.container}>
              <div className={[styles['title-container'], 'h-[20vh]'].join(' ')} style={{background: 'white'}}>
                <p className={[styles['title-text'], 'h-[20vh]'].join(' ')}>
                  <span>测试文字1</span>
                  <span>测试文字2</span>
                </p>
              </div>
              <div className={styles.text}>
                  <span className={styles.txt}>
                    测试玩法
                  </span>
              </div>
            </div>
          </section>
          <section className="snap-start min-h-layout w-full">
            <div className={styles.container}>
              <div className={styles.text}>
                  <span className={styles.txt}>
                    灵动的 iPhone
                    新玩法，迎面而来。重大的安全新功能，为拯救生命而设计。创新的 4800
                    万像素主摄，让细节纤毫毕现。更有 iPhone
                    芯片中的速度之王，为一切提供强大原动力。
                  </span>
              </div>
            </div>
          </section>
        </main>
      </IndexLayout>
    </>
  )
}
export default About;
