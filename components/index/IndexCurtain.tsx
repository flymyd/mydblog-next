import {CSSProperties, FC} from "react";
import FluidWrapper from "@/components/layouts/FluidWrapper";

const homeTextStyle: CSSProperties = {
  fontSize: 60,
  lineHeight: '1em',
  width: '1em',
  fontFamily: "'HC-2021', HomeXingSC"
}
const IndexCurtain: FC = () => {
  return (
    <section className="snap-center h-layout w-screen relative">
      <video poster="/home-preload.jpg" src="https://mydblog.obs.cn-east-3.myhuaweicloud.com/home-mini.mp4"
             autoPlay loop playsInline muted controls={false}
             className="h-layout w-screen object-cover"
             style={{filter: 'blur(7px) brightness(125%) opacity(0.3)'}}/>
      <FluidWrapper style={{zIndex: 100, position: 'absolute', top: 44, left: 0, width: '100%', height: '100%'}}
                    innerStyle={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'space-around',
                      height: '100%'
                    }}>
        <div className="flex flex-row justify-center w-full flex-row-reverse">
          <div style={homeTextStyle}>
            <span>古来侠客俱已矣</span>
          </div>
          <div style={homeTextStyle}>
            <span>天下谁人共萧骚</span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-full">
          向下滚动 ，进入主页 ↓
        </div>
      </FluidWrapper>
    </section>
  )
}

export default IndexCurtain;
