import React, { useLayoutEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.matchMedia("(min-width: 1077px)")]);
    }
    window.matchMedia("(min-width: 1077px)").addListener(updateSize);
    updateSize();
    return () => window.removeEventListener( updateSize);
  }, []);
  return size;
}

function ShowWindowDimensions(props) {
  const [width, height] = useWindowSize();
  return <span>Window size: {width} x {height}</span>;
}
export default useWindowSize;