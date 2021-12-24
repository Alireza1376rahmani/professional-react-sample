import React from 'react';
import { Col, FormItem, Input, MaskedInput, Row, Select } from '../../atoms';
import { phoneMask, phonePattern, postalMask, postalPattern } from '../../../constants/etc';

const Profile = () => {
  return (
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
          <Input disabled />
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
        <FormItem name='whatBrokerage' label='What brokerage?'>
          <Input />
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem name='contactRanking' label='Contact ranking'>
          <Input />
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem name='ageRange' label='Age range'>
          <Select>
            {['18-30'].map(el => (
              <Select.Option value={el} key={el}>
                {el}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem name='areYouRealtor' label='Are you with a Realtor?'>
          <Select>
            {['Yes', 'No'].map(el => (
              <Select.Option value={el} key={el}>
                {el}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem name='agentName' label='Agent name'>
          <Select>
            {['John'].map(el => (
              <Select.Option value={el} key={el}>
                {el}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem name='currentHomeStatus' label='Current home status'>
          <Select>
            {['Approved'].map(el => (
              <Select.Option value={el} key={el}>
                {el}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem name='purchaseType' label='Purchase type'>
          <Input />
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem name='lookingTo' label='Looking to'>
          <Input />
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem name='exposure' label='Exposure'>
          <Input />
        </FormItem>
      </Col>
      <Col span={12}>
        <FormItem name='hearAboutUs' label='How did you hear about us?'>
          <Input />
        </FormItem>
      </Col>
    </Row>
  );
};

export default Profile;
