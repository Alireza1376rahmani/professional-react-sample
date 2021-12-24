import React from 'react';
import {
  Button,
  Col,
  Form,
  FormItem,
  Input,
  InputPassword,
  MaskedInput,
  Row,
  Select,
} from '../../atoms';
import { phoneMask, phonePattern, postalMask, postalPattern } from '../../../constants/etc';
import { convertProfileData } from '../../../Utils/Helpers';

const ClientSignUp = ({ clientForm, layout, signUpRequest, loading, defUserData }) => {
  const submitClientForm = values => {
    const updateData = convertProfileData(defUserData, values);
    delete updateData.additionalQuestions;
    const { email, password } = values;
    const signUpData = {
      username: email.toLowerCase(),
      email: email.toLowerCase(),
      password,
      role: 'client',
      ...updateData,
    };
    signUpRequest(signUpData);
  };

  return (
    <>
      <Form form={clientForm} {...layout} mb={15} onFinish={submitClientForm}>
        <Row gutter={24}>
          <Col span={12}>
            <FormItem
              name='firstName'
              label='First Name'
              rules={[
                {
                  required: true,
                  message: 'Please input your First Name!',
                },
              ]}
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name='lastName'
              label='Last Name'
              rules={[
                {
                  required: true,
                  message: 'Please input your Last Name!',
                },
              ]}
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name='email'
              label='Email address'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name='phone'
              label='Phone number'
              rules={[
                {
                  pattern: phonePattern,
                  message: 'Please input valid Phone Number',
                },
              ]}
            >
              <MaskedInput mask={phoneMask} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name='country' label='Country'>
              <Select>
                {['Canada'].map(el => (
                  <Select.Option value={el} key={el}>
                    {el}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name='city' label='City'>
              <Input />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name='address1' label='Street'>
              <Input />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name='address2' label='Suite'>
              <Input />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name='provinceState' label='Province/State'>
              <Input />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name='postalCode'
              label='Postal code'
              rules={[
                {
                  pattern: postalPattern,
                  message: 'Please input valid Postal Code',
                },
              ]}
            >
              <MaskedInput mask={postalMask} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name='password' label='Password' required>
              <InputPassword />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              name='repeatPassword'
              label='Confirm Password'
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Password Mismatch!'));
                  },
                }),
              ]}
            >
              <InputPassword />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem name='hearAboutUs' label='How did you hear about us?'>
              <Input />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Row justify='end' mb={15}>
        <Button type='primary' width='100px' onClick={() => clientForm.submit()} loading={loading}>
          Sign up
        </Button>
      </Row>
    </>
  );
};

export default ClientSignUp;
