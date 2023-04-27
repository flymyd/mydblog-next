import {FC} from "react";
import IndexLayout from "@/components/layouts/IndexLayout";
import {useRouter as useNavi} from "next/dist/client/components/navigation";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import PageTitle from "@/components/PageTitle";
import ProjectsStyle from "@/styles/Projects.module.scss";
import {CONST} from "@/utils/CONST";

const projectsList = [
  {img: 'poe-navigator', route: '/projects/PoeNavigator'},
  {img: 'a145094a-e1e5-47cb-a85a-0ba278620e9f', route: '/projects/Escape'},
  {img: 'cff108ac-399e-41aa-b079-1a8f4e0deda4', route: '/projects/KMS'},
  {img: '763fb304-5b85-4aee-bc0c-a48d96f60785', route: '/projects/CatGenerate'},
]
const Projects: FC = () => {
  const navi = useNavi();
  const clickCard = (route: string | Function) => {
    if (typeof route === "string") {
      navi.push(route)
    } else route();
  }
  return (
    <IndexLayout>
      <PageTitle title="有趣的Projects" subtitle="有时候也许不有趣，但可能有用"/>
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
                </li>
              </div>
            })}
          </ul>
        </div>
      </FluidWrapper>
    </IndexLayout>
  )
}
export default Projects;
