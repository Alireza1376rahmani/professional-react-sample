import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Button, Paragraph } from '../atoms';
import In2Logo from '../../assets/images/in2-logo.svg';

const ThankYouWrapper = styled.div`
  width: 100%;
  padding: 100px 0;
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 175px;
    margin-bottom: 15px;
  }
`;

const ThankYou = ({ history }) => {
  return (
    <ThankYouWrapper>
      <img src={In2Logo} alt='logo' />
      <Paragraph fz={20} mb={40}>
        Thank you for joining!
      </Paragraph>
      <Button type='primary' width='130px' onClick={() => history.push('/sign-in')}>
        Get started
      </Button>
    </ThankYouWrapper>
  );
};

export default withRouter(ThankYou);
