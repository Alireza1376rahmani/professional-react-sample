import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import routes from 'constants/routes';
import { useSelector } from 'react-redux';
import asyncComponent from './asyncComponent';
import { isAuth, isNotAuth } from './configs/auth';
import getPageContainer, { getPageComponents } from './getPageContainer';
import { getUserRole } from './selectors/users';

const NotFoundPage = asyncComponent(() => import('./pages/not-found.page'));

const Routes = () => {
  const role = useSelector(getUserRole);
  const protectedRouts = getPageComponents(role);

  return (
    <Switch>
      {/* unprotected routes */}
      {Object.values(routes).map(route => (
        <Route
          exact
          path={route.pathname}
          key={route.pathname}
          component={isNotAuth(getPageContainer(route.component))}
        />
      ))}
      {/* protected routes */}
      {protectedRouts.map(route => {
        return (
          <Route
            exact
            key={route.pathname}
            path={route.absPathname || route.pathname}
            component={isAuth(getPageContainer(route.component))}
            // component={getPageContainer(route.component)}
          />
        );
      })}
      {/* 404 */}
      <Route exact path={routes.notFound.pathname} component={NotFoundPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default withRouter(Routes);
