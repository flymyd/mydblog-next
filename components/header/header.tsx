'use client';
import {FC, useEffect} from "react";
import {Button, Text} from "@fluentui/react-components";
import {useRouter} from "next/router";
import { useRouter as useNavi } from 'next/navigation';
import FluidWrapper from "@/components/layouts/fluidWrapper";

const Header: FC = () => {
  const brand = "MYD's blog";
  const router = useRouter();
  const navi = useNavi();
  const routes = [
    {name: '首页', link: '/#blog-index', key: '/'},
    {name: '归档', link: '/archives/1', key: 'archives'},
    {name: '分类', link: '/categories', key: 'categories'},
    {name: '友情链接', link: '/friendlyLink', key: 'friendlyLink'},
    {name: 'Projects', link: '/projects', key: 'projects'},
    {name: '关于我', link: '/about', key: 'about'},
  ]
  const matchRoute = (route: any) => {
    const {pathname} = router;
    return route.key == "/" ? route.key == pathname : pathname.startsWith("/" + route.key) || null;
  }
  return (
    <FluidWrapper>
      <header className="m-1 flex flex-row justify-between items-center fluid-wrapper w-full z-50">
        <Text size={500} weight="bold">{brand}</Text>
        <div>
          {routes.map(o => <Button key={o.link}
                                   appearance={'subtle'}
                                   style={{color: matchRoute(o) ? 'var(--colorNeutralForeground1)' : '#696969'}}
                                   onClick={() => navi.replace(o.link)}>{o.name}</Button>)}
        </div>
      </header>
    </FluidWrapper>
  )
}
export default Header;
