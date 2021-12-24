import React from 'react';
import { Button, Checkbox, Col, Form, FormItem, Input, Row, Select } from '../atoms';

const SignUpSecStep = ({
  secForm,
  layout,
  goToFirst,
  submitSecForm,
  loading,
  receiveUpdates,
  setReceiveUpdates,
}) => {
  return (
    <>
      <Form form={secForm} {...layout} onFinish={submitSecForm}>
        <Row gutter={24}>
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
                {['1-10'].map(el => (
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
                {['Well'].map(el => (
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
            <FormItem name='hearAboutUs' label='How did you hear about us? '>
              <Input />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Checkbox
        mb={15}
        key='receiveUpdates'
        checked={receiveUpdates}
        onChange={e => setReceiveUpdates(e.target.checked)}
      >
        I would like to receive updates
      </Checkbox>
      <Row justify='end' mb={15}>
        <Button type='grey_ghost' margin='0 15px 0 0' onClick={goToFirst}>
          Previous
        </Button>
        <Button type='primary' width='100px' onClick={() => secForm.submit()} loading={loading}>
          Sign up
        </Button>
      </Row>
    </>
  );
};

export default SignUpSecStep;
