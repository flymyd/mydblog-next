import {CSSProperties, FC, ReactElement} from "react";
import dynamic from "next/dynamic";

// const shellText = 'guest@Shimokita:~$ ';
const shellText = '> ';
const welcomeText = [
  "【注意！该站仍在建设中！】",
  "【现行版本：https://blog.van.ac.cn】",
  "Welcome to Flymyd's Blog",
  "欢迎来到夏雪冬花的博客",
  "这是一个兴趣使然的小站",
  "随手记录前端、DIY和一些杂七杂八的东西",
  "由Next.js驱动",
  "由Vercel提供服务，Cloudflare提供加速",
  "↓ 向下滑动，进入主站"
]
  .map(t => shellText + t);
const typeDelay = 100;
const typeSpeed = 20;
const WelcomeTypeWriter: FC<{ style?: CSSProperties }> = ({style}) => {
  const TypeWriterEffect = dynamic(() => import('react-typewriter-effect'), {
    ssr: false,
  })
  const typewriterList: Array<ReactElement> = [];
  let lastDelay = typeDelay + 100;
  welcomeText.forEach((o, i) => {
    if (i !== 0) {
      lastDelay += welcomeText[i - 1].length * typeSpeed + 500;
    }
    typewriterList.push(<TypeWriterEffect
      key={i}
      textStyle={{fontFamily: 'ZpixLite', fontSize: 24, lineHeight: 1.5, marginBottom: 10, color: '#32CD32'}}
      startDelay={lastDelay}
      cursorColor="#32CD32"
      text={o}
      typeSpeed={i === 0 ? 10 : typeSpeed}
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
