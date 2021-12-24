import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import TableWrapper from '../../table-wrapper';
import { Avatar, Col, Form, FormItem, Input, Row, Select, Tooltip } from '../../../atoms';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import { defText } from '../user-list-wrapper';
import {
  fetchAllDecorCategoriesApi,
  fetchAllDecorLibsApi,
  fetchAllSubCategoriesApi,
  fetchAllSuppliersApi,
} from '../../../../services/options-library';
import { fetchFinishesApi, fetchFinishesCountApi } from '../../../../services/project-settings';
import { checkExistIcon, twoDigitFormat } from '../../../../Utils/Helpers';

const initialFilterValues = {
  'Category_id.DecorLib_id': '',
  'SelectGroup_id.id': '',
  'Category_id.id': '',
  'SubCateg_id.id': '',
  'Supplier_id.id': '',
  _q: '',
};

const SupplierFinishes = () => {
  const [finishes, setFinishes] = useState([]);
  const [finishesCount, setFinishesCount] = useState(0);
  const [finishesLoading, setFinishesLoading] = useState(false);
  const [form] = Form.useForm();
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [filterData, setFiltersData] = useState({});
  const [decorCategories, setDecorCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
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

  const getFinishes = params => {
    if (params['Category_id.DecorLib_id']) {
      setFinishesLoading(true);
      fetchFinishesApi({
        _sort: 'Supplier_id.SuppName',
        ...params,
      })
        .then(res => {
          setFinishes(res?.data || []);
          setFinishesLoading(false);
        })
        .catch(() => setFinishesLoading(false));
      fetchFinishesCountApi(params)
        .then(res => {
          // eslint-disable-next-line no-underscore-dangle
          setFinishesCount(params._limit ? res?.data || 0 : 0);
        })
        .catch(() => {});
    } else {
      setFinishes([]);
      setFinishesCount(0);
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

  const getDecorCategories = (params = {}) => {
    setFiltersLoading(true);
    fetchAllDecorCategoriesApi({ _sort: 'Description', ...params })
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

  const getSuppliers = () => {
    setFiltersLoading(true);
    fetchAllSuppliersApi({ _sort: 'SuppName' })
      .then(res => {
        setFiltersLoading(false);
        setSuppliers(res?.data || []);
      })
      .catch(() => setFiltersLoading(false));
  };

  const columns = [
    {
      title: 'Supplier',
      dataIndex: 'Supplier_id',
      key: 'Supplier_id',
      width: 250,
      sorter: true,
      render: item => defText(item?.SuppName, 'left'),
    },
    {
      title: 'Select Seq.',
      dataIndex: 'Category_id.SelectSeqNo',
      key: 'Category_id.SelectSeqNo',
      sortKey: 'Category_id.SelectSeqNo',
      width: 120,
      sorter: true,
      render: (text, item) =>
        item?.Category_id?.SelectSeqNo
          ? defText(twoDigitFormat(item?.Category_id?.SelectSeqNo), 'center')
          : defText('', 'center'),
    },
    {
      title: 'Category',
      dataIndex: 'Category_id',
      key: 'Category_id',
      width: 250,
      sorter: true,
      render: item => defText(item?.Description, 'left'),
    },
    {
      title: 'Select Seq.',
      dataIndex: 'SubCateg_id.SelectSeqNo',
      key: 'SubCateg_id.SelectSeqNo',
      sortKey: 'SubCateg_id.SelectSeqNo',
      width: 120,
      sorter: true,
      render: (text, item) =>
        item?.SubCateg_id?.SelectSeqNo
          ? defText(twoDigitFormat(item?.SubCateg_id?.SelectSeqNo), 'center')
          : defText('', 'center'),
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
      title: 'Finish Select Name',
      dataIndex: 'Description',
      key: 'Description',
      sorter: true,
      render: item => defText(item, 'left'),
    },
    {
      title: 'Image',
      dataIndex: 'Image',
      key: 'Image',
      width: 100,
      align: 'center',
      render: item =>
        item?.ImageFileURL ? (
          <Avatar
            size={50}
            shape='square'
            radius='10px'
            src={item?.ImageFileURL}
            alt={item?.ImageFileDesc}
          />
        ) : (
          defText(item, 'center')
        ),
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
      dataSource={finishes}
      columns={columns}
      loading={finishesLoading}
      total={finishesCount}
      filterContent={filterContent}
      filterData={filterData}
      getTableData={getFinishes}
    />
  );
};

export default SupplierFinishes;
