import {ChangeEvent, FC, useEffect, useMemo, useState} from "react";
import IndexLayout from "@/components/layouts/IndexLayout";
import PageTitle from "@/components/PageTitle";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import ArchiveCard from "@/components/ArchiveCard";
import Pagination from "@/components/pagination/Pagination";
import {Label, Select, SelectOnChangeData, useId} from "@fluentui/react-components";

const Categories: FC<any> = () => {
  const [searchQuerySource, setSearchQuerySource] = useState<any>({})
  useEffect(() => {
    const searchQuery = fetch('/api/categories/getQueryList').then((res) => {
      setSearchQuerySource(res.json())
    })
  }, [])
  const [pageNum, setPageNum] = useState(1);
  const yearSelectorId = useId('year');
  const yearList = useMemo(() => [
    {value: '', label: '请选择...'},
    ...Object.keys(searchQuerySource?.ymRange ?? []).map(v => ({value: v, label: v + '年'}))
  ], [searchQuerySource])
  const [year, setYear] = useState('');
  const onYearChange = (e: ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) => {
    setYear(data.value)
  }
  const monthSelectorId = useId("month");
  const monthList = useMemo(() => {
    if (year) {
      return [
        {value: '', label: '请选择...'},
        ...searchQuerySource.ymRange[year].map((v: string) => ({value: v, label: v + '月'}))
      ]
    } else return [{value: '', label: '请选择...'}]
  }, [year])
  const [month, setMonth] = useState('');
  const onMonthChange = (e: ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) => {
    setMonth(data.value)
  }

  return <IndexLayout>
    <PageTitle title="按分类浏览文章" subtitle="专注阅读"/>
    <FluidWrapper innerStyle={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
      <div className="flex flex-col md:flex-row md:gap-[20px] w-[80%] md:w-[50%]">
        <div className="flex flex-row items-center mb-5 w-full">
          <Label htmlFor={yearSelectorId} className="mr-1.5">年份</Label>
          <Select id={yearSelectorId} onChange={onYearChange} className="flex-1">
            {
              yearList.map(v => <option key={v.value} value={v.value}>{v.label}</option>)
            }
          </Select>
        </div>
        <div className="flex flex-row items-center mb-5 w-full">
          <Label htmlFor={monthSelectorId} className="mr-1.5">月份</Label>
          <Select id={monthSelectorId} onChange={onMonthChange} className="flex-1">
            {
              monthList.map((v: any) => <option key={v.value} value={v.value}>{v.label}</option>)
            }
          </Select>
        </div>
      </div>
      {/*<div className="flex flex-col w-full" style={{minHeight: 'calc(100vh - 230px)'}}>*/}
      {/*  {*/}
      {/*    listData.map((obj: any) => <ArchiveCard key={obj.id} article={obj}></ArchiveCard>)*/}
      {/*  }*/}
      {/*</div>*/}
      {/*<div className="flex flex-row items-center justify-center w-full my-3 pb-3">*/}
      {/*  <Pagination totalPage={totalPage} pageNum={pageNum}*/}
      {/*              onPageChange={(num: number) => setPageNum(num)}></Pagination>*/}
      {/*</div>*/}
    </FluidWrapper>
  </IndexLayout>
}

export default Categories;
