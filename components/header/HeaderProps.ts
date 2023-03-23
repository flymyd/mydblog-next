import {NextRouter} from "next/router";

export interface HeaderProps {
  routes: Array<{
    name: string,
    link: string,
    key: string
  }>,
  brand: string,
  matchRoute: Function,
  router: NextRouter,
  navi: any
}
