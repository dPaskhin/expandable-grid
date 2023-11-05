import React from 'react';

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const resizeHandler = debounce(() => {
      setWindowWidth(window.innerWidth);
    });

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return windowWidth;
}

function debounce(fn: () => void) {
  let timeoutId: NodeJS.Timeout;

  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn();
    }, 50);
  };
}
