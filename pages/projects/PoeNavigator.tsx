import {FC} from "react";
import ProjectLayout from "@/components/layouts/ProjectLayout";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import {Divider, Text} from "@fluentui/react-components";
import {Title} from "@mantine/core";
import {CONST} from "@/utils/CONST";

const updateInfo = {
  version: '1.1.6',
  lastUpdate: '2023-4-27 11:22:42'
}
const toolsUrl = `https://mydblog.obs.cn-east-3.my huaweicloud.com/PoeNavigator-Setup-${updateInfo.version}.exe`
const PoeNavigator: FC = () => {
  return (
    <ProjectLayout title="Poe Navigator" showNavi={false}>
      <FluidWrapper>
        <div className="w-full flex flex-col gap-3 p-5">
          <Title order={1} className="mb-3 mt-3">Poe Navigator</Title>
          <Title order={2}>这是什么？</Title>
          <Text>一把神奇的可以访问由<Text weight="bold"
                                          underline>poe.com</Text>提供的大语言模型聊天服务的飞天扫帚。</Text>
          <Text>你可以用它让ChatGPT
            3.5-turbo辅助你学习、工作，或者让Claude帮你写点文章，也可以让NeevaAI帮你从互联网上搜索最新的信息。</Text>
          <Divider/>
          <Title order={2}>怎么用？</Title>
          <div className="flex flex-row">
            <Text>下载以后使用邮箱注册账号即可使用，有手就行。</Text>
            <Text weight="bold">不要钱。</Text>
          </div>
          <Divider/>
          <Title order={2}>下载链接是？</Title>
          <Text size={400} weight="bold" underline className="text-blue-700">
            <a href={toolsUrl}>点我下载-win-amd64-v{updateInfo.version}</a>
          </Text>
          <Divider/>
          <Title order={2}>有没有Mac/Linux版？</Title>
          <Text>在RoadMap中，预计5月上旬放出。</Text>
          <Divider/>
          <Title order={2}>有没有手机App？</Title>
          <Text>现在不会有，将来也不会有。</Text>
          <Divider/>
          <Title order={2}>有BUG/提交反馈？</Title>
          <Text underline>
            <a href="mailto:flymyd@foxmail.com">flymyd@foxmail.com</a>
          </Text>
          <Divider/>
          <Title order={2}>想请我喝杯卡布奇诺？</Title>
          <img src={CONST.obsPath + '8588f197-8812-4f8a-8845-2a05aeb0ef09'}
               className="w-full md:w-[60%]"/>
        </div>
      </FluidWrapper>
    </ProjectLayout>
  )
}
export default PoeNavigator
