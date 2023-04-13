import {FC, useEffect, useState} from "react";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import useDebounce from "@/hooks/useDebounce";
import ToHomeRow from "@/components/ToHomeRow";
import MergeCanvas from "@/components/MergeCanvas";
import Head from "next/head";
import {
  Input,
  InputOnChangeData,
  Label,
  Select,
  SelectOnChangeData,
  SelectProps,
  useId
} from "@fluentui/react-components";
import {amenDict} from "@/utils/AmenDict";

const CatGenerate: FC = () => {
  const inputId = useId("input");
  const selectId = useId("select");
  const [amen, setAmen] = useState('wh-2')
  const [text, setText] = useState('')
  const [textDep, setTextDep] = useState('')
  const [cancel] = useDebounce(() => {
    setText(textDep)
  }, 1000, [textDep])
  const onSelectChange = (e: any, data: SelectOnChangeData) => {
    setAmen(data.value)
  }
  const onInputChange = (e: any, data: InputOnChangeData) => {
    setTextDep(data.value)
  }
  const getAmenLogo = (amenType: string) => {
    if (amenType) {
      return '/img/jx3/' + amenType + '.png'
      // const logoSource = "https://jx3.xoyo.com/zt/2014/11/21/zt/menpai/assets/images/mp-cy/skill-1.png";
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
              <Label htmlFor={inputId} className="mr-1.5">请输入文字</Label>
              <Input id={inputId} placeholder="文字将会在图片下方显示" onChange={onInputChange}/>
            </div>
            <div className="flex flex-row items-center mb-5">
              <Label htmlFor={selectId} className="mr-1.5">请选择心法</Label>
              <Select id={selectId} onChange={onSelectChange}>
                {
                  amenDict.map(v => <option key={v.value} value={v.value}>{v.label}</option>)
                }
              </Select>
            </div>
            <MergeCanvas avatarUrl={getAmenLogo(amen)} text={text}/>
          </div>
        </FluidWrapper>
      </div>
    </>
  )
}
export default CatGenerate;
