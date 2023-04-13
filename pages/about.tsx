import {FC} from "react";
import IndexLayout from "@/components/layouts/IndexLayout";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import IndexCurtain from "@/components/index/IndexCurtain";

const About: FC = () => {
  return (
    <>
      <IndexLayout>
        <main className="h-layout w-screen" style={{scrollSnapType: 'y mandatory', overflowY: 'scroll'}}>
          <IndexCurtain/>
          <section className="snap-start min-h-layout w-full bg-green-700 opacity-25">
            <FluidWrapper>
              <span style={{color: '#FFF'}}>测试页面2</span>
            </FluidWrapper>
          </section>
        </main>
      </IndexLayout>
    </>
  )
}
export default About;
