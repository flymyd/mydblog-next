import {FC, useContext, useState} from "react";
import {HeaderProps} from "@/components/header/HeaderProps";
import {Button, Text} from "@fluentui/react-components";
import useWatch from "@/hooks/useWatch";
import {useSpring, animated} from "@react-spring/web";
import {Icon} from '@iconify/react';
import crossIcon from '@iconify/icons-akar-icons/cross';
import threeLineHorizontal from '@iconify/icons-akar-icons/three-line-horizontal';
import searchIcon from "@iconify/icons-akar-icons/search";
import {MyContext} from "@/store/AppStateStore";

const MobileHeader: FC<HeaderProps> = (props) => {
  const store: any = useContext(MyContext);
  const [openDrawer, setOpenDrawer] = useState(false)
  const showStyle = {height: '100vh', opacity: 100}
  const hiddenStyle = {height: '0vh', opacity: 0};
  const [animation, api] = useSpring(() => ({...hiddenStyle}))
  useWatch(openDrawer, (newVal: boolean, oldVal: boolean) => {
    api.stop()
    if (newVal && !oldVal) {
      api.start({...showStyle})
    } else if (!newVal && oldVal) {
      api.start({...hiddenStyle})
    }
  })
  return (
    <div className="flex flex-row items-center w-full z-50 bg-[#333] text-white h-[44px]">
      <div className="pl-2 ml-2 w-screen flex flex-row items-center">
        <Text size={400} weight="medium">
          <Icon className="mr-2" onClick={() => setOpenDrawer((prevState: boolean) => (!prevState))}
                icon={openDrawer ? crossIcon : threeLineHorizontal}/>
        </Text>
        <Text size={400} className="select-none cursor-pointer" weight="medium"
              onClick={() => setOpenDrawer((prevState: boolean) => (!prevState))}>{props.brand}</Text>
      </div>
      {!openDrawer && <div className="mt-1 mr-4" onClick={() => store.setShowSearch(true)}>
        <Icon icon={searchIcon}/>
      </div>}
      <animated.div style={animation}
                    className="flex flex-row justify-center items-start fixed w-screen pt-5 overflow-hidden bg-[#333] top-[44px] z-50">
        <div style={{width: '90%'}} className="flex flex-col justify-center items-start">
          {props.routes.map(o => <Text key={o.link}
                                       size={400}
                                       className="h-[44px]"
                                       style={{color: props.matchRoute(o) ? '#FFF' : '#F5F5F7CC'}}
                                       onClick={() => o.key === "/"
                                         ? props.navi.replace(o.link)
                                         : props.navi.push(o.link)}>{o.name}</Text>)}
          <div className="flex flex-row" onClick={() => store.setShowSearch(true)}>
            <Icon icon={searchIcon} className="mt-1 mr-1.5"/>
            <Text size={400} className="h-[44px]" style={{color: '#F5F5F7CC'}}>搜索</Text>
          </div>
        </div>
      </animated.div>
    </div>
  )
}

export default MobileHeader;
