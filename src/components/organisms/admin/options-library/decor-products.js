import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import {
  fetchAllDecorCategoriesApi,
  fetchAllDecorLibsApi,
  fetchAllDecorProductsApi,
  fetchAllDecorProductsCountApi,
  fetchAllSubCategoriesApi,
} from '../../../../services/options-library';
import TableWrapper from '../../table-wrapper';
import { defText } from '../user-list-wrapper';
import { Col, Form, FormItem, Input, Row, Select, Tooltip } from '../../../atoms';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import { fetchAllRoomsApi } from '../../../../services/project-settings';
import { checkExistIcon, filterOption } from '../../../../Utils/Helpers';

const initialFilterValues = {
  'Category_Id.DecorLib_id': '',
  'Category_Id.id': '',
  'SubCateg_id.id': '',
  'Room_id.id': '',
  _q: '',
};

const DecorProducts = () => {
  const [form] = Form.useForm();
  const [decorProductsLoading, setDecorProductsLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [filterData, setFiltersData] = useState({});
  const [decorProducts, setDecorProducts] = useState([]);
  const [decorCategories, setDecorCategories] = useState([]);
  const [decorLibs, setDecorLibs] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [decorProductsCount, setDecorProductsCount] = useState(0);

  useEffect(() => {
    getDecorLibs();
    getDecorCategories();
    getRooms();
  }, []);

  useEffect(() => {
    const category = selectedCategory ? { 'Category_id.id': selectedCategory } : {};
    form.setFieldsValue({ 'SubCateg_id.id': '' });
    getSubCategories(category);
  }, [selectedCategory]);

  const getDecorProducts = params => {
    if (params['Category_Id.DecorLib_id']) {
      setDecorProductsLoading(true);
      fetchAllDecorProductsApi({
        Inactive: false,
        _sort: 'Description',
        ...params,
      })
        .then(res => {
          setDecorProducts(res?.data || []);
          setDecorProductsLoading(false);
        })
        .catch(() => setDecorProductsLoading(false));
      fetchAllDecorProductsCountApi(params)
        .then(res => {
          setDecorProductsCount(res?.data || 0);
        })
        .catch(() => {});
    } else {
      setDecorProducts([]);
      setDecorProductsCount(0);
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

  const getDecorCategories = () => {
    setFiltersLoading(true);
    fetchAllDecorCategoriesApi({ _sort: 'Description' })
      .then(res => {
        setFiltersLoading(false);
        setDecorCategories(res?.data || []);
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

  const getRooms = () => {
    setFiltersLoading(true);
    fetchAllRoomsApi({ _sort: 'Description' })
      .then(res => {
        setFiltersLoading(false);
        setRooms(res?.data || []);
      })
      .catch(() => setFiltersLoading(false));
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'Category_Id',
      key: 'Category_Id',
      width: 250,
      sorter: true,
      render: item => defText(item?.Description, 'left'),
    },
    {
      title: 'Sub-Category',
      dataIndex: 'SubCateg_id',
      key: 'SubCateg_id',
      sorter: true,
      width: 250,
      render: item => defText(item?.Description, 'left'),
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
      title: 'Room',
      dataIndex: 'Room_id',
      key: 'Room_id',
      width: 150,
      sorter: true,
      render: item => defText(item?.Description, 'left'),
    },
    {
      title: 'Product Description',
      dataIndex: 'Description',
      key: 'Description',
      sorter: true,
      render: item => (
        <Tooltip placement='top' title={item}>
          <div>
            {defText(item, 'left', false, {
              max_width: '180px',
              text_overflow: 'ellipsis',
            })}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'By Model',
      dataIndex: 'IsModelSpecs',
      key: 'IsModelSpecs',
      width: 95,
      align: 'center',
      render: item => checkExistIcon(item),
    },
    {
      title: 'Room (?)',
      dataIndex: 'PromptRoom',
      key: 'PromptRoom',
      width: 100,
      align: 'center',
      render: item => checkExistIcon(item),
    },
    {
      title: 'Finish (?)',
      dataIndex: 'PromptFinish',
      key: 'PromptFinish',
      width: 100,
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
                  name='Category_Id.DecorLib_id'
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
                  <Select width='250px'>
                    {decorLibs.map(el => (
                      <Select.Option value={el.id} key={el.id}>
                        {el?.Description}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col>
                <FormItem name='Category_Id.id' label='Category' mb={0} width='200px'>
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
                <FormItem name='SubCateg_id.id' label='Sub-Category' width='200px' mb={0}>
                  <Select showSearch={true} filterOption={filterOption} width='200px'>
                    {[{ id: '', Description: 'All' }, ...subCategories].map(el => (
                      <Select.Option value={el?.id} key={el?.id}>
                        {el?.Description}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
              </Col>
              <Col>
                <FormItem name='Room_id.id' label='Room' mb={0} width='200px'>
                  <Select width='200px'>
                    {[{ id: '', Description: 'All' }, ...rooms].map(el => (
                      <Select.Option value={el.id} key={el.id}>
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
      dataSource={decorProducts}
      columns={columns}
      loading={decorProductsLoading}
      total={decorProductsCount}
      filterContent={filterContent}
      filterData={filterData}
      getTableData={getDecorProducts}
    />
  );
};

export default DecorProducts;
