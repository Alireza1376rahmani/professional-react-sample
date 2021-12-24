import React from 'react';
import styled, { css } from 'styled-components';
import { CaretDownOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'antd';
import { withRouter } from 'react-router-dom';
import { Menu, Paragraph, Row } from '../atoms';
import { userLogout } from '../../actions/users';
import { getUserData } from '../../selectors/users';

const UserDropDownWrapper = styled.div`
  display: flex;
  align-items: center;
  .user_logo_wrapper {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 2px;
    background: linear-gradient(205.96deg, #ffa7d7 7.6%, #cea7ff 87.33%);
    margin-right: 15px;

    .user_logo {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid #fff;
      background-color: #c4c4c4;
    }

    ${props =>
      props.logo_image &&
      css`
        .user_logo {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-image: url(${props.logo_image});
        }
      `}
  }

  .anticon-caret-down svg {
    font-size: 12px;
    margin: 5px 0 0 0;
    color: #c4c4c4;
  }
`;

const profileRoles = ['brokers', 'client'];

const HeadUserDropdown = ({ history }) => {
  const dispatch = useDispatch();
  const { username = '', firstName, lastName, role, avatar } = useSelector(getUserData);

  const userName = firstName ? `${firstName || ''} ${lastName || ''}` : username;

  return (
    <UserDropDownWrapper logo_image={avatar?.url || ''}>
      <Row align='middle'>
        <div className='user_logo_wrapper'>
          <div className='user_logo'></div>
        </div>
        <Paragraph fz={18} mb={0} margin='0 30px 0 0' fw={500}>
          {userName}
        </Paragraph>
        <Dropdown
          overlay={() => (
            <Menu>
              {profileRoles.includes(role?.type) ? (
                <Menu.Item
                  onClick={() => {
                    history.push('/profile');
                  }}
                  key='profile'
                >
                  <Paragraph mb={0}>Profile</Paragraph>
                </Menu.Item>
              ) : (
                ''
              )}
              <Menu.Item
                onClick={() => {
                  dispatch(userLogout.request());
                  history.push('/sign-in');
                }}
                key='logout'
              >
                <Paragraph mb={0}>Log out</Paragraph>
              </Menu.Item>
            </Menu>
          )}
          placement='bottomRight'
          trigger={['click']}
        >
          <CaretDownOutlined />
        </Dropdown>
      </Row>
    </UserDropDownWrapper>
  );
};

export default withRouter(HeadUserDropdown);
