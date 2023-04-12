import {FC} from "react";
import IndexLayout from "@/components/layouts/IndexLayout";
import PageTitle from "@/components/PageTitle";

const FriendlyLink: FC = () => {
  return (
    <IndexLayout style={{height: '200vh'}}>
      <PageTitle title="友情链接" subtitle="在家靠父母，出门靠朋友"/>
    </IndexLayout>
  )
}
export default FriendlyLink;
