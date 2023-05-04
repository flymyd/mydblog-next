import {FC, useContext, useEffect, useLayoutEffect, useMemo, useState} from "react";
import Search from "@/components/Search/Search";
import {useSpring} from "@react-spring/web";
import {MyContext} from "@/store/AppStateStore";
import {autorun, reaction, toJS, when} from "mobx";

const SearchController: FC<any> = (props: { lastRouteLoaded: number }) => {
  const store: any = useContext(MyContext)
  useEffect(() => {
    reaction(
      () => store.showSearch,
      (cur, pre) => {
        setShow(cur)
      }
    );
  }, [store]);
  const [show, setShow] = useState(false)

  function handleKeyPress(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      event.preventDefault();
      if (!store.showSearch) {
        setScrollPosition(window.scrollY)
      }
      store.setShowSearch(!store.showSearch)
    } else if (event.key === "Escape") {
      event.preventDefault();
      store.setShowSearch(false);
    }
  }

  useEffect(() => {
    store.setShowSearch(false)
  }, [props.lastRouteLoaded])
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  useLayoutEffect(() => {
    const disposer = autorun(() => {
      if (!store.showSearch) {
        const scrollOpts: any = {
          top: scrollPosition,
          left: 0,
          behavior: 'instant'
        }
        window.scrollTo(scrollOpts)
        setTimeout(() => {
          setScrollPosition(0)
        }, 100)
      }
    });
    return () => {
      disposer();
    };
  }, [store]);
  const searchAnimation = useSpring({
    opacity: store.showSearch ? 1 : 0,
  });
  const [scrollPosition, setScrollPosition] = useState(0)
  return show ? <Search animation={searchAnimation} closeSearch={() => store.setShowSearch(false)}/> : <></>
}
export default SearchController;
