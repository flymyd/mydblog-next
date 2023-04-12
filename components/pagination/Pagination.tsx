import {CSSProperties, FC} from "react";
import PaginationButton from "@/components/pagination/PaginationButton";

interface PaginationType {
  pageNum: number, //当前页码
  style?: CSSProperties,
  onPageChange: Function,
  totalPage: number,  //总页数
}

const Pagination: FC<PaginationType> = ({totalPage, pageNum, style, onPageChange}) => {
  const onPrevPage: any = () => {
    if (pageNum <= 1) return false;
    onPageChange(pageNum - 1)
    // setPageNum((state: number) => (state - 1))
  }
  const onNextPage: any = () => {
    if (pageNum >= totalPage) return false;
    onPageChange(pageNum + 1)
    // setPageNum((state: number) => (state + 1))
  }
  return (
    <div style={{width: 250, ...style}}>
      <div className="flex flex-row items-center content-center"
           style={{padding: '0 22px', maxWidth: '330px', margin: '0 auto'}}>
        <PaginationButton type="left" onClick={onPrevPage}/>
        <div style={{
          fontSize: 17,
          lineHeight: 1.47059,
          fontWeight: 400,
          textAlign: 'center',
          flex: '1 0 1px',
          userSelect: 'none'
        }}>
          <span>第 </span>
          <span className="pagination-num">{pageNum}</span>
          <span> / </span>
          <span className="pagination-num">{totalPage}</span>
          <span> 页</span>
        </div>
        <PaginationButton type="right" onClick={onNextPage}/>
      </div>
    </div>
  )
}
export default Pagination;
