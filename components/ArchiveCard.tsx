import {CSSProperties, FC} from "react";
import {useRouter as useNavi} from "next/dist/client/components/navigation";
import {getArticlePoster} from "@/utils/cardHelper";
import {Text} from "@fluentui/react-components";
import {Article} from "@/types/Article";
import useUpdateTime from "@/hooks/useUpdateTime";

const imgStyle: CSSProperties = {borderRadius: 16, height: '100%', minHeight: 227};
const ArchiveCard: FC<{ article: Article }> = ({article}) => {
  const imgSource = getArticlePoster(article.poster, article.title);
  const navi = useNavi();
  const updateTime = useUpdateTime(article.updateTime)
  const toDetail = () => {
    navi.push('/detail/' + article.id)
  }
  return <>
    <div className="flex flex-col md:flex-row md:items-center py-[32px]" style={{borderTop: '1px solid #d2d2d7'}}>
      <div style={imgStyle}
           onClick={toDetail}
           className="overflow-hidden cursor-pointer flex flex-row items-center justify-center ml-[10px] w-[90%] h-full md:w-[295px] md:ml-0 bg-[#D5D5D7]">
        {
          imgSource ?
            <img className="w-full h-full" src={imgSource}/> :
            <Text italic weight="semibold" size={600} className="mx-5">{article.title}</Text>
        }
      </div>
      <div className="cursor-pointer flex flex-col mx-[16px] mt-[16px] md:ml-[32px] md:mr-0 md:mt-0 md:flex-1"
           onClick={toDetail}>
        <Text weight="bold" size={600}>{article.title}</Text>
        <Text weight="bold" size={200} className="text-[#6E6E73] my-5">{article.tags.join(', ')}</Text>
        <Text weight="medium" size={300} className="text-[#6E6E73]">{updateTime}</Text>
      </div>
    </div>
  </>
}
export default ArchiveCard;
