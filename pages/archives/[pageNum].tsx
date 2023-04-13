import {ChangeEvent, FC, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import IndexLayout from "@/components/layouts/IndexLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {dataPath, getArticlesList} from "@/utils/articlesHelper";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import {useRouter as useNavi} from "next/dist/client/components/navigation";
import Pagination from "@/components/pagination/Pagination";
import PageTitle from "@/components/PageTitle";
import {Label, Select, SelectOnChangeData, useId} from "@fluentui/react-components";


const pageSize = 10;

export const Archives: FC<any> = ({listData, totalPage, searchQuerySource}) => {
  const navi = useNavi();
  const router = useRouter();
  const pageNum = Number(router.query?.pageNum) ?? 1;

  const yearSelectorId = useId('year');
  const yearList = [
    {value: '', label: '请选择...'},
    ...Object.keys(searchQuerySource).map(v => ({value: v, label: v + '年'}))
  ]
  const [year, setYear] = useState('');
  const onYearChange = (e: ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) => {
    setYear(data.value)
  }

  const monthSelectorId = useId("month");
  const monthList = useMemo(() => {
    if (year) {
      return [
        {value: '', label: '请选择...'},
        ...searchQuerySource[year].map((v: string) => ({value: v, label: v + '月'}))
      ]
    } else return [{value: '', label: '请选择...'}]
  }, [year])
  const [month, setMonth] = useState('');
  const onMonthChange = (e: ChangeEvent<HTMLSelectElement>, data: SelectOnChangeData) => {
    setMonth(data.value)
  }

  return <IndexLayout>
    <PageTitle title="归档，现以时间排序" subtitle="How time flies"/>
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
              monthList.map(v => <option key={v.value} value={v.value}>{v.label}</option>)
            }
          </Select>
        </div>
      </div>
      <div className="flex flex-col w-full" style={{minHeight: 'calc(100vh - 210px)'}}>
        {
          listData.map((obj: any) => <p className="my-5" onClick={() => navi.push('/detail/' + obj.id)}
                                        key={obj.id}>{obj.name}</p>)
        }
      </div>
      <div className="flex flex-row items-center justify-center w-full my-3">
        <Pagination totalPage={totalPage} pageNum={pageNum}
                    onPageChange={(num: number) => navi.push('/archives/' + num)}></Pagination>
      </div>
    </FluidWrapper>
  </IndexLayout>
}

export const getStaticPaths: GetStaticPaths = async () => {
  let articles: Array<any> = await getArticlesList()
  const totalPage = Math.ceil(articles.length / pageSize);
  const paths = Array.from({length: totalPage}, (_, i) => i + 1)
    .map(v => ({params: {pageNum: String(v)}}))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;
  const pageNum = Number(params?.pageNum ?? 1);
  let articles: Array<any> = await getArticlesList()
  const searchQuerySource: any = {};
  articles.forEach(({updateTime}) => {
    const [year, month] = updateTime.slice(0, 7).split('-');
    const formattedMonth = String(Number(month));
    searchQuerySource[year] = [...new Set([...(searchQuerySource[year] || []), formattedMonth])].sort();
  });
  Object.keys(searchQuerySource).sort().forEach((year) => {
    searchQuerySource[year] = searchQuerySource[year].map((month: any) => String(Number(month))).sort();
  });
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalPage = Math.ceil(articles.length / pageSize);
  return {
    props: {
      listData: articles.slice(startIndex, endIndex),
      totalPage,
      searchQuerySource
    },
  }
}

export default Archives;
