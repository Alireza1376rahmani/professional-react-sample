import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userIsAuth } from 'selectors/users';
import DashboardWrapper from './DashboardWrapper';

import Routes from './Routes';
import GuestWrapper from './GuestWrapper';

const AppRouter = props => {
  const isAuth = useSelector(userIsAuth);

  const renderWrapper = () => {
    if (isAuth) {
      return (
        <DashboardWrapper isAuth={isAuth}>
          <Routes {...props} />
        </DashboardWrapper>
      );
    }

    return (
      <GuestWrapper>
        <Routes {...props} />
      </GuestWrapper>
    );
  };

  return <BrowserRouter>{renderWrapper()}</BrowserRouter>;
};

export default AppRouter;
