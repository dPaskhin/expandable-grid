import { useCallback, useState } from 'react';

interface IParams<T> {
  func: T;
  wait?: number;
  immediate?: boolean;
}

export const useDebounce = <T extends Function>({
  func,
  immediate = false,
  wait = 100,
}: IParams<T>) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  return useCallback(() => {
    const later = () => {
      setTimer(null);
      if (!immediate) {
        func();
      }
    };
    const callNow = immediate && !timer;

    if (timer !== null) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(later, wait));
    if (callNow) {
      func();
    }
  }, [timer, func, immediate, wait]);
};
