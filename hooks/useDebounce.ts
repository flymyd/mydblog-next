import {useEffect, useRef} from 'react'

const useDebounce = (fn: any, ms = 30, deps: Array<any> = []) => {
  let timeout: any = useRef<any>()
  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      fn()
    }, ms)
  }, deps)

  const cancel = () => {
    clearTimeout(timeout.current)
    timeout = null
  }
  return [cancel]
}

export default useDebounce
