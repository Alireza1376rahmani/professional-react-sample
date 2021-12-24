import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import moment from 'moment';
import { Col, Form, FormItem, Input, Paragraph, Row, Table, Tooltip } from '../../atoms';
import UserAddModal from '../user-add-modal';
import { convertFileUrl } from '../AllocAddSecStep';
import { allFieldLabels, roleFields } from '../../../constants/fields';
import { fetchAdminUsersApi, fetchAdminUsersCountApi } from '../../../services/users';
import { defFormLayout, sortDirectionKeys } from '../../../constants/etc';
import ApplyFilterIcon from '../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../assets/images/custom-icons/ClearFilterIcon';
import { checkExistIcon, filterEmptyValues } from '../../../Utils/Helpers';

export const defText = (text, align, isPrice, extraProps = {}) => {
  let rowContent = '';
  if (!text) {
    rowContent = '-';
  } else {
    rowContent = text;
    if (isPrice) {
      rowContent = isPrice?.onlyLocale
        ? Number(text).toLocaleString()
        : Number(text).toLocaleString(undefined, { minimumFractionDigits: 2 });
    }
  }

  return (
    <Paragraph
      mb={0}
      align={align || 'left'}
      {...extraProps}
      color='#000'
      fz={14}
      fw={350}
      // text_overflow='ellipsis'
    >
      {rowContent}
    </Paragraph>
  );
};

const initialFilterValues = {};

