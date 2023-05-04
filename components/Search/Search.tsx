import searchIcon from '@iconify/icons-akar-icons/search';
import crossIcon from '@iconify/icons-akar-icons/cross';
import {FC, useEffect, useRef, useState} from "react";
import {Icon} from "@iconify/react";
import {
  Divider,
  Input,
  InputProps,
  Text,
  Spinner,
  Button,
  FluentProvider,
  webDarkTheme
} from "@fluentui/react-components";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import {animated} from "@react-spring/web";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import {ArticleIndex} from "@/types/ArticleIndex";
import {useRouter as useNavi} from "next/dist/client/components/navigation";

const Search: FC<{ animation: any, closeSearch: Function }> = ({animation, closeSearch}) => {
  const navi = useNavi();
  const inputRef = useRef<any>(null);
  useEffect(() => {
    //自动聚焦
    inputRef.current.focus();
  }, [])
  const [searchRes, setSearchRes] = useState<Array<ArticleIndex> | null>(null)
  const [isSearching, setSearchingStatus] = useState(false)
  //防抖的搜索框输入
  const [text, setText] = useState('')
  const [textDep, setTextDep] = useState('')
  const [cancel] = useDebounce(() => {
    setText(textDep)
  }, 800, [textDep])
  const onInputChange: InputProps["onChange"] = (ev, data) => {
    setTextDep(data.value)
  };
  useEffect(() => {
    if (text) {
      setSearchingStatus(true)
      setSearchRes(null)
      axios.get('/api/search?key=' + text).then(res => {
        if (res.status === 200) {
          setSearchRes(res?.data?.hits ?? [])
          setSearchingStatus(false)
        }
      })
    }
  }, [text])
  const handleInnerText = (article: ArticleIndex) => {
    const heads = [...(article?.heads ?? [])]
    if (typeof article.abstract === "string") {
      heads.unshift(article.abstract)
    }
    const newHeads = heads.filter(txt => txt.indexOf("<em>") !== -1).map(v => `<p style="line-height: 20px;">${v}</p>`)
    if (newHeads.length === 0) {
      if (typeof article.abstract === "string") {
        newHeads.push(article.abstract)
      }
    }
    return newHeads.join('');
  }
  return (
    <animated.div className="search-div" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 9999,
      height: '100vh',
      overflowY: 'scroll',
      opacity: animation.opacity,
    }}>
      <animated.div style={{
        height: 'auto',
        minHeight: '100vh',
        background: '#000',
        color: 'white',
      }}>
        <FluidWrapper>
          <div className="flex flex-col w-full my-5 text-white">
            <div className="flex flex-row w-full items-center gap-2">
              <div className="p-3 pl-0 cursor-pointer md:hidden" onClick={() => closeSearch()}>
                <Icon icon={crossIcon}/>
              </div>
              <Input
                className="w-full"
                ref={inputRef}
                style={{color: '#FFF'}}
                appearance="underline"
                contentAfter={<Icon icon={searchIcon}/>}
                onChange={onInputChange}
              />
              <div className="hidden md:block">
                <Button className="search-cancel__button" appearance="subtle"
                        onClick={() => closeSearch()}>取消</Button>
              </div>
            </div>
            <div className="flex flex-col w-full mt-5">
              {isSearching && <Spinner size="large"/>}
              {Array.isArray(searchRes) && searchRes.length === 0 && <Text>无匹配的搜索结果</Text>}
              {
                searchRes && searchRes.map((obj, i) => {
                  const article = obj._formatted;
                  return <div key={article.id}>
                    <Text size={500} className="cursor-pointer">
                      <div onClick={() => navi.push('/detail/' + article.id)}
                           dangerouslySetInnerHTML={{__html: article.title}}></div>
                    </Text>
                    <Text size={200}>
                      <div className="mt-3 text-gray-400"
                           dangerouslySetInnerHTML={{__html: handleInnerText(article)}}></div>
                    </Text>
                    {(i !== searchRes.length - 1) && <Divider className="my-3"/>}
                  </div>
                })
              }
            </div>
          </div>
        </FluidWrapper>
      </animated.div>
    </animated.div>
  );
};
export default Search;
