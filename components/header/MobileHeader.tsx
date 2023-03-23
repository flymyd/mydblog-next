import {FC, ReactElement} from "react";
import {HeaderProps} from "@/components/header/HeaderProps";
import {Button, Text} from "@fluentui/react-components";

const MobileHeader: FC<HeaderProps> = (props) => {
  return (
    <div className="my-2 flex flex-row items-center fluid-wrapper w-full z-50">
      <Text size={400} weight="bold">
        <HeaderIcon open={false}/>
      </Text>
      <Text size={400} weight="medium">{props.brand}</Text>
      {/*{props.routes.map(o => <Button key={o.link}*/}
      {/*                               appearance={'subtle'}*/}
      {/*                               style={{color: props.matchRoute(o) ? 'var(--colorNeutralForeground1)' : '#696969'}}*/}
      {/*                               onClick={() => o.key === "/"*/}
      {/*                                 ? props.navi.replace(o.link)*/}
      {/*                                 : props.navi.push(o.link)}>{o.name}</Button>)}*/}
    </div>
  )
}

function HeaderIcon(props: { open: boolean }): ReactElement {
  const background = `url('${props.open ? 'icons/cross.svg' : 'icons/three-line-horizontal.svg'}') no-repeat center center / contain`
  return <div className="mr-1.5" style={{background, height: '1em', width: '1em'}}></div>
}

export default MobileHeader;
