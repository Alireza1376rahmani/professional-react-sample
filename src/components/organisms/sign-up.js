/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Row, Tabs } from '../atoms';
import { userRegister, clearRegisteredUser } from '../../actions/users';
import { getRegisteredUser, registerError, registerLoading } from '../../selectors/users';
import BrokerSignUp from './brokers/broker-sign-up';
import ClientSignUp from './client/client-sign-up';

const { TabPane } = Tabs;

const layout = {
  layout: 'horizontal',
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const defUserData = { additionalQuestions: {} };

const SignUp = ({ history }) => {
  const [brokerFirstForm] = Form.useForm();
  const [brokerSecForm] = Form.useForm();
  const [clientForm] = Form.useForm();
  const loading = useSelector(registerLoading);
  const registeredUser = useSelector(getRegisteredUser);
  const error = useSelector(registerError);
  const [brokerStep, setBrokerStep] = useState(1);
  const [signUpRole, setSignUpRole] = useState('client');
  const dispatch = useDispatch();

  useEffect(() => {
    if (error && error.data) {
      const errorMessage = [
        {
          name: 'email',
          value: brokerFirstForm.getFieldValue('email'),
          errors: ['This email address is already in use'],
        },
      ];
      if (signUpRole === 'client') {
        clientForm.setFields(errorMessage);
      } else {
        setBrokerStep(1);
        setTimeout(() => {
          brokerFirstForm.setFields(errorMessage);
        }, 0);
      }
    }
  }, [error]);

  useEffect(() => {
    if (registeredUser) {
      dispatch(clearRegisteredUser.request());
      history.push('/thank-you');
    }
  }, [registeredUser]);

  useEffect(() => {
    brokerFirstForm.resetFields();
    brokerSecForm.resetFields();
    clientForm.resetFields();
  }, [signUpRole]);

  const signUpRequest = signUpData => {
    dispatch(userRegister.request(signUpData));
  };

  return (
    <Row padding='0 30px'>
      <Tabs
        defaultActiveKey='client'
        tab_btn_fz={14}
        list_padding='0'
        active_tab_btn_fw={500}
        width='100%'
        active_tab_btn_color='#886CC0'
        tab_btn_color='#171B1E'
        onChange={setSignUpRole}
      >
        <TabPane tab='I’m a Purchaser' key='client'>
          <ClientSignUp
            signUpRequest={signUpRequest}
            layout={layout}
            clientForm={clientForm}
            loading={loading}
            defUserData={defUserData}
          />
        </TabPane>
        <TabPane tab='I’m a Broker' key='brokers'>
          <BrokerSignUp
            loading={loading}
            layout={layout}
            brokerFirstForm={brokerFirstForm}
            brokerSecForm={brokerSecForm}
            setBrokerStep={setBrokerStep}
            step={brokerStep}
            signUpRequest={signUpRequest}
            defUserData={defUserData}
          />
        </TabPane>
      </Tabs>
    </Row>
  );
};

export default withRouter(SignUp);
