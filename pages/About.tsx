import {FC} from "react";
import {promises as fs} from 'fs';
import path from 'path';

const About: FC<any> = (props) => {
  return <div>
    这是一个自我介绍页面
    {props.json}
  </div>
}

export async function getServerSideProps(context: any) {
  const jsonDirectory = path.join(process.cwd(), 'public')
  const json = await fs.readFile(path.join(jsonDirectory, '/articles.json'), 'utf-8')
  return {
    props: {json}
  }
}

export default About;
