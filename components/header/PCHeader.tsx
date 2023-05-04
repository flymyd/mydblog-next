import {FC, useContext} from "react";
import {Button, Text} from "@fluentui/react-components";
import {HeaderProps} from "@/components/header/HeaderProps";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import searchIcon from '@iconify/icons-akar-icons/search';
import {Icon} from "@iconify/react";
import {MyContext} from "@/store/AppStateStore";

const PCHeader: FC<HeaderProps> = (props) => {
  const store: any = useContext(MyContext);
  return (
    <FluidWrapper style={{background: '#333', color: '#FFF'}}>
      <div className="flex flex-row justify-between items-center fluid-wrapper w-full z-50 h-[44px]">
        <Text className="select-none cursor-pointer" size={500} weight="bold"
              onClick={() => props.navi.push('/')}>{props.brand}</Text>
        <div className="flex flex-row items-center">
          {props.routes.map(o => <Button key={o.link}
                                         className="navi-button"
                                         appearance={'subtle'}
                                         style={{color: props.matchRoute(o) ? '#FFF' : '#F5F5F7CC'}}
                                         onClick={() => o.key === "/"
                                           ? props.navi.replace(o.link)
                                           : props.navi.push(o.link)}>{o.name}</Button>)}
          <Button className="navi-button" appearance={'subtle'} style={{color: '#F5F5F7CC'}}
                  onClick={() => store.setShowSearch(true)}
                  icon={<Icon icon={searchIcon} style={{fontSize: 14, marginTop: 3}}/>}>搜索 Ctrl+K</Button>
        </div>
      </div>
    </FluidWrapper>
  )
}
export default PCHeader;
