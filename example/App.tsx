import { Redirect, Route, Switch } from 'wouter';
import { ADAPTIVE_PAGE_ROUTE, AdaptivePage, DEFAULT_PAGE_ROUTER, DefaultPage } from './pages';

export const App = () => (
  <Switch>
    <Route
      path={DEFAULT_PAGE_ROUTER}
      component={DefaultPage}
    />
    <Route
      path={ADAPTIVE_PAGE_ROUTE}
      component={AdaptivePage}
    />
    <Redirect to={DEFAULT_PAGE_ROUTER} />
  </Switch>
);
