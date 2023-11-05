import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

import { App } from './App';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
