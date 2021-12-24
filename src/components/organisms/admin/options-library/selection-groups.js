import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import {
  fetchAllDecorCategoriesApi,
  fetchAllDecorLibsApi,
  fetchAllSelectionGroupsApi,
  fetchAllSelectionGroupsCountApi,
  fetchAllSubCategoriesApi,
  fetchAllSuppliersApi,
} from '../../../../services/options-library';
import { defText } from '../user-list-wrapper';
import TableWrapper from '../../table-wrapper';
import { Col, Form, FormItem, Input, Row, Select, Tooltip } from '../../../atoms';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import { checkExistIcon } from '../../../../Utils/Helpers';

const initialFilterValues = {
  'Category_id.DecorLib_id': '',
  'Category_id.id': '',
  'SubCateg_id.id': '',
  'Supplier_id.id': '',
  _q: '',
};

const SelectionGroups = () => {
  const [form] = Form.useForm();
  const [selectionGroupsLoading, setSelectionGroupsLoading] = useState(false);
  const [selectionGroups, setSelectionGroups] = useState([]);
  const [selectionGroupsCount, setSelectionGroupsCount] = useState(0);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [filterData, setFiltersData] = useState({});
  const [decorCategories, setDecorCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLibrary, setSelectedLibrary] = useState(null);
  const [decorLibs, setDecorLibs] = useState([]);

  useEffect(() => {
    getDecorLibs();
    getSuppliers();
  }, []);

  useEffect(() => {
    const library = selectedLibrary ? { DecorLib_id: selectedLibrary } : {};
    form.setFieldsValue({ 'Category_id.id': '' });
    getDecorCategories(library);
  }, [selectedLibrary]);

  useEffect(() => {
    form.setFieldsValue({ 'SubCateg_id.id': '' });
    let filters;
    if (selectedCategory) {
      filters = { 'Category_id.id': selectedCategory };
    } else {
      filters = selectedLibrary ? { 'Category_id.DecorLib_id': selectedLibrary } : {};
    }
    getSubCategories(filters);
  }, [selectedCategory, selectedLibrary]);

  const getSelectionGroups = params => {
    setSelectionGroupsLoading(true);
    fetchAllSelectionGroupsApi({
      Inactive: false,
      _sort: 'Category_id.DecorLib_id',
      ...params,
    })
      .then(res => {
        setSelectionGroups(res?.data || []);
        setSelectionGroupsLoading(false);
      })
      .catch(() => setSelectionGroupsLoading(false));
    fetchAllSelectionGroupsCountApi(params)
      .then(res => {
        setSelectionGroupsCount(res?.data || 0);
      })
      .catch(() => {});
  };

  const getDecorLibs = () => {
    setFiltersLoading(true);
    fetchAllDecorLibsApi()
      .then(res => {
        setFiltersLoading(false);
        setDecorLibs(res?.data || []);
      })
      .catch(() => setFiltersLoading(false));
  };

  const getDecorCategories = (params = {}) => {
    setFiltersLoading(true);
    fetchAllDecorCategoriesApi({ _sort: 'Description', ...params })
      .then(res => {
        setFiltersLoading(false);
        setDecorCategories(res?.data || []);
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

  const getSubCategories = (params = {}) => {
    setFiltersLoading(true);
    fetchAllSubCategoriesApi({ _sort: 'Description', ...params })
      .then(res => {
        setFiltersLoading(false);
        setSubCategories(res?.data || []);
      })
      .catch(() => setFiltersLoading(false));
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'Category_id',
      key: 'Category_id',
      sortKey: 'Category_id.Description',
      width: 250,
      sorter: true,
      render: item => defText(item?.Description, 'left'),
    },
    {
      title: 'Supplier',
      dataIndex: 'Supplier_id',
      key: 'Supplier_id',
      sortKey: 'Supplier_id.SuppName',
      width: 250,
      sorter: true,
      render: item => defText(item?.SuppName, 'left'),
    },
    {
      title: 'Sub-Category',
      dataIndex: 'SubCateg_id',
      key: 'SubCateg_id',
      sortKey: 'SubCateg_id.Description',
      width: 250,
      sorter: true,
      render: text => defText(text?.Description, 'left'),
    },
    {
      title: 'UI Prompt',
      dataIndex: 'UIPrompt',
      key: 'UIPrompt',
      sortKey: 'UIPrompt',
      sorter: true,
      render: item => defText(item, 'left', false),
    },
    {
      title: 'Required',
      dataIndex: 'IsRequired',
      key: 'IsRequired',
      width: 80,
      align: 'center',
      render: item => checkExistIcon(item),
    },
    {
      title: 'Validated',
      dataIndex: 'IsValidated',
      key: 'IsValidated',
      width: 80,
      align: 'center',
      render: item => checkExistIcon(item),
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
    <Row>
      <Col span={24}>
        <Spin spinning={filtersLoading}>
          <Form
            {...defFormLayout}
            form={form}
            initialValues={initialFilterValues}
            onFinish={setFiltersData}
          >
            <Row align='bottom' gutter={24} mb={15}>
              <Col>
                <FormItem
                  name='Category_id.DecorLib_id'
                  label='Library'
                  mb={0}
                  width='250px'
                  rules={[
                    {
                      required: true,
                      message: 'Please select Library!',
                    },
                  ]}
                >
                  <Select width='250px' onChange={setSelectedLibrary}>
                    {decorLibs.map(el => (
                      <Select.Option value={el.id} key={el.id}>
                        {el?.Description}
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
                <FormItem name='Supplier_id.id' label='Supplier' mb={0} width='200px'>
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
    </Row>
  );

  return (
    <TableWrapper
      dataSource={selectionGroups}
      columns={columns}
      loading={selectionGroupsLoading}
      total={selectionGroupsCount}
      filterContent={filterContent}
      filterData={filterData}
      getTableData={getSelectionGroups}
    />
  );
};

export default SelectionGroups;
