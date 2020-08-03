import { routes } from '@features/Router/utils/routes';

export const getCurrentTab = (path: string) => {
  const index = routes.findIndex(route => path === route.path);

  return index !== -1 ? index : 0;
};
