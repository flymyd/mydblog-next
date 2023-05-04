import {FC} from "react";
import {useMediaQuery} from "@material-ui/core";
import {Client, HydrationProvider, Server} from "react-hydration-provider";
import PCHeader from "@/components/header/PCHeader";
import MobileHeader from "@/components/header/MobileHeader";
import {useRouter} from "next/router";
import {useRouter as useNavi} from "next/dist/client/components/navigation";
import {HeaderProps} from "@/components/header/HeaderProps";

const routes = [
  {name: '首页', link: '/', key: '/'},
  {name: '归档', link: '/archives/1', key: 'archives'},
  // {name: '分类', link: '/categories', key: 'categories'},
  {name: '友情链接', link: '/friendlyLink', key: 'friendlyLink'},
  {name: 'Projects', link: '/projects', key: 'projects'},
  {name: '关于我', link: '/about', key: 'about'},
]
const brand = "MYD's blog";
const Header: FC = () => {
  const isMobile = useMediaQuery("(max-width:768px)");
  const router = useRouter();
  const navi = useNavi();
  const matchRoute = (route: any) => {
    const {pathname} = router;
    return route.key == "/" ? route.key == pathname : pathname.startsWith("/" + route.key) || null;
  }
  const headerProps: HeaderProps = {routes, brand, matchRoute, navi, router}
  return (
    <HydrationProvider>
      <Server>
        <MobileHeader {...headerProps}></MobileHeader>
        {/*<PCHeader {...headerProps}></PCHeader>*/}
      </Server>
      <Client>
        <div style={{
          position: "fixed",
          width: '100%',
          zIndex: 1000
        }}>
          {
            isMobile ? <MobileHeader {...headerProps}></MobileHeader> : <PCHeader {...headerProps}></PCHeader>
          }
        </div>
      </Client>
    </HydrationProvider>
  )
}
export default Header;
