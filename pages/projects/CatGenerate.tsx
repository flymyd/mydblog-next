import {FC, useEffect, useState} from "react";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import useDebounce from "@/hooks/useDebounce";
import ToHomeRow from "@/components/ToHomeRow";
import MergeCanvas from "@/components/MergeCanvas";
import Head from "next/head";

const amenDict = [
  {label: '大侠', value: ''},
  {label: '万花-花间游', value: 'wh-1'},
  {label: '万花-离经易道', value: 'wh-2'},
  {label: '七秀-冰心诀', value: 'qx-1'},
  {label: '七秀-云裳心经', value: 'qx-2'},
  {label: '少林-易筋经', value: 'sl-1'},
  {label: '少林-洗髓经', value: 'sl-2'},
  {label: '纯阳-太虚剑意', value: 'chy-1'},
  {label: '纯阳-紫霞功', value: 'chy-2'},
  {label: '天策-傲血战意', value: 'tc-1'},
  {label: '天策-铁牢律', value: 'tc-2'},
  {label: '藏剑-山居剑意', value: 'cj-1'},
  {label: '藏剑-问水诀', value: 'cj-2'},
  {label: '五毒-毒经', value: 'wd-1'},
  {label: '五毒-补天诀', value: 'wd-2'},
  {label: '唐门-惊羽诀', value: 'tm-1'},
  {label: '唐门-天罗诡道', value: 'tm-2'},
  {label: '明教-焚影圣诀', value: 'mj-1'},
  {label: '明教-明尊琉璃体', value: 'mj-2'},
  {label: '丐帮', value: 'gb-1'},
  {label: '苍云-分山劲', value: 'cy-1'},
  {label: '苍云-铁骨衣', value: 'cy-2'},
  {label: '长歌-莫问', value: 'cg-1'},
  {label: '长歌-相知', value: 'cg-2'},
  {label: '霸刀', value: 'bd-1'},
  {label: '蓬莱', value: 'pl-1'},
  {label: '凌雪阁', value: 'lxg-1'},
  {label: '衍天宗', value: 'ytz-1'},
  {label: '北天药宗-无方', value: 'btyz-1'},
  {label: '北天药宗-灵素', value: 'btyz-2'},
  {label: '刀宗', value: 'dz-1'},
]
const logoSource = "https://jx3.xoyo.com/zt/2014/11/21/zt/menpai/assets/images/mp-cy/skill-1.png";
const CatGenerate: FC = () => {
  const [amen, setAmen] = useState('')
  const [text, setText] = useState('')
  const [textDep, setTextDep] = useState('')
  const [cancel] = useDebounce(() => {
    setText(textDep)
  }, 1000, [textDep])
  const onSelectChange = (e: any) => {
    setAmen(e.target.value)
  }
  const onInputChange = (e: any) => {
    setTextDep(e.target.value)
  }
  const getAmenLogo = (amenType: string) => {
    if (amenType) {
      return 'https://blog.van.ac.cn/jx3/' + amenType + '.png'
      // return 'https://mydblog.obs.cn-east-3.myhuaweicloud.com/jx3/' + amenType + '.png'
      // const letterMatch = amenType.match(/[a-z]+/i); // 匹配任意个大小写字母
      // const numberMatch = amenType.match(/\d+/); // 匹配任意个数字
      // const letter = letterMatch ? letterMatch[0] : "";
      // const number = numberMatch ? numberMatch[0] : "";
      // return logoSource.replace("cy", letter).replace("skill-1", "skill-" + number);
    } else return ''
  }
  return (
    <>
      <Head>
        <title>拿捏猫猫生成器</title>
      </Head>
      <div style={{minHeight: '100vh'}}>
        <ToHomeRow/>
        <FluidWrapper>
          <div className="flex flex-col">
            <h1 className="mb-5">谁不想拿捏猫猫呢</h1>
            <p className="mb-5">如果心法图标加载不出来/图片无法绘制，请切换至别的心法后稍等几秒再切换回来即可</p>
            <div className="flex flex-row items-center mb-5">
              <span className="mr-5 align-middle">请输入文字</span>
              <input onChange={onInputChange} type="text" className="align-middle mt-1"
                     style={{background: "transparent", flex: 1}}
                     placeholder="此处文字将会在图片下方显示"/>
            </div>
            <div className="flex flex-col mb-5">
              <span className="mr-5 align-middle">请选择心法</span>
              {/*<FilterRow showIcon={false} hideLeft={true} elements={[*/}
              {/*  {*/}
              {/*    type: 'select',*/}
              {/*    name: 'amen',*/}
              {/*    onChange: onSelectChange,*/}
              {/*    dataSource: amenDict*/}
              {/*  }*/}
              {/*]}></FilterRow>*/}
            </div>
            <MergeCanvas avatarUrl={getAmenLogo(amen)} text={text}/>
          </div>
        </FluidWrapper>
      </div>
    </>
  )
}
export default CatGenerate;
