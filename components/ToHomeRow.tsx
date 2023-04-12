import {FC} from "react";
import {IconArrowLeft} from '@tabler/icons-react';
import {ActionIcon, Text} from "@mantine/core";
import {useRouter as useNavi} from "next/dist/client/components/navigation";
const ToHomeRow: FC = () => {
  const navigate = useNavi();
  return (
    <div className="flex flex-row items-center p-3 cursor-pointer" onClick={()=>{navigate.push('/')}}>
      <ActionIcon size="sm">
        <IconArrowLeft></IconArrowLeft>
      </ActionIcon>
      <Text color="dimmed" size="sm">首页</Text>
    </div>
  )
}
export default ToHomeRow;
