import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllModelPlansApi,
  fetchAllModelPlansCountApi,
} from '../../../../services/project-settings';
import { defText } from '../user-list-wrapper';
import { checkExistIcon } from '../../../../Utils/Helpers';
import { Col, Form, FormItem, Input, Row, Select, Tooltip } from '../../../atoms';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import TableWrapper from '../../table-wrapper';
import { getProjects, projectsValuesLoading } from '../../../../selectors/projects';
import { fetchProjects } from '../../../../actions/projects';
import { fetchUnitExposure } from '../../../../services/units';
import { convertExpoUnitData } from '../../../molecules/AllocAddFirstStep';

const initialFilterValues = {
  'Project_id.id': '',
  ModelUnitType: '',
  _q: '',
};

const ModelsPlans = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [modelPlans, setModelPlans] = useState([]);
  const [modelPlansCount, setModelPlansCount] = useState(0);
  const [modelPlansLoading, setModelPlansLoading] = useState(false);
  const [filterData, setFiltersData] = useState({});
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [unitTypes, setUnitTypes] = useState([]);
  const { projects } = useSelector(getProjects);
  const projectsLoading = useSelector(projectsValuesLoading);
  const projectData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
    getUnitType();
  }, []);

  const getModelPlans = params => {
    if (params['Project_id.id']) {
      setModelPlansLoading(true);
      const requestData = {
        _sort: 'ModelCode',
        ...params,
      };
      fetchAllModelPlansApi(requestData)
        .then(res => {
          setModelPlansLoading(false);
          setModelPlans(res?.data || []);
        })
        .catch(() => setModelPlansLoading(false));

      fetchAllModelPlansCountApi(requestData)
        .then(res => {
          setModelPlansCount(res?.data || 0);
        })
        .catch(() => {});
    } else {
      setModelPlans([]);
      setModelPlansCount(0);
    }
  };

  const getUnitType = () => {
    setFiltersLoading(true);
    fetchUnitExposure()
      .then(res => {
        const resData = res?.data || { unitType: '' };
        const convertedUnitTypeData = convertExpoUnitData(resData?.unitType) || [];
        const unitTypeData = convertedUnitTypeData
          .filter(el => el !== 'ANY')
          .map(el => ({ value: el, label: el }));
        setUnitTypes(unitTypeData);
        setFiltersLoading(false);
      })
      .catch(() => setFiltersLoading(false));
  };

  const columns = [
    {
      title: 'Model',
      dataIndex: 'ModelCode',
      key: 'ModelCode',
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Model Name',
      dataIndex: 'ModelName',
      key: 'ModelName',
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Floor Area',
      dataIndex: 'FloorArea',
      key: 'FloorArea',
      sorter: true,
      render: text => defText(text, 'right'),
    },
    {
      title: 'Unit Type',
      dataIndex: 'ModelUnitType',
      key: 'ModelUnitType',
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'List Price',
      dataIndex: 'ListSalesPrice',
      key: 'ListSalesPrice',
      sorter: true,
      render: text => defText(text, 'right', true),
    },
    {
      title: 'Inactive',
      dataIndex: 'inactive',
      key: 'inactive',
      render: inactive => checkExistIcon(inactive),
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
                <FormItem name='_q' label='Free-text Search' mb={0} width='200px'>
                  <Input width='200px' />
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
    // <ProjectSettingsWrapper
    //   pageTitle='Models & Plans'
    //   loading={modelPlansLoading}
    //   columns={columns}
    //   dataSource={modelPlans}
    //   dataSourceCount={modelPlansCount}
    //   getDataReq={getModelPlans}
    //   addButtonText=''
    // />
    <TableWrapper
      dataSource={modelPlans}
      columns={columns}
      loading={modelPlansLoading}
      total={modelPlansCount}
      filterContent={filterContent}
      filterData={filterData}
      getTableData={getModelPlans}
    />
  );
};

export default ModelsPlans;
