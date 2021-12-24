/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Button, Col, Input, Menu, Paragraph, Row, Select, Modal, Tooltip } from '../../atoms';
import PageFilter from '../../molecules/PageFilter';
import AllocAddModal from '../alloc-add-modal';
import { fetchAllocationRequests } from '../../../actions/allocation-requests';
import {
  allocationRequestsValuesLoading,
  getAllocationRequests,
} from '../../../selectors/allocation-requests';
import { statuses, statusesObj } from '../../../constants/statuses';
import { createProspectListText } from '../../../Utils/Helpers';
import { floorPreferences } from '../../../constants/etc';
import AllocationTable from '../../molecules/AllocationTable';
import { defText } from '../admin/user-list-wrapper';
import { updateAllocationRequestApi } from '../../../services/allocation-requests';

const { confirm } = Modal;

const AllocationRequests = () => {
  const dispatch = useDispatch();
  const { allocationRequests } = useSelector(getAllocationRequests);
  const loading = useSelector(allocationRequestsValuesLoading);
  const [modalOpen, setModalOpen] = useState(false);
  const [allocEditData, setAllocEditData] = useState(null);
  const requestsData = allocationRequests || [];

  const getAllocations = () => {
    dispatch(fetchAllocationRequests.request({ _sort: 'updated_at:DESC' }));
  };

  useEffect(() => {
    getAllocations();
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setAllocEditData(null);
  };

  const showCancelConfirm = data => {
    confirm({
      title: 'Do you want to cancel this allocation request?',
      icon: <ExclamationCircleOutlined style={{ color: '#EF3E36' }} />,
      maskClosable: true,
      width: 475,
      className: 'modal_container',
      onOk() {
        return updateAllocationRequestApi({
          id: data.id,
          values: {
            AllocationStatus: 'cancelled',
            IsCanceled: true,
            CancelDate: moment().format(),
          },
        }).then(() => getAllocations());
      },
      onCancel() {},
    });
  };

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'ProjectName',
      key: 'ProjectName',
      fixed: 'left',
      width: 30,
      render: (item, data) => (
        <Tooltip placement='top' title={data.project?.ProjectName}>
          <div>
            <Paragraph max_width='180px' text_overflow='ellipsis' mb={0} fw={350}>
              {data.project?.ProjectName}
            </Paragraph>
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Purchaser(s)',
      dataIndex: 'Prospects',
      key: 'Prospects',
      width: 25,
      render: item => createProspectListText(item),
    },
    {
      title: 'Floor Choice #1',
      dataIndex: 'FloorPreference1',
      key: 'FloorPreference1',
      align: 'center',
      width: 25,
      render: item => floorPreferences.find(el => el.value === item)?.label,
    },
    {
      title: 'Model Choice 1',
      dataIndex: 'FloorPlan1',
      key: 'FloorPlan1',
      width: 25,
      render: item => defText(item, 'left'),
    },
    {
      title: 'Request Date',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 25,
      render: item => moment(item).format('ll'),
    },
    {
      title: 'Unit No',
      dataIndex: 'ActualUnit',
      key: 'ActualUnit',
      width: 25,
      render: item => defText(item?.UnitNo, 'left'),
    },
    {
      title: 'Status Date',
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 25,
      render: item => moment(item).format('ll'),
    },
    {
      title: 'Status',
      dataIndex: 'AllocationStatus',
      key: 'AllocationStatus',
      fixed: 'right',
      align: 'center',
      width: 15,
      render: item => (
        <Paragraph color={statusesObj[item].color} mb={0} fw={350}>
          {statusesObj[item].text}
        </Paragraph>
      ),
    },
    {
      title: 'Action',
      align: 'center',
      fixed: 'right',
      width: 10,
      render: item =>
        item.AllocationStatus === 'pending' ? (
          <Dropdown
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item key='edit' onClick={() => setAllocEditData(item)}>
                  <Paragraph mb={0} color='#886CC0' vert_align='center'>
                    <EditOutlined style={{ color: '#886CC0', marginRight: '10px' }} /> Edit
                  </Paragraph>
                </Menu.Item>
                <Menu.Item key='cancel' onClick={() => showCancelConfirm(item)}>
                  <Paragraph mb={0} color='#EF3E36' vert_align='center'>
                    <CloseCircleOutlined style={{ color: '#EF3E36', marginRight: '10px' }} /> Cancel
                  </Paragraph>
                </Menu.Item>
              </Menu>
            }
            placement='bottomRight'
          >
            <MoreOutlined />
          </Dropdown>
        ) : (
          <EyeOutlined style={{ color: '#886CC0' }} onClick={() => setAllocEditData(item)} />
        ),
    },
  ];

  return (
    <>
      {(modalOpen || allocEditData) && (
        <AllocAddModal closeModal={closeModal} allocEditData={allocEditData} />
      )}
      <PageFilter>
        <Col span={5}>
          <Input placeholder='Filter Project name' />
        </Col>
        <Col span={5}>
          <Input placeholder='Filter Project name' />
        </Col>
        <Col span={5}>
          <Select placeholder='All status' value={null}>
            {statuses.map(el => (
              <Select.Option value={el.value} key={el.value}>
                {el.label}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </PageFilter>
      <Row justify='space-between' align='middle' mb={30}>
        <Paragraph type='secondary' fz={24} fw={600} mb={0}>
          Allocation Requests
        </Paragraph>
        <Button type='primary' onClick={() => setModalOpen(true)}>
          + Submit New Allocation
        </Button>
      </Row>
      <AllocationTable requestsData={requestsData} columns={columns} loading={loading} />
    </>
  );
};

export default AllocationRequests;
