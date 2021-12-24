import React from 'react';
import styled from 'styled-components';
import In2Logo from '../../assets/images/in2-logo.svg';
import AuthBackImage from '../../assets/images/auth-back-image.svg';
import { ContentWrapper, Paragraph, Row } from '../atoms';

const AuthWrapperComp = styled.div`
  position: relative;
  padding: 30px 150px 30px 100px;

  .auth_logo {
    width: 255px;
    margin-bottom: 10px;
  }
  .back_image {
    width: 100%;
    height: 100%;
  }

  .auth_card_wrapper {
    position: absolute;
    top: 30px;
    right: 100px;
    padding: 30px 0;
  }
`;

const AuthWrapper = ({ children, contentWidth }) => {
  return (
    <AuthWrapperComp>
      <img src={In2Logo} alt='logo' className='auth_logo' />
      <Row mb={30}>
        <Paragraph fz={32} type='secondary' margin='0 5px 0 0'>
          Welcome to
        </Paragraph>
        <Paragraph mb={0} fz={32}>
          in2ition
        </Paragraph>
      </Row>
      <img src={AuthBackImage} alt='logo' className='back_image' />
      <div className='auth_card_wrapper' style={{ width: contentWidth }}>
        <ContentWrapper shadow='0 0 7px 3px #eaeaea' padding='10px 0'>
          {children}
        </ContentWrapper>
      </div>
    </AuthWrapperComp>
  );
};

export default AuthWrapper;
