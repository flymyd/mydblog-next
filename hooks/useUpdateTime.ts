import {useEffect, useState} from "react";

function useUpdateTime(time: Date | string) {
  const [updateTime, setUpdateTime] = useState(time.toString())
  useEffect(() => {
    if (time) {
      setUpdateTime(new Date(time).toLocaleString('zh-Hans-CN'))
    }
  }, [])
  return updateTime;
}

export default useUpdateTime;
