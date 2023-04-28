import {FC} from "react";
import ProjectLayout from "@/components/layouts/ProjectLayout";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import {Divider, Text} from "@fluentui/react-components";
import {Title} from "@mantine/core";
import {CONST} from "@/utils/CONST";

const updateInfo = {
  version: '1.1.8',
  lastUpdate: '2023-4-27 11:22:42'
}
const toolsUrl = `https://mydblog.obs.cn-east-3.myhuaweicloud.com/${updateInfo.version}/PoeNavigator-Setup-${updateInfo.version}.exe`
const packageList = [
  {os: 'Win', suffix: '.zip'},
  {os: 'Mac', suffix: '.dmg'},
  {os: 'Linux', suffix: '.tar.gz'},
]
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
          <Text>下载以后使用邮箱注册账号即可使用，有手就行。<Text weight="bold">不要钱。</Text></Text>
          <Text className="text-red-600">遇到问题请点击软件左侧帮助按钮并仔细阅读，通常它有助于解决99%的常见问题。</Text>
          <Divider/>
          <Title order={2}>下载链接是？</Title>
          <Text>
            <Text size={400} weight="bold" className="text-green-600 mr-2">Windows 64位安装包</Text>
            <Text size={400} underline className="text-blue-700">
              <a href={toolsUrl}>点我下载：win-amd64-{updateInfo.version}</a>
            </Text>
          </Text>
          <Title order={4}>其它版本下载：</Title>
          <Text>搭载Apple Silicon的Mac用户请下载arm64版本，Intel芯片的Mac用户请下载amd64版本。</Text>
          <Text>此处的Windows版均为绿色版，解压即用。</Text>
          {packageList.map(obj =>
            <>
              <Text>
                <Text size={400} weight="bold" className="text-yellow-500 mr-2">{obj.os} x64</Text>
                <Text size={400} underline className="text-blue-700">
                  <a
                    href={`https://mydblog.obs.cn-east-3.myhuaweicloud.com/${updateInfo.version}/PoeNavigator-1.1.8-${obj.os.toLowerCase()}-amd64${obj.suffix}`}>
                    点我下载：{obj.os.toLowerCase()}-amd64-{updateInfo.version}
                  </a>
                </Text>
              </Text>
              <Text>
                <Text size={400} weight="bold" className="text-yellow-500 mr-2">{obj.os} arm64</Text>
                <Text size={400} underline className="text-blue-700">
                  <a
                    href={`https://mydblog.obs.cn-east-3.myhuaweicloud.com/${updateInfo.version}/PoeNavigator-1.1.8-${obj.os.toLowerCase()}-arm64${obj.suffix}`}>
                    点我下载：{obj.os.toLowerCase()}-arm64-{updateInfo.version}
                  </a>
                </Text>
              </Text>
            </>
          )}
          <Divider/>
          <Title order={2}>Windows 7/8.1运行报错？</Title>
          <Text>因为构建的Chromium内核版本高于109，所以目前暂不支持过于老的系统。对Win7/8.1的支持已经在RoadMap中，预计5月上旬放出。</Text>
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
