import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, Form, FormItem, Input, InputPassword, Row } from '../atoms';
import { userLogin, clearLoginError } from '../../actions/users';
import { loginError, loginLoading } from '../../selectors/users';

const layout = {
  layout: 'horizontal',
  wrapperCol: {
    span: 24,
  },
};

const SignIn = ({ history }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const error = useSelector(loginError);
  const loading = useSelector(loginLoading);

  useEffect(() => {
    if (error) {
      if (error?.data && error?.data?.redirect) {
        switch (error.data.type) {
          case 'NotVerified':
            dispatch(clearLoginError.request());
            history.push('/not-verified');
            break;
          case 'NotActive':
            dispatch(clearLoginError.request());
            history.push('/not-active');
            break;
          default:
            Notification.warning(error.data.message);
        }
      }
      form.setFields([
        {
          name: 'identifier',
          value: form.getFieldValue('identifier'),
          errors: ['Invalid credentials'],
        },
        {
          name: 'password',
          value: form.getFieldValue('password'),
          errors: ['Invalid credentials'],
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const loginUser = values => {
    dispatch(userLogin.request(values));
  };

  return (
    <Row padding='15px 30px'>
      <Form {...layout} form={form} width='100%' onFinish={loginUser}>
        <Row>
          <Col span={24}>
            <FormItem
              name='identifier'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input Email!',
                },
              ]}
            >
              <Input placeholder='Email*' />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please input Password!',
                },
              ]}
            >
              <InputPassword placeholder='Password*' />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem mb={15}>
              <Button type='primary' loading={loading} htmlType='submit' width='100%'>
                Log In
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Col justify='center' span={24}>
        <Button type='dark_ghost'>Forgot Password</Button>
      </Col>
    </Row>
  );
};

export default withRouter(SignIn);
