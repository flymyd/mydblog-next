import {FC} from "react";

import {Timeline, Text, Card} from '@mantine/core';
import FluidWrapper from "@/components/layouts/FluidWrapper";
import ProjectLayout from "@/components/layouts/ProjectLayout";

const groupLink = "http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=VDw91xtKYSUf5D09WbNZlGJasuqc6IXc&authKey=LhHCCwxdHsbmO34Lff0AFSjo9f0OXWsBbNOJS5eaKGlOp1e93d%2FD8MMTfFnsf2LS&noverify=0&group_code=928301808"
const Escape: FC = () => {
  return (
    <>
      <ProjectLayout title="前端逃生舱">
        <FluidWrapper>
          <div className="w-full">
            <div style={{padding: 20}}>
              <div className="flex flex-col justify-center items-center">
                <span className="font-bold text-3xl m-5 mt-0">前端逃生舱</span>
                <span className="font-bold text-lg mb-5">最后更新时间：2023-12-01 16:42:08</span>
              </div>
              <Timeline color="dimmed" active={1} bulletSize={12} lineWidth={2}>
                <Timeline.Item color="green" title="2023-06-14 晚">
                  <Card className="mt-3" shadow="sm" p="lg" radius="md" withBorder>
                    <Text size="sm">被文字狱迫害的学者们
                      {/*<Text style={{cursor: 'pointer'}} variant="link" component="span" inherit>*/}
                      {/*  <a target="_blank" href={groupLink} rel="noreferrer" style={{color: 'blue'}}>加入本群</a>*/}
                      {/*</Text>*/}
                    </Text>
                    <Text size="xs" className="mt-1">群号：928301808</Text>
                    <Text size="xs" mt={4}>老陈 重建于 2023-09-22</Text>
                  </Card>
                </Timeline.Item>
                <Timeline.Item color="red" title="2023-09-22 晚">
                  <Card className="mt-3" shadow="sm" p="lg" radius="md" withBorder>
                    <Text color="dimmed" size="sm">好好工作好好吃饭 已被封禁</Text>
                    <Text color="dimmed" size="xs" mt={4}>胭脂 重建于 2023-06-14</Text>
                    <Text color="dimmed" size="xs" mt={4}>落幕僚 封号7天</Text>
                  </Card>
                </Timeline.Item>
                <Timeline.Item color="red" title="2023-06-14 晚">
                  <Card className="mt-3" shadow="sm" p="lg" radius="md" withBorder>
                    <Text color="dimmed" size="sm">前端新津 已被封禁</Text>
                    <Text color="dimmed" size="xs" mt={4}>老鼠人 重建于 2022-10-17</Text>
                    <Text color="dimmed" size="xs" mt={4}>夏雪冬花 永封 / 兔兔 封号7天</Text>
                  </Card>
                </Timeline.Item>
                <Timeline.Item color="red" title="2022-10-17 晚">
                  <Card className="mt-3" shadow="sm" p="lg" radius="md" withBorder>
                    <Text color="dimmed" size="sm">前端耶路撒冷 已被封禁</Text>
                    <Text color="dimmed" size="xs" mt={4}>夏雪冬花 重建于 2022-09-06</Text>
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
      </ProjectLayout>
    </>
  )
}
export default Escape;
