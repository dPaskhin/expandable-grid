import { useState } from 'react';

export function useRerender() {
  const [, setState] = useState(0);

  return () => setState((prevState) => prevState + 1);
}
