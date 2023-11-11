import React from 'react';

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const throttledSetter = throttle(setWindowWidth);

    const resizeHandler = (event: UIEvent) => {
      throttledSetter((event.currentTarget as Window).innerWidth);
    };

    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return windowWidth;
}

function throttle<Args extends any[]>(fn: (...args: Args) => void, delay = 50): (...args: Args) => void {
  let cooling: boolean;
  let stashedArgs: Args | null;

  const cool = () => {
    setTimeout(() => {
      if (stashedArgs === null) {
        cooling = false;
      } else {
        fn(...stashedArgs);
        stashedArgs = null;
        setTimeout(cool, delay);
      }
    }, delay);
  };

  return (...args) => {
    if (cooling) {
      stashedArgs = args;
      return;
    }

    fn(...args);
    cooling = true;
    cool();
  };
}
