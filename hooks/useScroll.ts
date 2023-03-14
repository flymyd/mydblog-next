import {useState, useEffect, RefObject} from 'react'

const useScroll = (scrollRef: RefObject<any>) => {
  const [position, setPosition] = useState([0, 0])
  useEffect(() => {
    function handleScroll(e: WheelEvent) {
      setPosition([scrollRef.current.scrollLeft, scrollRef.current.scrollTop])
    }
    scrollRef.current.addEventListener('scroll', handleScroll, false)
    return () => {
      scrollRef.current?.removeEventListener('scroll', handleScroll, false)
    }
  }, [])

  return position
}

export default useScroll
