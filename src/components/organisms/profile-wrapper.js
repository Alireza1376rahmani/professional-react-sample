import React, { useEffect, useState } from 'react';
import { DeleteOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { notification, Spin, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Checkbox, Col, Form, FormItem, Paragraph, Row } from '../atoms';
import { getSuccessState, getUserData, updateUsersLoading } from '../../selectors/users';
import { convertProfileData } from '../../Utils/Helpers';
import { updateLogedInUser } from '../../actions/users';
import { addUploadApi } from '../../services/uploads';
import { convertFileUrl } from './AllocAddSecStep';
import BrokerProfile from './brokers/profile';
import ClientProfile from './client/profile';

const layout = {
  layout: 'horizontal',
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const ProfileWrapper = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const user = useSelector(getUserData);
  const loading = useSelector(updateUsersLoading);
  const success = useSelector(getSuccessState);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const formItems = {
    brokers: <BrokerProfile />,
    client: <ClientProfile />,
  };

  useEffect(() => {
    form.setFieldsValue({
      ...(user?.additionalQuestions || {}),
      ...user,
    });
    setReceiveUpdates(user?.receiveUpdates || false);
    setUploadedFile(user?.avatar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (success && loading === false) {
      notification.success({
        message: 'Profile updated',
        duration: 3,
      });
    }
  }, [success, loading]);

  const updateProfile = values => {
    const defData = {
      ...user,
      avatar: uploadedFile,
      additionalQuestions: {
        ...(user?.additionalQuestions || {}),
      },
    };

    const updateData = convertProfileData(defData, { ...values, receiveUpdates });
    dispatch(updateLogedInUser.request({ id: user?.id, values: updateData }));
  };

  const uploadImage = async file => {
    setUploadLoading(true);
    const callback = await addUploadApi(file);
    setUploadLoading(false);
    if (callback) {
      const uploadedData = callback?.data ? callback?.data[0] : null;
      setUploadedFile({ ...uploadedData, url: convertFileUrl(uploadedData?.url) });
    }
    return false;
  };
  return (
    <Spin spinning={loading || false}>
      <Row padding='0 0 30px 0' border_bot='1px solid #EEEEEE' mb={30}>
        <Paragraph type='secondary' fz={24} fw={600} mb={0}>
          Profile
        </Paragraph>
      </Row>
      <Row>
        <Col mb={30}>
          <Paragraph type='secondary' fw={400}>
            Avatar
          </Paragraph>
          <Row>
            <Col span={24} mb={30}>
              <Avatar
                size={150}
                radius='10px'
                icon={<UserOutlined />}
                src={uploadedFile?.url || ''}
              />
            </Col>
            <Col span={24}>
              <Upload
                listType='text'
                beforeUpload={uploadImage}
                maxCount={1}
                fileList={uploadedFile ? [uploadedFile] : []}
                showUploadList={false}
                customRequest={() => {}}
                accept='.jpeg,.jpg,.png,.svg'
              >
                {uploadedFile ? (
                  <Button
                    type='destructive_outline'
                    icon={<DeleteOutlined />}
                    radius='10px'
                    width='150px'
                    padding='0 8px'
                    onClick={e => {
                      e.stopPropagation();
                      setUploadedFile(null);
                    }}
                    loading={uploadLoading}
                  >
                    Remove image
                  </Button>
                ) : (
                  <Button
                    type='dark_outline'
                    icon={<UploadOutlined />}
                    radius='10px'
                    width='150px'
                    loading={uploadLoading}
                  >
                    Upload image
                  </Button>
                )}
              </Upload>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Form {...layout} form={form} mb={15} onFinish={updateProfile}>
            {formItems[user?.role?.type || 'brokers']}
            <Col span={24} padding='0 0 0 12px' mb={30}>
              <Checkbox
                key='receiveUpdates'
                checked={receiveUpdates}
                onChange={e => setReceiveUpdates(e.target.checked)}
              >
                I would like to receive updates
              </Checkbox>
            </Col>
            <Col span={24} justify='flex-end'>
              <FormItem>
                <Button type='primary' htmlType='submit' width='120px' loading={loading}>
                  Update
                </Button>
              </FormItem>
            </Col>
          </Form>
        </Col>
      </Row>
    </Spin>
  );
};

export default ProfileWrapper;
