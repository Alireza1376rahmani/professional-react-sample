/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined, EyeOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import {
  Button,
  Checkbox,
  Col,
  Form,
  FormItem,
  Paragraph,
  Row,
  Select,
  TextArea,
  Upload,
} from '../atoms';
import { fetchProjects } from '../../actions/projects';
import { getProjects, projectsValuesLoading } from '../../selectors/projects';
import { statuses } from '../../constants/statuses';
import { floorPreferences } from '../../constants/etc';
import { fetchUnits } from '../../actions/units';
import { getUnits } from '../../selectors/units';
import { fetchUnitExposure } from '../../services/units';
import { addUploadApi } from '../../services/uploads';
import { convertFileUrl } from '../organisms/AllocAddSecStep';

const statusTexts = {
  approved: 'Approved',
  rejected: 'Declined',
  inprogress: 'In Progress',
  pending: 'Pending',
  cancelled: 'Cancelled',
  waitList: 'Wait List',
  onHold: 'On Hold',
  soldOut: 'Sold Out',
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

const unitFilterKeys = [
  'IsNotSellable',
  'BuilderHold',
  'AdminHold',
  'ReserveHold',
  'ReleaseHold',
  'Inactive',
];

const filterUnitData = (units, projectId) => {
  return (
    units.filter(
      el =>
        el?.project && el?.project === projectId && !unitFilterKeys.filter(key => el[key]).length
    ) || []
  );
};

export const convertExpoUnitData = (text = '') => {
  return text.split(',').filter(el => el);
};

const AllocAddFirstStep = ({
  form,
  goToSecStep,
  firstStepData,
  customerList,
  addCustomer,
  editCustomer,
  removeCustomer,
  allocEditData,
  isEditable,
  isSales,
  statusForm,
  setStatus,
  status,
}) => {
  const dispatch = useDispatch();
  const { projects } = useSelector(getProjects);
  const { units } = useSelector(getUnits);
  const projectsLoading = useSelector(projectsValuesLoading);
  const [selectedProject, setSelectedProject] = useState(allocEditData?.project?.id || null);
  const [exposureAndStyle, setExposureAndStyle] = useState({
    exposure: [],
    unitType: [],
    floorPlan: [],
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const projectData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request());
    dispatch(fetchUnits.request());
    fetchUnitExposure()
      .then(res => {
        const resData = res?.data || { exposuretype: '', floorPlan: '', unitType: '' };
        setExposureAndStyle({
          exposure: convertExpoUnitData(resData?.exposuretype) || [],
          unitType: convertExpoUnitData(resData?.unitType) || [],
          floorPlan: convertExpoUnitData(resData?.floorPlan) || [],
        });
      })
      .catch(() => {});

    if (firstStepData?.project) setSelectedProject(firstStepData?.project);
    if (firstStepData?.draftDeposit) setUploadedFile(firstStepData?.draftDeposit);
  }, []);

  useEffect(() => {
    if (projects && allocEditData && !firstStepData) {
      const {
        FloorPreference1,
        FloorPreference2,
        UnitType1,
        UnitType2,
        FloorPlan1,
        FloorPlan2,
        Exposure1,
        Exposure2,
        Notes,
        needParking,
        needLocker,
      } = allocEditData;
      form.setFieldsValue({
        project: allocEditData?.project?.id,
        FloorPreference1,
        FloorPreference2,
        UnitType1,
        UnitType2,
        FloorPlan1,
        FloorPlan2,
        Exposure1,
        Exposure2,
        Notes,
        needParking,
        needLocker,
      });
      setUploadedFile(allocEditData?.draftDeposit);
    }
  }, [projects]);

  const handleProjectChange = val => {
    setSelectedProject(val);
  };

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

  const filteredStatuses = statuses.filter(el =>
    ['approved', 'rejected', 'waitList', 'onHold', 'soldOut'].includes(el.value)
  );

  const hasStatus = !!filteredStatuses.find(el => el.value === allocEditData?.AllocationStatus);
  const unitData = filterUnitData(units || [], selectedProject);

  return (
    <Col span={24} padding='30px 30px 20px'>
      {!isEditable && !isSales && (
        <Paragraph type='destructive'>
          This allocation is {statusTexts[allocEditData.AllocationStatus]} and not editable!
        </Paragraph>
      )}
      <Spin spinning={projectsLoading}>
        <Form form={form} {...layout} onFinish={goToSecStep} initialValues={firstStepData}>
          <Row gutter={24}>
            <Col span={24}>
              <FormItem
                name='project'
                label='Project name'
                rules={[
                  {
                    required: true,
                    message: 'Please select Project name!',
                  },
                ]}
              >
                <Select disabled={!isEditable} onChange={handleProjectChange}>
                  {projectData.map(el => (
                    <Select.Option value={el.id} key={el.id}>
                      {el.ProjectName}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            </Col>
            <Col span={24} mb={20} display={selectedProject ? '' : 'none'}>
              <Row gutter={24}>
                <Col span={6}>
                  <FormItem
                    name='FloorPreference1'
                    label='Floor Choice 1'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Floor Choice 1!',
                      },
                    ]}
                  >
                    <Select disabled={!isEditable}>
                      {floorPreferences.map(el => (
                        <Select.Option value={el.value} key={el.value}>
                          {el.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    name='FloorPlan1'
                    label='Floor Plan 1'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Floor Plan 1!',
                      },
                    ]}
                  >
                    <Select disabled={!isEditable}>
                      {exposureAndStyle?.floorPlan.map(el => (
                        <Select.Option value={el} key={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    name='UnitType1'
                    label='Unit Type 1'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Unit Type 1!',
                      },
                    ]}
                  >
                    <Select disabled={!isEditable}>
                      {exposureAndStyle?.unitType.map(el => (
                        <Select.Option value={el} key={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem
                    name='Exposure1'
                    label='Unit Exposure 1'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Unit Exposure 1!',
                      },
                    ]}
                  >
                    <Select disabled={!isEditable}>
                      {exposureAndStyle?.exposure.map(el => (
                        <Select.Option value={el} key={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem name='FloorPreference2' label='Floor Choice 2'>
                    <Select disabled={!isEditable} allowClear={true}>
                      {floorPreferences.map(el => (
                        <Select.Option value={el.value} key={el.value}>
                          {el.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem name='FloorPlan2' label='Floor Plan 2'>
                    <Select disabled={!isEditable} allowClear={true}>
                      {exposureAndStyle?.floorPlan.map(el => (
                        <Select.Option value={el} key={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem name='UnitType2' label='Unit Type 2'>
                    <Select disabled={!isEditable} allowClear={true}>
                      {exposureAndStyle?.unitType.map(el => (
                        <Select.Option value={el} key={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem name='Exposure2' label='Unit Exposure 2'>
                    <Select disabled={!isEditable} allowClear={true}>
                      {exposureAndStyle?.exposure.map(el => (
                        <Select.Option value={el} key={el}>
                          {el}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
              </Row>
            </Col>
            <Col span={24} mb={20} display={selectedProject ? '' : 'none'}>
              <Row gutter={24}>
                <Col span={6} margin='7px 0 0 0'>
                  <FormItem valuePropName='checked' name='needParking' mb={0}>
                    <Checkbox color='#717579' fw={400} disabled={!isEditable}>
                      Parking
                    </Checkbox>
                  </FormItem>
                </Col>
                <Col span={6} margin='7px 0 0 0'>
                  <FormItem valuePropName='checked' name='needLocker' mb={0}>
                    <Checkbox color='#717579' fw={400} disabled={!isEditable}>
                      Storage
                    </Checkbox>
                  </FormItem>
                </Col>
                <Col span={12}>
                  <Upload
                    listType='text'
                    beforeUpload={uploadFile}
                    maxCount={1}
                    onRemove={() => setUploadedFile(null)}
                    fileList={uploadedFile ? [uploadedFile] : []}
                    customRequest={() => {}}
                    width='100%'
                    accept='.jpeg,.jpg,.png,.tiff,.pdf,.zip,.doc,.docx'
                    disabled={!isEditable}
                  >
                    <Button
                      type='primary'
                      icon={<UploadOutlined />}
                      loading={uploadLoading}
                      width='100%'
                      mb={0}
                      disabled={!isEditable}
                    >
                      Upload First Deposit Image
                    </Button>
                  </Upload>
                </Col>
              </Row>
            </Col>
            <Col span={24} align='center' mb={10} display={selectedProject ? '' : 'none'}>
              {isEditable && (
                <Button
                  type='primary'
                  padding='0 10px'
                  onClick={() => addCustomer(uploadedFile)}
                  margin='0 10px 0 0'
                >
                  +
                </Button>
              )}
              <Paragraph fw={400} type='secondary' mb={0}>
                Purchasers
              </Paragraph>
            </Col>
            {!!customerList.length && (
              <Col span={24} display={selectedProject ? '' : 'none'}>
                <Row mb={5}>
                  {customerList.map((el, index) => (
                    <Col
                      span={24}
                      padding='10px 20px'
                      border='1px solid #EEEEEE'
                      mb={15}
                      key={index}
                      align='center'
                      justify='space-between'
                    >
                      <Col align='center'>
                        <span style={{ marginRight: '15px' }}>Purchaser #{index + 1}:</span>
                        <Paragraph mb={0} type='secondary' fw={500}>
                          {el?.FirstName} {el?.LastName}
                        </Paragraph>
                      </Col>
                      <Col>
                        {isEditable ? (
                          <>
                            <EditOutlined
                              style={{ color: '#886CC0', marginRight: '15px' }}
                              onClick={() => editCustomer(index)}
                            />
                            <DeleteOutlined
                              style={{ color: '#886CC0' }}
                              onClick={() => removeCustomer(index)}
                            />
                          </>
                        ) : (
                          <EyeOutlined
                            style={{ color: '#886CC0' }}
                            onClick={() => editCustomer(index)}
                          />
                        )}
                      </Col>
                    </Col>
                  ))}
                </Row>
              </Col>
            )}
            <Col span={24} display={selectedProject ? '' : 'none'}>
              <FormItem name='Notes' label='Notes'>
                <TextArea min_height='100px' max_height='190px' disabled={!isEditable} />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Spin>
      {isSales && (
        <Col span={24}>
          <Form
            {...layout}
            form={statusForm}
            onValuesChange={(val, allValues) => setStatus(allValues.AllocationStatus)}
            initialValues={{
              AllocationStatus: hasStatus ? allocEditData?.AllocationStatus : null,
              ActualUnit: hasStatus ? allocEditData?.ActualUnit?.id : null,
            }}
          >
            <FormItem
              label='Status'
              name='AllocationStatus'
              rules={[
                {
                  required: true,
                  message: 'Please select Status!',
                },
              ]}
            >
              <Select>
                {filteredStatuses.map(el => (
                  <Select.Option value={el.value} key={el.value}>
                    {el.label}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
            {status === 'approved' && (
              <FormItem
                label='Actual Unit'
                name='ActualUnit'
                rules={[
                  {
                    required: true,
                    message: 'Please input Actual Unit!',
                  },
                ]}
              >
                <Select>
                  {unitData.map(el => (
                    <Select.Option value={el.id} key={el.id}>
                      {`${el.UnitNo}${el.Unit ? ` (${el.Unit})` : ''}`}
                    </Select.Option>
                  ))}
                </Select>
              </FormItem>
            )}
          </Form>
        </Col>
      )}
    </Col>
  );
};

export default AllocAddFirstStep;
