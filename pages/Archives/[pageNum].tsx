import {FC} from "react";
import {useRouter} from "next/router";

const Archives: FC<{article: any}> = ({article}) => {
  const router = useRouter();
  const {pageNum} = router.query;
  return <div>
    <h1>
      Page num is: {pageNum}
    </h1>
    <p>{article}</p>
  </div>
}
// https://donghua.kuonnjiarisu.top:19198/myfiles/getFile?uuid=1063da32-48e7-4c36-a6ad-b8a69c60e18d
export async function getStaticProps(){
  const res = await fetch("https://mydblog.obs.cn-east-3.myhuaweicloud.com/files/1063da32-48e7-4c36-a6ad-b8a69c60e18d")
  const posts = await res.text();
  return {
    props: {article: posts}
  }
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { pageNum: '1' } }, { params: { pageNum: '2' } }],
    fallback: false, // can also be true or 'blocking'
  }
}
export default Archives;
