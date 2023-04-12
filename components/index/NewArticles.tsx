import {FC} from "react";
import ArticleCard from "@/components/ArticleCard";
import styles from "@/styles/NewArticles.module.scss";

const NewArticles: FC<{ articles: Array<any> }> = ({articles}) => {
  const newArticleRowStyle = {
    medium: {
      gridTemplateRows: "auto",
      gridTemplateColumns: 'repeat(2, 48%)',
      justifyContent: 'space-between'
    },
    small: {
      gridTemplateRows: "auto",
      gridTemplateColumns: 'repeat(3, 31%)',
      justifyContent: 'space-between'
    }
  }
  const articleListRender = () => {
    const articleList: Array<any> = articles;
    if (articleList.length < 1) {
      return <></>
    } else {
      let largeRow;
      let mediumRow: JSX.Element[] = [];
      let smallRow: JSX.Element[] = [];
      articleList.map((node, index) => {
        const params: any = {
          ...node
        }
        if (index == 0) {
          params.type = "large";
          largeRow = <ArticleCard key={params.id} {...params}></ArticleCard>
        } else if (index < 3) {
          params.type = "medium";
          mediumRow.push(<ArticleCard key={params.id} {...params}></ArticleCard>)
        } else {
          params.type = "small";
          smallRow.push(<ArticleCard key={params.id} {...params}></ArticleCard>)
        }
      })
      return (
        <>
          {largeRow}
          {mediumRow.length > 0 ?
            <div className={styles['grid-row']}
                 style={newArticleRowStyle.medium}>{mediumRow.map(node => node)}</div> : <></>}
          {smallRow.length > 0 ?
            <div className={styles['grid-row']}
                 style={newArticleRowStyle.small}>{smallRow.map(node => node)}</div> : <></>}
        </>
      )
    }
  }
  return (
    <div className={styles['news-row']} style={{width: '100%'}}>
      {articleListRender()}
    </div>
  )
}
export default NewArticles;
