import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import In2Logo from './assets/images/in2-logo.svg';
import { Content, Header, Layout, Menu, Paragraph, Row, Sider } from './components/atoms';
import { protectedRouts } from './constants/routes';
import HeadUserDropdown from './components/molecules/HeadUserDropdown';
import { getUserRole } from './selectors/users';

const { SubMenu } = Menu;

const HeaderContent = styled.div`
  width: 100%;
  padding: 15px 30px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    font-size: 22px;
    margin-right: 30px;
    margin-top: 7px;
    cursor: pointer;
    color: #717579;
  }
`;
const LogoWrapper = styled.div`
  width: 100%;
  padding: 30px 100px 20px 50px;

  img {
    width: 100%;
    height: 100px;
    display: block;
  }

  ${props =>
    props.type === 'collapsed' &&
    css`
      padding: 50px 0;
      img {
        display: none;
      }
    `}
`;

const convertRoutes = routes => {
  let pushData = [...Object.values(routes)];
  for (const key in routes) {
    if (routes[key].items) {
      pushData = [...pushData, ...Object.values(routes[key].items)];
    }
  }
  return pushData;
};

const DashboardWrapper = ({ location, history, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const role = useSelector(getUserRole);
  const convertedRoutes = convertRoutes(protectedRouts[role]);
  const pageData = Object.values(convertedRoutes).find(el => {
    return el.pathname === location.pathname;
  });

  const collapsedText = collapsed ? 'collapsed' : '';

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme='light'
        width={300}
        collapsedWidth={56}
        shadow='7px 0 80px rgba(0, 0, 0, 0.05)'
      >
        <LogoWrapper type={collapsedText}>
          <img src={In2Logo} alt='logo' />
        </LogoWrapper>
        <Menu
          mode='inline'
          selectedKeys={location.pathname}
          defaultOpenKeys={[(!collapsed && pageData?.subKey) || '']}
          type='sidebar'
          sectype={collapsedText}
        >
          {Object.values(protectedRouts[role]).map(menuitem =>
            menuitem.items ? (
              <SubMenu key={menuitem.key} icon={menuitem.icon} title={menuitem.pageTitle}>
                {Object.values(menuitem.items).map(subItem => (
                  <Menu.Item
                    key={subItem.pathname}
                    onClick={() => {
                      setCollapsed(true);
                      history.push(subItem.pathname);
                    }}
                  >
                    {subItem.pageTitle}
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              !menuitem.hideInSidebar && (
                <Menu.Item
                  key={menuitem.pathname}
                  icon={menuitem.icon}
                  onClick={() => {
                    setCollapsed(true);
                    history.push(menuitem.pathname);
                  }}
                >
                  {menuitem.pageTitle}
                </Menu.Item>
              )
            )
          )}
        </Menu>
      </Sider>
      <Layout>
        <Header padding='0' back_color='#fff' height='80px'>
          <HeaderContent>
            <Row align='middle'>
              <div onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
              <Paragraph mb={0} fz={24} fw={500}>
                {pageData?.pageTitle || 'Dashboard'}
              </Paragraph>
            </Row>
            <HeadUserDropdown />
          </HeaderContent>
        </Header>
        <Content back_color='#fbfbfb' padding='15px 30px'>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default React.memo(withRouter(DashboardWrapper));
