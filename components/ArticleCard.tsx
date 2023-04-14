import {CSSProperties, FC, useEffect, useState} from "react";
import {ArticleCardType} from "@/types/ArticleCardType";
import styles from "@/styles/ArticleCard.module.scss";
import {useRouter as useNavi} from "next/dist/client/components/navigation";
import {getArticlePoster} from "@/utils/cardHelper";
import useUpdateTime from "@/hooks/useUpdateTime";

const dateStyle = {fontSize: "14px", fontWeight: 600, color: "#6e6e73", lineHeight: '2em'}
const articleWrapperStyle: CSSProperties = {
  borderRadius: '16px',
  overflow: 'hidden',
  marginBottom: '36px',
  cursor: 'pointer',
  userSelect: 'none',
  width: '100%',
};
const ArticleCard: FC<ArticleCardType> = (props: ArticleCardType) => {
  const {type, title, poster, tags, id} = props;
  const navi = useNavi();
  const updateTime = useUpdateTime(props.updateTime)
  const toDetail = () => {
    navi.push('/detail/' + id)
  }
  return (
    // 大号卡片使用左右布局，文字纵向两端对齐
    // 其它卡片使用上下布局
    <div className={type === 'large' ? styles['card-root'] : 'flex flex-col'} style={articleWrapperStyle}
         onClick={() => toDetail()}>
      {
        poster ?
          <div className={styles[`card-img-cover${type === 'large' ? '-large' : ''}`]}>
            <img className={styles[`card-img${type === 'large' ? '-large' : ''}`]} src={getArticlePoster(poster, title)}
                 alt={title}/>
          </div> :
          <div
            className={[styles[`card-img${type === 'large' ? '-large' : ''}`],
              'flex flex-row items-center justify-center bg-gray-500'].join(' ')}>暂无图片</div>
      }
      <div
        className={[styles['card-text-wrapper'], 'flex flex-col justify-between bg-white',
          type === 'small' ? styles['card-text-wrapper-small'] : '',
          type === 'large' ? styles['card-text-wrapper-large'] : ''].join(' ')}>
        <div className="flex flex-col">
          <span
            className={[styles['card-title'],
              type === 'large' ? styles['card-title-large'] : ''].join(' ')}>{title}</span>
          {
            Array.isArray(tags) && tags.length > 0 ? <span style={{
              color: '#6E6E73',
              fontSize: 12,
              fontWeight: 700,
              marginTop: 8
            }}>{tags.join(", ")}</span> : <></>
          }
        </div>
        <span style={dateStyle}>{updateTime}</span>
      </div>
    </div>
  )
}

export default ArticleCard;
