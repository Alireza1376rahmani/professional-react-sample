import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import {
  fetchAllDecorCategoriesApi,
  fetchAllDecorCategoriesCountApi,
  fetchAllDecorLibsApi,
  fetchAllSubCategoriesApi,
} from '../../../../services/options-library';
import { defText } from '../user-list-wrapper';
import TableWrapper from '../../table-wrapper';
import { Col, Form, FormItem, Input, Row, Select, Tooltip } from '../../../atoms';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import { checkExistIcon, twoDigitFormat } from '../../../../Utils/Helpers';

const initialFilterValues = { DecorLib_id: '', id: '', _q: '', Category: '', 'SubCateg_id.id': '' };

const DecorCategories = () => {
  const [form] = Form.useForm();
  const [decorCategoriesLoading, setDecorCategoriesLoading] = useState(false);
  const [decorCategories, setDecorCategories] = useState([]);
  const [decorCategoriesCount, setDecorCategoriesCount] = useState(0);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [filterData, setFiltersData] = useState({});
  const [decorLibs, setDecorLibs] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  useEffect(() => {
    getDecorLibs();
    getFilterCategories();
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

  const getDecorCategories = params => {
    if (params.DecorLib_id) {
      setDecorCategoriesLoading(true);
      fetchAllDecorCategoriesApi({
        Inactive: false,
        _sort: 'Description',
        ...params,
      })
        .then(res => {
          setDecorCategories(res?.data || []);
          setDecorCategoriesLoading(false);
        })
        .catch(() => setDecorCategoriesLoading(false));
      fetchAllDecorCategoriesCountApi({})
        .then(res => {
          setDecorCategoriesCount(res?.data || 0);
        })
        .catch(() => {});
    } else {
      setDecorCategories([]);
      setDecorCategoriesCount(0);
    }
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

  const getFilterCategories = () => {
    setFiltersLoading(true);
    fetchAllDecorCategoriesApi({ _sort: 'Description' })
      .then(res => {
        setFiltersLoading(false);
        setFilterCategories(res?.data || []);
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
      title: 'Library',
      dataIndex: 'DecorLib_id',
      key: 'DecorLib_id',
      width: 250,
      sorter: true,
      render: item => defText(item?.Description, 'left'),
    },
    {
      title: 'Select Seq',
      dataIndex: 'SelectSeqNo',
      key: 'SelectSeqNo',
      width: 120,
      sorter: true,
      render: item => defText(item ? twoDigitFormat(item) : '', 'center'),
    },
    {
      title: 'Ref Code',
      dataIndex: 'XRefCode',
      key: 'XRefCode',
      width: 200,
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Category',
      dataIndex: 'Description',
      key: 'Description',
      sorter: true,
      render: item => defText(item, 'left'),
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
      <Col span={20}>
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
                  name='DecorLib_id'
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
                <FormItem name='id' label='Category' mb={0} width='200px'>
                  <Select width='200px' onChange={setSelectedCategory}>
                    {[{ id: '', Description: 'All' }, ...filterCategories].map(el => (
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
    <TableWrapper
      dataSource={filterData?.DecorLib_id ? decorCategories : []}
      columns={columns}
      loading={decorCategoriesLoading}
      total={filterData?.DecorLib_id ? decorCategoriesCount : 0}
      filterContent={filterContent}
      filterData={filterData}
      getTableData={getDecorCategories}
    />
  );
};

export default DecorCategories;
