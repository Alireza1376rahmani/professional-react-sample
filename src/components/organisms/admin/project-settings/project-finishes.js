import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import TableWrapper from '../../table-wrapper';
import { Button, Col, Form, FormItem, Row, Select, Tooltip } from '../../../atoms';
import {
  fetchAllSubCategoriesApi,
  fetchAllSuppliersApi,
} from '../../../../services/options-library';
import {
  fetchAllModelPlansApi,
  fetchAllProjectFinishesApi,
  fetchAllProjectFinishesCountApi,
  fetchUpgApi,
} from '../../../../services/project-settings';
import { defText } from '../user-list-wrapper';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import { getProjects, projectsValuesLoading } from '../../../../selectors/projects';
import { fetchProjects } from '../../../../actions/projects';
import { fetchDecorCategoriesApi } from '../../../../services/decor-categories';
import { checkExistIcon } from '../../../../Utils/Helpers';
import LoadFinishesModal from '../../load-finishes-modal';

const initialFilterValues = {
  'Project_id.id': '',
  'Category_id.id': '',
  'SuppSelect_id.id': '',
  'pjModel_id.id': '',
  OPTLevel: '',
};

const ProjectFinishes = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [finishes, setFinishes] = useState(false);
  const [finishesLoading, setFinishesLoading] = useState(false);
  const [finishesCount, setFinishesCount] = useState(0);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [filterData, setFiltersData] = useState({});
  const [decorCategories, setDecorCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [modelPlans, setModelPlans] = useState([]);
  const [OPTLevel, setOPTLevel] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [triggerRequest, setTriggerRequest] = useState(false);
  const { projects } = useSelector(getProjects);
  const projectsLoading = useSelector(projectsValuesLoading);
  const projectData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
    getSuppliers();
    getModelPlans();
    getOPTLevels();
    getDecorCategories();
  }, []);

  useEffect(() => {
    const category = selectedCategory ? { 'Category_id.id': selectedCategory } : {};
    form.setFieldsValue({ 'SubCateg_id.id': '' });
    getSubCategories(category);
  }, [selectedCategory]);

  const getFinishes = params => {
    if (params['Project_id.id']) {
      setFinishesLoading(true);
      fetchAllProjectFinishesApi({
        Inactive: false,
        // _sort: 'Description',
        ...params,
      })
        .then(res => {
          setFinishes(res?.data || []);
          setFinishesLoading(false);
        })
        .catch(() => setFinishesLoading(false));
      fetchAllProjectFinishesCountApi(params)
        .then(res => {
          setFinishesCount(res?.data || 0);
        })
        .catch(() => {});
    } else {
      setFinishes([]);
      setFinishesCount(0);
    }
  };

  const getDecorCategories = () => {
    setFiltersLoading(true);
    const requestData = {
      _sort: 'Description',
    };
    fetchDecorCategoriesApi(requestData)
      .then(res => {
        setDecorCategories(res?.data || []);
        setFiltersLoading(false);
      })
      .catch(() => setFiltersLoading(false));
  };

  const getSubCategories = (params = {}) => {
    setFiltersLoading(true);
    fetchAllSubCategoriesApi({ _sort: 'Description', ...params })
      .then(res => {
        setFiltersLoading(false);
        setSubCategories(res?.data || []);
      })
      .catch(() => setFiltersLoading(false));
  };

  const getSuppliers = () => {
    setFiltersLoading(true);
    fetchAllSuppliersApi({ _sort: 'SuppName' })
      .then(res => {
        setFiltersLoading(false);
        setSuppliers(res?.data || []);
      })
      .catch(() => setFiltersLoading(false));
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

  const getOPTLevels = () => {
    setFiltersLoading(true);
    fetchUpgApi({ Inactive: false, _sort: 'value' })
      .then(res => {
        setOPTLevel(res?.data || []);
        setFiltersLoading(false);
      })
      .catch(() => setFiltersLoading(false));
  };

  const closeModal = () => {
    setModalOpen(false);
    setTriggerRequest(true);
  };

  const columns = [
    {
      title: 'Select Group',
      dataIndex: 'SelectGroup_id',
      key: 'SelectGroup_id',
      // width: 200,
      render: item => defText(item?.GroupName, 'left'),
    },
    {
      title: 'Category',
      dataIndex: 'Category_id',
      key: 'Category_id',
      width: 200,
      sorter: true,
      render: item => defText(item?.Description, 'left'),
    },
    {
      title: 'Sub-Category',
      dataIndex: 'SubCateg_id',
      key: 'SubCateg_id',
      width: 200,
      sorter: true,
      render: text => defText(text?.Description, 'left'),
    },
    {
      title: 'Model',
      dataIndex: 'pjModel_id',
      key: 'pjModel_id',
      width: 200,
      sorter: true,
      render: text => defText(text?.ModelName, 'left'),
    },
    {
      title: 'Supplier',
      dataIndex: 'SuppSelect_id',
      key: 'SuppSelect_id',
      width: 200,
      sorter: true,
      render: item => defText(item?.Description, 'left'),
    },
    {
      title: 'OPT Level',
      dataIndex: 'OPTLevel',
      key: 'OPTLevel',
      sorter: true,
      width: 150,
      render: item => defText(item, 'left'),
    },
    {
      title: 'Selection Item',
      dataIndex: 'SelectItem_id',
      key: 'SelectItem_id',
      width: 200,
      sorter: true,
      render: item => defText(item?.Description, 'left'),
    },
    {
      title: 'Inactive',
      dataIndex: 'Inactive',
      key: 'Inactive',
      width: 80,
      align: 'center',
      render: item => checkExistIcon(item),
    },
  ];

  const filterContent = (
    <Row mb={15}>
      <Col xxl={21} span={24} mb={15} xxl_mb={0}>
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
                <FormItem name='Category_id.id' label='Category' mb={0} width='200px'>
                  <Select width='200px' onChange={setSelectedCategory}>
                    {[{ id: '', Description: 'All' }, ...decorCategories].map(el => (
                      <Select.Option value={el?.id} key={el?.id}>
                        {el?.Description}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col>
                <FormItem name='SubCateg_id.id' label='Sub-Category' mb={0} width='200px'>
                  <Select width='200px'>
                    {[{ id: '', Description: 'All' }, ...subCategories].map(el => (
                      <Select.Option value={el?.id} key={el?.id}>
                        {el?.Description}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col>
                <FormItem name='SuppSelect_id.id' label='Supplier' mb={0} width='200px'>
                  <Select width='200px'>
                    {[{ id: '', SuppName: 'All' }, ...suppliers].map(el => (
                      <Select.Option value={el?.id} key={el?.id}>
                        {el?.SuppName}
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
                <FormItem name='OPTLevel' label='OPT Level' mb={0} width='150px'>
                  <Select width='150px'>
                    {[{ id: '', code: '', value: 'All' }, ...OPTLevel].map(el => (
                      <Select.Option value={el.code} key={el.id}>
                        {el?.code || el?.value}
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
                      setFiltersData({});
                      form.resetFields();
                    }}
                  />
                </Tooltip>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Col>
      <Col xxl={3} span={24} justify='end' align='end'>
        <Button
          icon={<UploadOutlined />}
          type='primary'
          onClick={() => setModalOpen(true)}
          disabled={!filterData[['Project_id.id']]}
        >
          Load Finishe(s)
        </Button>
      </Col>
    </Row>
  );
  return (
    <>
      {modalOpen && (
        <LoadFinishesModal
          closeModal={closeModal}
          defProject={filterData[['Project_id.id']]}
          defCategory={filterData[['Category_id.id']]}
          defSubCategory={filterData[['SubCateg_id.id']]}
          defSupplier={filterData[['SuppSelect_id.id']]}
        />
      )}
      <TableWrapper
        dataSource={finishes}
        columns={columns}
        loading={finishesLoading}
        total={finishesCount}
        filterContent={filterContent}
        filterData={filterData}
        getTableData={getFinishes}
        triggerRequest={triggerRequest}
      />
    </>
  );
};

export default ProjectFinishes;
