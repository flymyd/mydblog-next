import {FC} from "react";

import {Timeline, Text, Card} from '@mantine/core';
import ToHomeRow from "@/components/ToHomeRow";
import FluidWrapper from "@/components/layouts/FluidWrapper";
import Head from "next/head";

const groupLink = "https://qm.qq.com/cgi-bin/qm/qr?k=sxKA1x7YQcTJNHf5l_WZbIOj6yi1Oup-&jump_from=webapi&authKey=pVr4D1fW5Xg3Ui1cMCZtTaCOcdq/+5ZlBQwtbk9gm547a3Gl63Qf6hfBY6QiEPEa"
const Escape: FC = () => {
  return (
    <>
      <Head>
        <title>前端逃生舱</title>
      </Head>
      <div style={{minHeight: '100vh'}}>
        <ToHomeRow/>
        <FluidWrapper>
          <div className="w-full">
            <div style={{padding: 20}}>
              <div className="flex flex-col justify-center items-center">
                <span className="font-bold text-3xl m-5 mt-0">前端逃生舱</span>
                <span className="font-bold text-lg mb-5">最后更新时间：2023年2月6日11:37:43</span>
              </div>
              <Timeline color="dimmed" active={1} bulletSize={12} lineWidth={2}>
                <Timeline.Item color="green" title="2022-10-17 晚">
                  <Card className="mt-3" shadow="sm" p="lg" radius="md" withBorder>
                    <Text size="sm">前端瓦尔基里 <Text style={{cursor: 'pointer'}} variant="link" component="span"
                                                       inherit>
                      <a target="_blank" href={groupLink} rel="noreferrer" style={{color: 'blue'}}>加入本群</a>
                    </Text></Text>
                    <Text size="xs" mt={4}>老鼠人 重建于 2022-10-17 晚</Text>
                  </Card>
                </Timeline.Item>
                <Timeline.Item color="red" title="2022-10-17 晚">
                  <Card className="mt-3" shadow="sm" p="lg" radius="md" withBorder>
                    <Text color="dimmed" size="sm">前端耶路撒冷 已被封禁</Text>
                    <Text color="dimmed" size="xs" mt={4}>夏雪冬花 重建于 2022-09-06 晚</Text>
                  </Card>
                </Timeline.Item>
                <Timeline.Item color="dimmed" title="2022-09-06 下午">
                  <Card className="mt-3" shadow="sm" p="lg" radius="md" withBorder>
                    <Text color="dimmed" size="sm">前端交流群 已被封禁</Text>
                    <Text color="dimmed" size="xs" mt={4}>永远怀念 初代千人群</Text>
                  </Card>
                </Timeline.Item>
              </Timeline>
            </div>
          </div>
        </FluidWrapper>
      </div>
    </>
  )
}
export default Escape;
