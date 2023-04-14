import {FC} from "react";
import IndexLayout from "@/components/layouts/IndexLayout";
import PageTitle from "@/components/PageTitle";
import ProjectsStyle from "@/styles/Projects.module.scss";
import {CONST} from "@/utils/CONST";
import FluidWrapper from "@/components/layouts/FluidWrapper";
const projectsList = [
  {img: '3bfe26be-2ac4-4dff-a28a-19c16f442e47', route: 'https://kuonnjiarisu.top/', title: '有珠珠的日记本'},
]
const FriendlyLink: FC = () => {
  const clickCard = (route: string | Function) => {
    if (typeof route === "string") {
      window.open(route)
    } else route();
  }
  return (
    <IndexLayout>
      <PageTitle title="友情链接" subtitle="在家靠父母，出门靠朋友"/>
      <FluidWrapper>
        <div className={ProjectsStyle.grids}>
          <ul className={ProjectsStyle.ulb}>
            {projectsList.map(v => {
              return <div key={v.route}>
                <li style={{
                  background: `url(${CONST.obsPath + v.img}) no-repeat`,
                  backgroundSize: '100% 100%',
                  cursor: 'pointer'
                }} onClick={() => {
                  clickCard(v.route)
                }}>
                  <div className="flex flex-row items-center justify-center" style={{height: 240, width: '100%'}}>
                    <span style={{color: '#FFF'}}>{v.title}</span>
                  </div>
                </li>
              </div>
            })}
          </ul>
        </div>
      </FluidWrapper>
    </IndexLayout>
  )
}
export default FriendlyLink;
