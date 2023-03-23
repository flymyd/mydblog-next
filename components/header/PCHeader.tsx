import {FC} from "react";
import {Button, Text} from "@fluentui/react-components";
import {HeaderProps} from "@/components/header/HeaderProps";

const PCHeader: FC<HeaderProps> = (props) => {
  return (
    <div className="my-2 flex flex-row justify-between items-center fluid-wrapper w-full z-50">
      <Text size={500} weight="bold">{props.brand}</Text>
      <div>
        {props.routes.map(o => <Button key={o.link}
                                       appearance={'subtle'}
                                       style={{color: props.matchRoute(o) ? 'var(--colorNeutralForeground1)' : '#696969'}}
                                       onClick={() => o.key === "/"
                                         ? props.navi.replace(o.link)
                                         : props.navi.push(o.link)}>{o.name}</Button>)}
      </div>
    </div>
  )
}
export default PCHeader;
