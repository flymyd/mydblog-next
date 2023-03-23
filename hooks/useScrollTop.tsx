import {useEffect, useState} from 'react';

function useScrollTop() {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setHeight(document.documentElement.scrollTop || document.body.scrollTop);
    }
    window.addEventListener('scroll', handleScroll);
  }, [height]);
  return height;
}

export default useScrollTop;
