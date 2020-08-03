import { configureStore } from '@reduxjs/toolkit';

import { reducers } from '@example/app/reducers';

const store = configureStore({
  reducer: reducers,
});

export type IRootState = ReturnType<typeof store.getState>;

export { store };
