import React from 'react';
import ModalContent from '../molecules/ModalContent';
import {
  Col,
  DatePicker,
  Form,
  FormItem,
  Input,
  InputNumber,
  MaskedInput,
  ModalWrapper,
  Row,
  Select,
} from '../atoms';
import { postalMask, postalPattern } from '../../constants/etc';

const layout = {
  layout: 'horizontal',
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const ProjectAddModal = ({ closeModal, editData }) => {
  const [form] = Form.useForm();

  return (
    <ModalWrapper closeModal={closeModal}>
      <ModalContent title={`${editData ? 'Edit' : 'New'} Project`} closeModal={closeModal}>
        <Form
          form={form}
          {...layout}
          // initialValues={defData}
          // onFinish={values => saveCustomer({ ...values, CustomerDocuments: uploadedFile })}
        >
          <Row gutter={24} padding='30px'>
            <Col span={24}>
              <FormItem
                name='builder'
                label='Builder'
                rules={[
                  {
                    required: true,
                    message: 'Please select builder name!',
                  },
                ]}
              >
                <Select>
                  <Select.Option value='1'>Builder</Select.Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                name='ProjectName'
                label='Project name'
                rules={[
                  {
                    required: true,
                    message: 'Please input project name!',
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                name='Address1'
                label='Address'
                rules={[
                  {
                    required: true,
                    message: 'Please input Address!',
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                name='City'
                label='City'
                rules={[
                  {
                    required: true,
                    message: 'Please select City!',
                  },
                ]}
              >
                <Select>
                  {['Toronto'].map(el => (
                    <Select.Option value={el} key={el}>
                      {el}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                name='PostalCode'
                label='Postal Code'
                rules={[
                  {
                    required: true,
                    message: 'Please input Postal Code!',
                  },
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
              <FormItem
                name='Province'
                label='Province/State'
                rules={[
                  {
                    required: true,
                    message: 'Please select Province!',
                  },
                ]}
              >
                <Select>
                  {['Ontario'].map(el => (
                    <Select.Option value={el} key={el}>
                      {el}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                name='Country'
                label='Country'
                rules={[
                  {
                    required: true,
                    message: 'Please select Country!',
                  },
                ]}
              >
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
              <FormItem
                name='city'
                label='City'
                rules={[
                  {
                    required: true,
                    message: 'Please select City!',
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                name='launchDate'
                label='Launch Date'
                rules={[
                  {
                    required: true,
                    message: 'Please select Launch Date!',
                  },
                ]}
              >
                <DatePicker width='100%' />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                name='units'
                label='Total Units'
                rules={[
                  {
                    required: true,
                    message: 'Please select Total Unit!',
                  },
                ]}
              >
                <InputNumber width='100%' />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                name='floor'
                label='Total Floors'
                rules={[
                  {
                    required: true,
                    message: 'Please select Total Floors!',
                  },
                ]}
              >
                <InputNumber width='100%' />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ProjectAddModal;
