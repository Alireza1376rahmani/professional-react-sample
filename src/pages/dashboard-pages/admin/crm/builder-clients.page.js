import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableWrapper from '../../../../components/organisms/table-wrapper';
import { Col, Form, FormItem, Input, Row, Tooltip } from '../../../../components/atoms';
import { defText } from '../../../../components/organisms/admin/user-list-wrapper';
import { checkExistIcon } from '../../../../Utils/Helpers';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import { fetchBuilders } from '../../../../actions/builders';
import { buildersValuesLoading, getBuilders } from '../../../../selectors/builders';
import { fetchAllBuildersCountApi } from '../../../../services/builders';

const initialFilterValues = {
  _q: '',
  ContactEmail: '',
  ContactPhone: '',
};

const BuilderClientsPage = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [buildersCount, setBuildersCount] = useState(0);
  // const [filtersLoading, setFiltersLoading] = useState(false);
  const [filterData, setFiltersData] = useState({});
  const { builders } = useSelector(getBuilders);
  const buildersLoading = useSelector(buildersValuesLoading);
  const builderData = builders || [];

  const getBuildersData = params => {
    dispatch(fetchBuilders.request(params));
    fetchAllBuildersCountApi(params)
      .then(res => {
        setBuildersCount(res?.data || 0);
      })
      .catch(() => {});
  };

  const columns = [
    {
      title: 'Builder',
      dataIndex: 'BuilderName',
      key: 'BuilderName',
      // width: 200,
      render: item => defText(item, 'left'),
    },
    {
      title: 'Web Site',
      dataIndex: 'Website',
      key: 'Website',
      width: 200,
      sorter: true,
      render: item => defText(item, 'left'),
    },
    {
      title: 'Contact Name',
      dataIndex: 'ContactName',
      key: 'ContactName',
      width: 200,
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Email',
      dataIndex: 'ContactEmail',
      key: 'ContactEmail',
      width: 200,
      sorter: true,
      render: item => defText(item, 'left'),
    },
    {
      title: 'Phone',
      dataIndex: 'ContactPhone',
      key: 'ContactPhone',
      sorter: true,
      width: 150,
      render: item => defText(item, 'left'),
    },
    {
      title: 'Notes',
      dataIndex: 'Notes',
      key: 'Notes',
      width: 200,
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
      <Col span={24}>
        {/* <Spin spinning={filtersLoading}> */}
        <Form
          {...defFormLayout}
          form={form}
          initialValues={initialFilterValues}
          onFinish={setFiltersData}
        >
          <Row align='bottom' gutter={24} mb={15}>
            <Col>
              <FormItem name='_q' label='Free-text Search' mb={0} width='200px'>
                <Input width='200px' />
              </FormItem>
            </Col>
            {/* <Col> */}
            {/*  <FormItem name='ContactEmail' label='Email' mb={0} width='250px'> */}
            {/*    <Select width='250px'> */}
            {/*      {[{ id: '', Description: 'All' }].map(el => ( */}
            {/*        <Select.Option value={el.id} key={el.id}> */}
            {/*          {el?.Description} */}
            {/*        </Select.Option> */}
            {/*      ))} */}
            {/*    </Select> */}
            {/*  </FormItem> */}
            {/* </Col> */}
            {/* <Col> */}
            {/*  <FormItem name='ContactPhone' label='Phone' mb={0} width='250px'> */}
            {/*    <Select width='250px'> */}
            {/*      {[{ id: '', Description: 'All' }].map(el => ( */}
            {/*        <Select.Option value={el?.id} key={el?.id}> */}
            {/*          {el?.Description} */}
            {/*        </Select.Option> */}
            {/*      ))} */}
            {/*    </Select> */}
            {/*  </FormItem> */}
            {/* </Col> */}
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
        {/* </Spin> */}
      </Col>
    </Row>
  );
  return (
    <TableWrapper
      dataSource={builderData}
      columns={columns}
      loading={buildersLoading}
      total={buildersCount}
      filterContent={filterContent}
      filterData={filterData}
      getTableData={getBuildersData}
    />
  );
};

export default BuilderClientsPage;