const UserListWrapper = ({
  role,
  endpoint,
  buttonText,
  mainColumns = [],
  filters = '',
  filtersLoading = false,
}) => {
  const [extraFormRef] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [usersDataLoading, setUsersDataLoading] = useState(false);
  const [extraFilterData, setExtraFilterData] = useState(initialFilterValues);
  const [paginationData, setPaginationData] = useState({ size: 25, number: 1 });
  const [sortData, setSortData] = useState({
    column: '',
    direction: '',
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getUsersRequest();
  }, [extraFilterData, paginationData, sortData]);

  const printFieldValue = (data, field) => {
    if (field.type === 'boolean') {
      return data[field.key] ? 'Yes' : 'No';
    }
    if (field.key === 'agency') {
      return data[field.key]?.firstName
        ? `${data[field.key]?.firstName} ${data[field.key]?.lastName}`
        : '-';
    }
    if (field.key === 'license') {
      return data[field.key]?.url ? (
        <a
          href={convertFileUrl(data[field.key]?.url)}
          target='_blank'
          rel='noreferrer'
          style={{
            color: '#886CC0',
            maxWidth: '300px',
            display: 'block',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
        >
          {data[field.key]?.name}
        </a>
      ) : (
        '-'
      );
    }
    return (field?.parentKey ? data[field?.parentKey][field.key] : data[field.key]) || '-';
  };

  const columns = [
    ...mainColumns,
    {
      title: 'Inactive',
      dataIndex: 'Inactive',
      key: 'Inactive',
      hideInModal: true,
      order: 12,
      align: 'center',
      width: 50,
      options: [
        { label: 'Active', value: true },
        { label: 'Inactive', value: false },
      ],
      render: item => checkExistIcon(item),
    },
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   key: '',
    //   hideInModal: true,
    //   align: 'center',
    //   order: 15,
    //   render: (text, record) => (
    //     <Dropdown
    //       overlay={() => (
    //         <Menu padding='5px 30px 10px'>
    //           <Menu.Item key='edit' onClick={() => setEditData(record)}>
    //             Edit
    //           </Menu.Item>
    //           <Menu.Item key='delete' onClick={() => changeUserStatus(record, !record?.confirmed)}>
    //             {record?.confirmed ? 'Deactivate' : 'Activate'}
    //           </Menu.Item>
    //         </Menu>
    //       )}
    //       placement='bottomRight'
    //       trigger={['click']}
    //     >
    //       <MoreOutlined />
    //     </Dropdown>
    //   ),
    // },
  ].sort((a, b) => a.order - b.order);

  const closeModal = () => {
    setModalOpen(false);
    setEditData(null);
    getUsersRequest();
  };

  // const changeUserStatus = (data, status) => {
  //   dispatch(updateUsers.request({ id: data?.id, values: { confirmed: status } }));
  // };

  const getUsersRequest = () => {
    if (Object.keys(extraFilterData)[0]) {
      setUsersDataLoading(true);
      const { size, number } = paginationData;
      const { column, direction } = sortData;
      const params = {
        _limit: size,
        _start: number * size - size,
        ...extraFilterData,
      };
      if (column) {
        // eslint-disable-next-line no-underscore-dangle
        params._sort = `${column}:${direction}`;
      }
      fetchAdminUsersApi(endpoint, { ...filterEmptyValues(params) })
        .then(res => {
          setUsersDataLoading(false);
          setUsersData(res?.data || []);
        })
        .catch(() => setUsersDataLoading(false));
      fetchAdminUsersCountApi(endpoint, { ...filterEmptyValues(params) })
        .then(res => {
          setTotal(res?.data || 0);
        })
        .catch(() => {});
    } else {
      setUsersData([]);
      setTotal(0);
    }
  };

  const submitFilters = values => {
    const valuesCopy = { ...values };
    if (valuesCopy['apsSalesOffer_id.SalesDate'] && valuesCopy['apsSalesOffer_id.SalesDate'][0]) {
      valuesCopy['apsSalesOffer_id.SalesDate_gte'] = moment(
        valuesCopy['apsSalesOffer_id.SalesDate'][0]
      ).format();
      valuesCopy['apsSalesOffer_id.SalesDate_lte'] = moment(
        valuesCopy['apsSalesOffer_id.SalesDate'][1]
      ).format();
      delete valuesCopy['apsSalesOffer_id.SalesDate'];
    }
    setExtraFilterData(valuesCopy);
  };

  const handleSortChange = data => {
    setSortData({
      column: data?.column?.key || '',
      direction: sortDirectionKeys[data?.order] || '',
    });
  };

  const clearExtraFields = () => {
    extraFormRef.resetFields();
    setExtraFilterData(initialFilterValues);
  };

  const columnsData = columns.map(el => ({
    ...el,
    sorter: el?.sorter ? !!usersData?.length : false,
  }));

  return (
    <>
      {(modalOpen || editData) && (
        <UserAddModal closeModal={closeModal} editData={editData} role={role} />
      )}
      <Spin spinning={filtersLoading}>
        <Row mb={15} justify='space-between' align='center'>
          <Form
            form={extraFormRef}
            {...defFormLayout}
            // onFinish={setExtraFilterData}
            onFinish={submitFilters}
            initialValues={initialFilterValues}
          >
            <Row gutter={16} align='bottom'>
              {filters || (
                <Col>
                  <FormItem name='_q' label='Free-text Search' mb={0} width='200px'>
                    <Input width='200px' />
                  </FormItem>
                </Col>
              )}
              <Col align='center' height='40px'>
                <Tooltip placement='top' title='Apply Filters'>
                  <ApplyFilterIcon
                    className='filter_icon apply'
                    onClick={() => extraFormRef.submit()}
                    style={{ margin: '3px 15px 0 0' }}
                  />
                </Tooltip>
                <Tooltip placement='top' title='Clear Filters'>
                  <ClearFilterIcon className='filter_icon clear' onClick={clearExtraFields} />
                </Tooltip>
              </Col>
            </Row>
          </Form>
          {/* <Button type='primary' onClick={() => setModalOpen(true)}> */}
          {/*  + {buttonText} */}
          {/* </Button> */}
        </Row>
      </Spin>
      <Table
        columns={columnsData}
        extra='pagination'
        expand_back='#fff'
        onChange={(a, b, data) => handleSortChange(data)}
        rowKey={record => record.id}
        loading={usersDataLoading}
        pagination={{
          position: ['bottomRight'],
          defaultPageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: [25, 50, 100],
          hideOnSinglePage: true,
          pageSize: paginationData.size,
          current: paginationData.number,
          onChange: (page, size) => setPaginationData({ size, number: page }),
          total,
          showTotal: (totals, current) => (
            <Paragraph type='secondary' fw={400} fz={16} mb={0}>
              Showing {current[0]}-{current[1]} of {total || 0}
            </Paragraph>
          ),
        }}
        expandable={{
          expandedRowRender: record => (
            <Row gutter={[24, 0]} mb={15} key={record.id}>
              {roleFields[role].map(
                el =>
                  !el.hideInList && (
                    <Col span={el.listSize || 8} key={el.key}>
                      <Row
                        justify='space-between'
                        align='middle'
                        padding='8px 0 3px 0'
                        border_bot='1px solid #EEEEEE'
                        wrap={false}
                      >
                        <Paragraph mb={0} fz={14}>
                          {allFieldLabels[el.key]}
                        </Paragraph>
                        <Paragraph mb={0} type='secondary' fz={14} padding='0 0 0 15px'>
                          {printFieldValue(record, el)}
                        </Paragraph>
                      </Row>
                    </Col>
                  )
              )}
            </Row>
          ),
        }}
        dataSource={usersData}
      />
    </>
  );
};

export default UserListWrapper;
