import {FC, useEffect} from "react";
import {Code, Title, Text, List} from "@mantine/core";
import Clipboard from 'clipboard';
import FluidWrapper from "@/components/layouts/FluidWrapper";
import {CONST} from "@/utils/CONST";
import ProjectLayout from "@/components/layouts/ProjectLayout";

const toolsUrl = 'https://mydblog.obs.cn-east-3.myhuaweicloud.com/kms-activate.zip'
const gitUrl = 'https://github.com/jm33-m0/kms-activate';
const KMS: FC = () => {
  useEffect(() => {
    const copy = new Clipboard('.copy-uuid');
  }, [])
  const kmsCmd = `slmgr -skms van.ac.cn\nslmgr -ato`
  return (
    <>
      <ProjectLayout title="KMS在线激活服务器">
        <FluidWrapper>
          <div className="flex flex-col">
            <Title order={1} className="mb-3 mt-3">KMS在线激活服务器</Title>
            <div className="flex flex-row mb-3">
              <Text fz="lg">域名（点击复制）：</Text>
              <a className="copy-uuid cursor-pointer" data-clipboard-text="van.ac.cn">
                <Text fs="italic" fz="lg" td="underline" c="blue">van.ac.cn</Text>
              </a>
            </div>
            <Title order={3} className="mb-3">使用方法</Title>
            <Title order={4} className="mb-3">在命令行中激活Windows</Title>
            <Text className="mb-3">
              按Win+X然后按A，以管理员身份打开PowerShell或命令提示符，下面的命令每复制一行就回车执行一次，弹出信息框后可继续复制执行。
            </Text>
            <Code block className="mb-3">
              {kmsCmd}
            </Code>
            <Title order={4} className="mb-3">使用软件一键激活</Title>
            <div className="flex flex-row mb-3" style={{flexWrap: 'wrap'}}>
              <Text>本工具为开源项目</Text>
              <Text fs="italic" td="underline" c="blue">
                <a href={gitUrl} target="_blank" rel="noreferrer">{gitUrl}</a>
              </Text>
              <Text>的v1.4.3原版文件，安全无毒，请放心使用。</Text>
              <Text>下载后请解压并执行kms-activate.exe，并在KMS Server一栏填入van.ac.cn然后点击Activate即可。</Text>
            </div>
            <Text fz="lg" fw={700} td="underline" c="blue" className="mb-7">
              <a href={toolsUrl}>点我下载</a>
            </Text>
            <div className="mb-7">
              <Title order={5}
                     className="mb-3">小站维护服务器不易，如果觉得该服务对你有帮助，还请老爷扫描二维码打赏一个馒头~</Title>
              <img src={CONST.obsPath + '8588f197-8812-4f8a-8845-2a05aeb0ef09'}
                   className="w-full md:w-[60%]"/>
            </div>
          </div>
        </FluidWrapper>
      </ProjectLayout>
    </>
  )
};
export default KMS;
