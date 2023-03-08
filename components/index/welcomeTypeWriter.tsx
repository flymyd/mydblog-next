import {CSSProperties, FC, ReactElement} from "react";
import dynamic from "next/dynamic";

// const shellText = 'guest@Shimokita:~$ ';
const shellText = '> ';
const welcomeText = [
  "Welcome to Flymyd's Blog",
  "欢迎来到夏雪冬花的博客",
  "这是一个兴趣使然的小站",
  "随手记录前端、DIY和一些杂七杂八的事情",
  // "由Next.js驱动",
  // "由Vercel提供服务，Cloudflare提供加速",
  "↓ 向下拖动，进入主站"
]
  .map(t => shellText + t);
const typeDelay = 100;
const typeSpeed = 30;
const WelcomeTypeWriter: FC<{ style?: CSSProperties }> = ({style}) => {
  const TypeWriterEffect = dynamic(() => import('react-typewriter-effect'), {
    ssr: false,
  })
  const typewriterList: Array<ReactElement> = [];
  let lastDelay = typeDelay;
  welcomeText.forEach((o, i) => {
    if (i !== 0) {
      lastDelay += welcomeText[i - 1].length * typeSpeed + 500;
    }
    typewriterList.push(<TypeWriterEffect
      key={i}
      textStyle={{fontFamily: 'FounderPixelsLite', fontSize: 24, lineHeight: 1.5, marginBottom: 10}}
      startDelay={lastDelay}
      cursorColor="black"
      text={o}
      typeSpeed={typeSpeed}
      eraseSpeed={typeSpeed}
      hideCursorAfterText={i !== welcomeText.length - 1}
    />)
  })
  return (
    <div className="blog-home__welcome-text" style={style}>
      {...typewriterList}
    </div>
  )
}
export default WelcomeTypeWriter;
