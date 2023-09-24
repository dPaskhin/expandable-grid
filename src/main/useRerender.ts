import React from 'react';

export function useRerender() {
  const [, setState] = React.useState(0);

  return () => setState((prevState) => prevState + 1);
}
