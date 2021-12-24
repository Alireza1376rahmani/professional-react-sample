import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  FormItem,
  Input,
  InputNumber,
  MaskedInput,
  ModalWrapper,
  Upload,
  Row,
  Select,
  TextArea,
} from '../atoms';
import ModalContent from '../molecules/ModalContent';
import { addNewUsers, getUsers as fetchUsers, updateUsers } from '../../actions/users';
import {
  addNewUsersError,
  addNewUsersLoading,
  getSuccessState,
  getUsers,
  updateUsersError,
  updateUsersLoading,
  usersLoading,
} from '../../selectors/users';
import {
  defFormLayout,
  phoneMask,
  phonePattern,
  postalMask,
  postalPattern,
} from '../../constants/etc';
import { clearAllErrors } from '../../actions/general';
import { addUploadApi } from '../../services/uploads';
import { convertFileUrl } from './AllocAddSecStep';
import { fetchAllBasicInformationApi } from '../../services/basic-informations';
import { allFieldLabels, roleFields } from '../../constants/fields';

const roleTexts = {
  brokers: 'Broker Agent',
  client: 'Purchaser',
  agency: 'Broker Agency',
};

const UserAddModal = ({ closeModal, editData, role }) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const success = useSelector(getSuccessState);
  const agencyListLoading = useSelector(usersLoading);
  const updateLoading = useSelector(updateUsersLoading);
  const addError = useSelector(addNewUsersError);
  const updateError = useSelector(updateUsersError);
  const addLoading = useSelector(addNewUsersLoading);
  const [isCorp, setIsCorp] = useState(false);
  const [basicInfo, setBasicInfo] = useState({ marital: [], ethnicity: [] });
  const [basicInfoLoading, setBasicInfoLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const compNameRef = useRef(null);
  const [form] = Form.useForm();
  const agencyData = users?.data || [];
  const defData = editData
    ? { ...editData, agency: editData?.agency?.id, confirmed: !editData?.confirmed }
    : {};

  useEffect(() => {
    if (isCorp) {
      compNameRef.current.focus({
        cursor: 'all',
      });
    } else {
      form.setFieldsValue({ LegalFullName: null });
    }
  }, [isCorp]);

  useEffect(() => {
    if (success) {
      closeModal();
    }
  }, [success]);

  useEffect(() => {
    dispatch(clearAllErrors.request());
    if (editData) {
      form.setFieldsValue({ ...defData });
      setUploadedFile(defData?.license);
      setIsCorp(defData?.isCorp || !!defData?.LegalFullName);
    }
    if (role === 'brokers') {
      dispatch(fetchUsers.request({ 'role.type': 'agency', _sort: 'created_at:DESC' }));
    }
    getBasicInfoData();
  }, []);

  const getBasicInfoData = () => {
    setBasicInfoLoading(true);
    fetchAllBasicInformationApi({ _sort: 'order:ASC' })
      .then(res => {
        setBasicInfoLoading(false);
        const resData = res?.data || [];
        const filteredBasics = resData.filter(el => !el?.Inactive);
        setBasicInfo({
          marital: filteredBasics?.filter(el => el?.type === 'marital'),
          ethnicity: filteredBasics?.filter(el => el?.type === 'ethnicity'),
        });
      })
      .catch(() => setBasicInfoLoading(false));
  };

  useEffect(() => {
    if ((addError && addError.data) || (updateError && updateError.data)) {
      form.setFields([
        {
          name: 'email',
          value: form.getFieldValue('email'),
          errors: ['This email address is already in use'],
        },
      ]);
    } else {
      form.setFields([
        {
          name: 'email',
          value: form.getFieldValue('email'),
          errors: null,
        },
      ]);
    }
  }, [addError, updateError]);

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

  useEffect(() => {
    form.setFieldsValue({
      license: uploadedFile?.name,
    });
  }, [uploadedFile]);

  const submitForm = formData => {
    const values = { ...formData, license: uploadedFile, confirmed: !formData?.confirmed };
    if (editData) {
      dispatch(updateUsers.request({ id: editData?.id, values }));
    } else {
      dispatch(
        addNewUsers.request({
          ...values,
          email: values.email.toLowerCase(),
          username: values.email.toLowerCase(),
          password: 'z',
          role,
        })
      );
    }
  };

  const typeFields = {
    postalCode: {
      comp: <MaskedInput mask={postalMask} />,
      rules: [
        {
          pattern: postalPattern,
          message: 'Please input valid Postal Code',
        },
      ],
      size: 6,
    },
    salutation: {
      comp: <Input placeholder='Mr.' />,
    },
    phone: {
      comp: <MaskedInput mask={phoneMask} />,
      rules: [
        {
          pattern: phonePattern,
          message: 'Please input valid Phone Number',
        },
      ],
    },
    mobile: {
      comp: <MaskedInput mask={phoneMask} />,
      rules: [
        {
          pattern: phonePattern,
          message: 'Please input valid Mobile Number',
        },
      ],
    },
    brokerageName: {
      rules: [
        {
          required: true,
          message: 'Please input Brokerage Name!',
        },
      ],
    },
    contactName: {
      rules: [
        {
          required: true,
          message: 'Please input Contact Name!',
        },
      ],
    },
    firstName: {
      rules: [
        {
          required: true,
          message: 'Please input First Name!',
        },
      ],
    },
    lastName: {
      rules: [
        {
          required: true,
          message: 'Please input Last Name!',
        },
      ],
    },
    email: {
      rules: [
        {
          type: 'email',
          message: 'The input is not valid E-mail!',
        },
        {
          required: true,
          message: 'Please input Email!',
        },
      ],
    },
    provinceState: {
      size: 6,
    },
    notes: {
      comp: <TextArea min_height='100px' max_height='190px' mb={15} />,
      size: 24,
    },
    portalAccess: {
      comp: (
        <Checkbox color='#717579' fw={400} disabled>
          Portal Access
        </Checkbox>
      ),
      valuePropName: 'checked',
      hideModalLabel: true,
    },
    blocked: {
      comp: (
        <Checkbox color='#717579' fw={400}>
          Locked
        </Checkbox>
      ),
      valuePropName: 'checked',
      hideModalLabel: true,
    },
    confirmed: {
      comp: (
        <Checkbox color='#717579' fw={400} direction='row-reverse'>
          Inactive
        </Checkbox>
      ),
      valuePropName: 'checked',
      hideModalLabel: true,
      extraFormItemProps: {
        justify: 'end',
      },
    },
    license: {
      comp: '',
      extraComp: (
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
      ),
      extraFormItemProps: {
        show_only: 'validate',
        mb: 0,
      },
      rules: [
        {
          required: true,
          message: 'Please upload Passport or Driver’s Licence!',
        },
      ],
      size: 24,
    },
    category: {
      comp: '',
    },
    agency: {
      comp: (
        <Select>
          {agencyData.map(el => (
            <Select.Option value={el?.id} key={el?.id}>
              {el?.firstName} {el?.lastName}
            </Select.Option>
          ))}
        </Select>
      ),
      rules: [
        {
          required: true,
          message: 'Please select Broker Agency!',
        },
      ],
      loading: agencyListLoading,
    },
    brokerRating: {
      comp: '',
    },
    recoNumber: {
      comp: '',
    },
    age: {
      comp: <InputNumber min={18} max={150} />,
    },
    gender: {
      comp: (
        <Select>
          {['Male', 'Female'].map(el => (
            <Select.Option value={el} key={el}>
              {el}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    martialStatus: {
      comp: (
        <Select>
          {basicInfo?.marital?.map(el => (
            <Select.Option value={el?.value} key={el?.value}>
              {el?.value}
            </Select.Option>
          ))}
        </Select>
      ),
      loading: basicInfoLoading,
    },
    ethnicity: {
      comp: (
        <Select>
          {basicInfo?.ethnicity.map(el => (
            <Select.Option value={el?.value} key={el?.value}>
              {el?.value}
            </Select.Option>
          ))}
        </Select>
      ),
      loading: basicInfoLoading,
    },
    IsCompany: {
      comp: (
        <Checkbox
          size={35}
          key='IsCompany'
          checked={isCorp}
          onChange={e => setIsCorp(e.target.checked)}
        />
      ),
      labelHeight: '27px',
      valuePropName: 'checked',
    },
    LegalFullName: {
      comp: <Input disabled={!isCorp} ref={compNameRef} />,
      rules: isCorp
        ? [
            {
              required: true,
              message: 'Please input Company Name!',
            },
          ]
        : [],
    },
  };

  const setFormItemComp = (key, type) => {
    const returnData = {
      comp: typeFields[key]?.comp || <Input />,
      rules: typeFields[key]?.rules || [],
      size: typeFields[key]?.size || 12,
      valuePropName: typeFields[key]?.valuePropName || 'value',
      loading: typeFields[key]?.loading || false,
      labelHeight: typeFields[key]?.labelHeight || '',
      hideModalLabel: typeFields[key]?.hideModalLabel || false,
      extraFormItemProps: typeFields[key]?.extraFormItemProps || {},
      extraComp: typeFields[key]?.extraComp || '',
    };
    return returnData[type];
  };

  return (
    <ModalWrapper closeModal={closeModal}>
      <ModalContent
        title={`${editData ? 'Edit' : 'New'} ${roleTexts[role]}`}
        closeModal={closeModal}
        customMaxWidth='992px'
      >
        <Row padding='30px'>
          <Form form={form} {...defFormLayout} onFinish={submitForm}>
            <Row gutter={24}>
              {roleFields[role].map(el => (
                <Col span={el.size || setFormItemComp(el.key, 'size')} key={el.key}>
                  {setFormItemComp(el.key, 'extraComp')}
                  <Spin spinning={setFormItemComp(el.key, 'loading')}>
                    <FormItem
                      name={el.key}
                      labelheight={setFormItemComp(el.key, 'labelHeight')}
                      label={
                        setFormItemComp(el.key, 'hideModalLabel') ? '' : allFieldLabels[el.key]
                      }
                      rules={setFormItemComp(el.key, 'rules')}
                      valuePropName={setFormItemComp(el.key, 'valuePropName')}
                      {...setFormItemComp(el.key, 'extraFormItemProps')}
                    >
                      {setFormItemComp(el.key, 'comp')}
                    </FormItem>
                  </Spin>
                </Col>
              ))}
            </Row>
          </Form>
          <Col span={24}>
            <Row justify='end' align='middle'>
              <Button width='100px' margin='0 15px 0 0' type='grey_ghost' onClick={closeModal}>
                Cancel
              </Button>
              <Button
                width='100px'
                type='primary'
                onClick={() => form.submit()}
                loading={updateLoading || addLoading}
              >
                {editData ? 'Save' : 'Add'}
              </Button>
            </Row>
          </Col>
        </Row>
      </ModalContent>
    </ModalWrapper>
  );
};

export default UserAddModal;
