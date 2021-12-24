/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  FormItem,
  Input,
  MaskedInput,
  Paragraph,
  Row,
  Select,
  Upload,
} from '../atoms';
import { phoneMask, phonePattern, postalMask, postalPattern } from '../../constants/etc';
import { addUploadApi } from '../../services/uploads';
import allCities from '../../constants/city-province.json';

const provinceCityList = _.groupBy(allCities, 'province_name');

export const convertFileUrl = url => {
  return url?.includes('https://') ? url : `https://${url}`;
};

const layout = {
  layout: 'horizontal',
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const defData = {
  CompanyName: '',
  FirstName: '',
  LastName: '',
  Address1: '',
  Address2: '',
  Province: '',
  City: '',
  Country: '',
  PostalCode: '',
  Phone: '',
  birthDate: '',
  Email: '',
  Website: '',
  Fax: '',
  Unit: '',
  CustomerDocuments: '',
};

const convertToFormData = ({
  Salutation,
  CompanyName,
  FirstName,
  LastName,
  Address,
  Contact,
  Occupation,
  EmployerName,
  CustomerDocuments,
}) => ({
  CompanyName,
  FirstName,
  LastName,
  Salutation,
  Address1: Address.Address1,
  Address2: Address.Address2,
  Province: Address.Province,
  City: Address.City,
  Country: Address.Country,
  PostalCode: Address.PostalCode,
  Phone: Contact.Phone,
  birthDate: Contact.birthDate,
  Email: Contact.Email,
  Occupation,
  CustomerDocuments: CustomerDocuments ? (
    <a
      download='barev'
      href={convertFileUrl(CustomerDocuments?.url)}
      rel='noreferrer'
      style={{ color: '#886CC0' }}
    >
      {CustomerDocuments?.name}
    </a>
  ) : (
    ''
  ),
  EmployerName,
});

const infoData = [
  { key: 'CompanyName', label: 'Company name' },
  { key: 'Salutation', label: 'Title' },
  { key: 'FirstName', label: 'First name' },
  { key: 'LastName', label: 'Last name' },
  { key: 'Phone', label: 'Phone' },
  { key: 'Email', label: 'Email' },
  { key: 'Address1', label: 'Address1' },
  { key: 'Address2', label: 'Address2' },
  { key: 'City', label: 'City' },
  { key: 'Province', label: 'Province' },
  { key: 'PostalCode', label: 'Postal Code' },
  { key: 'Country', label: 'Country' },
  { key: 'Occupation', label: 'Occupation' },
  { key: 'EmployerName', label: 'Employer Name' },
  { key: 'CustomerDocuments', label: 'CustomerDocuments', span: 24 },
];

const AllocAddSecStep = ({ formSecStep, saveCustomer, editData, isEditable }) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentProvince, setCurrentProvince] = useState(null);
  const [isCorp, setIsCorp] = useState(false);
  const compNameRef = useRef(null);

  useEffect(() => {
    if (editData && isEditable) {
      formSecStep.setFieldsValue(convertToFormData(editData));
      setUploadedFile(editData?.CustomerDocuments);
      setIsCorp(editData?.IsCompany || !!editData?.CompanyName);
      if (editData?.IsCompany || !!editData?.CompanyName) {
        setTimeout(() => {
          formSecStep.setFieldsValue({ CompanyName: convertToFormData(editData)?.CompanyName });
        }, 100);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    formSecStep.setFieldsValue({
      CustomerDocuments: uploadedFile?.name,
    });
  }, [uploadedFile]);

  useEffect(() => {
    if (isCorp) {
      compNameRef.current.focus({
        cursor: 'all',
      });
    } else {
      formSecStep.setFieldsValue({ CompanyName: null });
    }
  }, [isCorp]);

  const uploadFile = async file => {
    setUploadLoading(true);
    const callback = await addUploadApi(file);
    setUploadLoading(false);
    if (callback) {
      const uploadedData = callback?.data ? callback?.data[0] : null;
      setUploadedFile({ ...uploadedData, url: convertFileUrl(uploadedData?.url) });
    }
    return false;
  };

  const handleProvinceChange = val => {
    setCurrentProvince(val);
    if (!provinceCityList[val]?.find(el => el.city === formSecStep.getFieldValue('City'))) {
      formSecStep.setFieldsValue({ City: null });
    }
  };

  const handleCityChange = val => {
    const cityData = allCities.find(el => el.city === val);
    formSecStep.setFieldsValue({ Province: cityData?.province_name });
    setTimeout(() => {
      handleProvinceChange(cityData?.province_name);
    }, 10);
  };

  const cityList = currentProvince ? provinceCityList[currentProvince] || [] : allCities;

  return (
    <Col span={24} padding='30px'>
      {isEditable ? (
        <Form
          form={formSecStep}
          {...layout}
          initialValues={defData}
          onFinish={values =>
            saveCustomer({ ...values, CustomerDocuments: uploadedFile, IsCompany: isCorp })
          }
        >
          <Row gutter={16}>
            <Col span={24}>
              <Row>
                <Col span={2} direction='column'>
                  <Paragraph type='secondary' mb={0} height='27px' vert_align='center' fw={400}>
                    Corp?
                  </Paragraph>
                  <Checkbox
                    size={35}
                    key='receiveUpdates'
                    checked={isCorp}
                    onChange={e => setIsCorp(e.target.checked)}
                  />
                </Col>
                <Col span={22}>
                  <FormItem
                    name='CompanyName'
                    label='Company name'
                    rules={[
                      {
                        required: isCorp,
                        message: 'Please input First name!',
                      },
                    ]}
                  >
                    <Input disabled={!isCorp} ref={compNameRef} />
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={4}>
              <FormItem name='Salutation' label='Title'>
                <Input placeholder='Mr.' />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem
                name='FirstName'
                label='First name'
                rules={[
                  {
                    required: true,
                    message: 'Please input First name!',
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem
                name='LastName'
                label='Last name'
                rules={[
                  {
                    required: true,
                    message: 'Please input Last name!',
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                name='Address1'
                label='Address1'
                rules={[
                  {
                    required: true,
                    message: 'Please input Address1!',
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem name='Address2' label='Address2'>
                <Input />
              </FormItem>
            </Col>
            <Col span={7}>
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
                <Select showSearch={true} onChange={handleCityChange}>
                  {cityList.map(el => (
                    <Select.Option value={el.city} key={el.city}>
                      {el.city}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem
                name='Province'
                label='Province'
                rules={[
                  {
                    required: true,
                    message: 'Please select Province!',
                  },
                ]}
              >
                <Select showSearch={true} onChange={handleProvinceChange}>
                  {Object.keys(provinceCityList).map(el => (
                    <Select.Option value={el} key={el}>
                      {el}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem
                name='PostalCode'
                label='Postal'
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
            <Col span={8}>
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
                name='Email'
                label='Email'
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
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                name='Phone'
                label='Phone'
                rules={[
                  {
                    pattern: phonePattern,
                    message: 'Please input valid Phone Number',
                  },
                  {
                    required: true,
                    message: 'Please input Phone!',
                  },
                ]}
              >
                <MaskedInput mask={phoneMask} />
              </FormItem>
            </Col>
            {!isCorp && (
              <>
                <Col span={12}>
                  <FormItem
                    name='EmployerName'
                    label='Employer'
                    rules={[
                      {
                        required: true,
                        message: 'Please input Employer!',
                      },
                    ]}
                  >
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    name='Occupation'
                    label='Occupation'
                    rules={[
                      {
                        required: true,
                        message: 'Please input Occupation!',
                      },
                    ]}
                  >
                    <Input />
                  </FormItem>
                </Col>
              </>
            )}
            <Col span={12} margin='15px 0'>
              <Upload
                listType='text'
                width='100%'
                beforeUpload={uploadFile}
                maxCount={1}
                onRemove={() => setUploadedFile(null)}
                fileList={uploadedFile ? [uploadedFile] : []}
                customRequest={() => {}}
                accept='.jpeg,.jpg,.png,.tiff,.pdf,.zip,.doc,.docx'
              >
                <Button type='primary' icon={<UploadOutlined />} loading={uploadLoading}>
                  {isCorp ? 'Upload Corporation Documents' : `Upload Passport or Driver’s License`}
                </Button>
              </Upload>
            </Col>
            <Col span={24}>
              <FormItem
                name='CustomerDocuments'
                show_only='validate'
                mb={0}
                rules={[
                  {
                    required: true,
                    message: 'Please upload Passport or Driver’s Licence!',
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Col>
          </Row>
        </Form>
      ) : (
        <Row>
          {infoData.map(el => (
            <Col span={el.span || 12} display='flex' key={el.key}>
              <Paragraph type='secondary' margin='0 10px 0 0'>
                {el.label}:
              </Paragraph>
              <Paragraph type='secondary' fw={600}>
                {convertToFormData(editData)[el.key] || '-'}
              </Paragraph>
            </Col>
          ))}
        </Row>
      )}
    </Col>
  );
};

export default AllocAddSecStep;
