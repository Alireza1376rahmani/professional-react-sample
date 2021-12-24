import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthWrapper from '../../components/templates/AuthWrapper';
import { Tabs } from '../../components/atoms';
import SignIn from '../../components/organisms/sign-in';
import SignUp from '../../components/organisms/sign-up';

const { TabPane } = Tabs;

const AuthTabsPage = ({ location, history }) => {
  const authData = {
    '/sign-up': { width: '50%' },
    '/sign-in': { width: '40%' },
  };

  return (
    <AuthWrapper contentWidth={authData[location.pathname].width}>
      <Tabs
        defaultActiveKey={location.pathname}
        tab_btn_fz={18}
        list_padding='0 30px'
        onChange={val => history.push(val)}
        active_tab_btn_fw={500}
        tab_btn_color='#171B1E'
      >
        <TabPane tab='Log In' key='/sign-in'>
          <SignIn />
        </TabPane>
        <TabPane tab='Sign Up' key='/sign-up'>
          <SignUp />
        </TabPane>
      </Tabs>
    </AuthWrapper>
  );
};

export default withRouter(AuthTabsPage);
