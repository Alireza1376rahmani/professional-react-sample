import { protectedRouts } from 'constants/routes';
import asyncComponent from './asyncComponent';

// eslint-disable-next-line import/no-anonymous-default-export
export default path => asyncComponent(() => import(`./${path}`));

export const getPageComponents = role => {
  const components = [];

  Object.values(protectedRouts[role]).forEach(route => {
    components.push({
      component: route.component,
      pathname: route.pathname,
      absPathname: route.absPathname,
    });

    if (route.items) {
      Object.values(route.items).forEach(childRoute =>
        components.push({
          component: childRoute.component,
          pathname: childRoute.pathname,
          absPathname: childRoute.absPathname,
        })
      );
    }
  });

  return components;
};
