import React from 'react';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { hot } from 'react-hot-loader/root';

import { AppRouter } from '@features/Router/AppRouter';
import { store } from '@example/app/initStore';

const AppComponent: React.FC = () => (
  <Provider store={store}>
    <CssBaseline/>
    <AppRouter/>
  </Provider>
);

export const App = hot(AppComponent);
