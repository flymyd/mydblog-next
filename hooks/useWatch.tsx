import {useEffect, useRef} from 'react'

const useWatch = (value: any, fn: any, config = {immediate: false}) => {
  const oldValue = useRef()
  const isFirst = useRef(false)
  useEffect(() => {
    if (isFirst.current) {
      fn(value, oldValue.current)
    } else {
      isFirst.current = true
      if (config.immediate) {
        fn(value, oldValue.current)
      }
    }
    oldValue.current = value
  }, [value])
}

export default useWatch