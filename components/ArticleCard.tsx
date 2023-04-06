import {CSSProperties, FC} from "react";
import {ArticleCardType} from "@/types/ArticleCardType";
import styles from "@/styles/ArticleCard.module.scss";
import {useRouter as useNavi} from "next/dist/client/components/navigation";

const dateStyle = {fontSize: "14px", fontWeight: 600, color: "#6e6e73", lineHeight: '2em'}
const articleWrapperStyle: CSSProperties = {
  borderRadius: '16px',
  overflow: 'hidden',
  marginBottom: '36px',
  cursor: 'pointer',
  userSelect: 'none',
  width: '100%',
};
const getTextWrapperStyle = (type: any) => {
  return {flex: 1, padding: type == "small" ? 24 : 32, minHeight: type === 'small' ? 140 : 174}
}
const ArticleCard: FC<ArticleCardType> = (props: ArticleCardType, context) => {
  const {type, title, updateTime, poster, tags, id} = props;
  const navi = useNavi();
  const toDetail = (id: number) => {
    navi.push('/detail/' + id)
  }
  return (
    // 大号卡片使用左右布局，文字纵向两端对齐
    // 其它卡片使用上下布局
    <div className={type === 'large' ? styles['card-root'] : 'flex flex-col'} style={articleWrapperStyle}
         onClick={() => toDetail(id)}>
      {
        poster ?
          <div className={styles[`card-img-cover${type === 'large' ? '-large' : ''}`]}>
            <img className={styles[`card-img${type === 'large' ? '-large' : ''}`]} src={poster} alt={title}/>
          </div> :
          <div
            className={[styles[`card-img${type === 'large' ? '-large' : ''}`], 'flex flex-row items-center justify-center bg-gray-500'].join(' ')}>暂无图片</div>
      }
      <div
        className={[styles['card-text-wrapper'], 'flex flex-col justify-between bg-white', type === 'small' ? styles['card-text-wrapper-small'] : '', type === 'large' ? styles['card-text-wrapper-large'] : ''].join(' ')}>
        <div className="flex flex-col">
          <span
            className={[styles['card-title'], type === 'large' ? styles['card-title-large'] : ''].join(' ')}>{title}</span>
          {
            Array.isArray(tags) && tags.length > 0 ? <span style={{
              color: '#6E6E73',
              fontSize: 12,
              fontWeight: 700,
              marginTop: 8
            }}>{tags.join(", ")}</span> : <></>
          }
        </div>
        <span style={dateStyle}>{new Date(updateTime).toLocaleString('zh-Hans-CN')}</span>
      </div>
    </div>
  )
}

export default ArticleCard;
