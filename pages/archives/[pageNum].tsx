import {FC} from "react";
import {useRouter} from "next/router";
import IndexLayout from "@/components/layouts/IndexLayout";

const Archives: FC = () => {
  const router = useRouter();
  const pageNum = router.query?.pageNum ?? 1;
  return <IndexLayout>
    <h1>
      Page num is: {pageNum}
    </h1>
  </IndexLayout>
}


export default Archives;
