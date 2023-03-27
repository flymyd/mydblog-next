import {FC} from "react";
import {Button, FluentProvider, Text, webDarkTheme} from "@fluentui/react-components";
import {HeaderProps} from "@/components/header/HeaderProps";
import FluidWrapper from "@/components/layouts/FluidWrapper";

const PCHeader: FC<HeaderProps> = (props) => {
  return (
    <FluidWrapper style={{background: '#333', color: '#FFF'}}>
      <div className="flex flex-row justify-between items-center fluid-wrapper w-full z-50 h-[44px]">
        <Text className="select-none cursor-pointer" size={500} weight="bold" onClick={()=>props.navi.push('/')}>{props.brand}</Text>
        <div>
          {props.routes.map(o => <Button key={o.link}
                                         appearance={'subtle'}
                                         style={{color: props.matchRoute(o) ? '#FFF' : '#F5F5F7CC'}}
                                         onClick={() => o.key === "/"
                                           ? props.navi.replace(o.link)
                                           : props.navi.push(o.link)}>{o.name}</Button>)}
        </div>
      </div>
    </FluidWrapper>
  )
}
export default PCHeader;
