import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllModelPlansApi,
  fetchAllUnitsSuitesApi,
  fetchAllUnitsSuitesCountApi,
} from '../../../../services/project-settings';
import { defText } from '../user-list-wrapper';
import TableWrapper from '../../table-wrapper';
import { Col, Form, FormItem, Row, Select, Tooltip } from '../../../atoms';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import { getProjects, projectsValuesLoading } from '../../../../selectors/projects';
import { fetchProjects } from '../../../../actions/projects';
import { fetchUnitExposure } from '../../../../services/units';
import { convertExpoUnitData } from '../../../molecules/AllocAddFirstStep';

const initialFilterValues = {
  'Project_id.id': '',
  'pjModel_id.id': '',
  ModelUnitType: '',
  ExposureType: '',
};

const UnitsSuites = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [unitsSuites, setUnitsSuites] = useState([]);
  const [unitsSuitesCount, setUnitsSuitesCount] = useState(0);
  const [unitsSuitesLoading, setUnitsSuitesLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [filterData, setFiltersData] = useState({});
  const [modelPlans, setModelPlans] = useState([]);
  const [exposures, setExposures] = useState([]);
  const [unitTypes, setUnitTypes] = useState([]);
  const { projects } = useSelector(getProjects);
  const projectsLoading = useSelector(projectsValuesLoading);
  const projectData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
    getModelPlans();
    getExposures();
  }, []);

  const getUnitsSuites = params => {
    if (params['Project_id.id']) {
      setUnitsSuitesLoading(true);
      const requestData = {
        // 'Project_id.id': projectId,
        _sort: 'UnitNo',
        ...params,
      };
      fetchAllUnitsSuitesApi(requestData)
        .then(res => {
          setUnitsSuitesLoading(false);
          setUnitsSuites(res?.data || []);
        })
        .catch(() => setUnitsSuitesLoading(false));

      fetchAllUnitsSuitesCountApi(requestData)
        .then(res => {
          setUnitsSuitesCount(res?.data || 0);
        })
        .catch(() => {});
    } else {
      setUnitsSuites([]);
      setUnitsSuitesCount(0);
    }
  };

  const getModelPlans = () => {
    setFiltersLoading(true);
    fetchAllModelPlansApi({
      _sort: 'ModelCode',
    })
      .then(res => {
        setModelPlans(res?.data || []);
        setFiltersLoading(false);
      })
      .catch(() => setFiltersLoading(false));
  };

  const getExposures = () => {
    fetchUnitExposure()
      .then(res => {
        const resData = res?.data || { exposuretype: '', unitType: '' };
        const convertedExposureData = convertExpoUnitData(resData?.exposuretype) || [];
        const exposureData = convertedExposureData
          .filter(el => el !== 'ANY')
          .map(el => ({ value: el, label: el }));
        const convertedUnitTypeData = convertExpoUnitData(resData?.unitType) || [];
        const unitTypeData = convertedUnitTypeData
          .filter(el => el !== 'ANY')
          .map(el => ({ value: el, label: el }));
        setExposures(exposureData);
        setUnitTypes(unitTypeData);
      })
      .catch(() => {});
  };

  const columns = [
    {
      title: 'Unit No',
      dataIndex: 'UnitNo',
      key: 'UnitNo',
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Model',
      dataIndex: 'pjModel_id',
      key: 'pjModel_id',
      sorter: true,
      render: item => defText(item?.ModelCode, 'left'),
    },
    {
      title: 'Unit Type',
      dataIndex: 'ModelUnitType',
      key: 'ModelUnitType',
      sorter: true,
      render: item => defText(item, 'left'),
    },
    {
      title: 'Walk-In(s)',
      dataIndex: 'NoOfWalkInClst',
      key: 'NoOfWalkInClst',
      sorter: true,
      render: item => defText(item, 'right', { onlyLocale: true }),
    },
    {
      title: 'Floor',
      dataIndex: 'pjFloor_id',
      key: 'pjFloor_id',
      sorter: true,
      render: item => defText(item?.FloorLevel, 'left'),
    },
    {
      title: 'Exposure',
      dataIndex: 'ExposureType',
      key: 'ExposureType',
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Floor Area',
      dataIndex: 'UnitFloorArea',
      key: 'UnitFloorArea',
      sorter: true,
      render: text => defText(text, 'right', { onlyLocale: true }),
    },
    {
      title: 'Balcony',
      dataIndex: 'TotalBalconyArea',
      key: 'TotalBalconyArea',
      sorter: true,
      render: text => defText(text, 'right', { onlyLocale: true }),
    },
    {
      title: 'Terrace',
      dataIndex: 'TotalTerraceArea',
      key: 'TotalTerraceArea',
      sorter: true,
      render: text => defText(text, 'right', { onlyLocale: true }),
    },
    {
      title: 'Floor Premium',
      dataIndex: 'FloorPremAmt',
      key: 'FloorPremAmt',
      sorter: true,
      render: text => defText(text, 'right', { onlyLocale: true }),
    },
    {
      title: 'Unit Premiums',
      dataIndex: 'TotalPremAmt',
      key: 'TotalPremAmt',
      sorter: true,
      render: text => defText(text, 'right', { onlyLocale: true }),
    },
  ];

  const filterContent = (
    <Row>
      <Col span={24}>
        <Spin spinning={filtersLoading || projectsLoading}>
          <Form
            {...defFormLayout}
            form={form}
            initialValues={initialFilterValues}
            onFinish={setFiltersData}
          >
            <Row align='bottom' gutter={24} mb={15}>
              <Col>
                <FormItem
                  name='Project_id.id'
                  label='Project'
                  mb={0}
                  width='250px'
                  rules={[
                    {
                      required: true,
                      message: 'Please select Project!',
                    },
                  ]}
                >
                  <Select width='250px'>
                    {projectData.map(el => (
                      <Select.Option value={el.id} key={el.id}>
                        {el?.ProjectName}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col>
                <FormItem name='pjModel_id.id' label='Model' mb={0} width='200px'>
                  <Select width='200px'>
                    {[{ id: '', ModelName: 'All' }, ...modelPlans].map(el => (
                      <Select.Option value={el.id} key={el.id}>
                        {el?.ModelName}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col>
                <FormItem name='ModelUnitType' label='Unit Type' mb={0} width='150px'>
                  <Select width='150px'>
                    {[{ value: '', label: 'All' }, ...unitTypes].map(el => (
                      <Select.Option value={el.value} key={el.value}>
                        {el?.label}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col>
                <FormItem name='ExposureType' label='Exposure' mb={0} width='200px'>
                  <Select width='200px'>
                    {[{ value: '', label: 'All' }, ...exposures].map(el => (
                      <Select.Option value={el.value} key={el.value}>
                        {el?.label}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col align='center' height='40px'>
                <Tooltip placement='top' title='Apply Filters'>
                  <ApplyFilterIcon
                    className='filter_icon apply'
                    onClick={form.submit}
                    style={{ margin: '3px 15px 0 0' }}
                  />
                </Tooltip>
                <Tooltip placement='top' title='Clear Filters'>
                  <ClearFilterIcon
                    className='filter_icon clear'
                    onClick={() => {
                      setFiltersData(initialFilterValues);
                      form.resetFields();
                    }}
                  />
                </Tooltip>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Col>
    </Row>
  );

  return (
    <TableWrapper
      dataSource={unitsSuites}
      columns={columns}
      loading={unitsSuitesLoading}
      total={unitsSuitesCount}
      filterContent={filterContent}
      filterData={filterData}
      getTableData={getUnitsSuites}
    />
  );
};

export default UnitsSuites;
