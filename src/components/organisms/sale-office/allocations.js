/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Col, Input, Paragraph, Select } from '../../atoms';
import PageFilter from '../../molecules/PageFilter';
import { statuses, statusesObj } from '../../../constants/statuses';
import {
  allocationRequestsValuesLoading,
  getAllocationRequests,
} from '../../../selectors/allocation-requests';
import { fetchAllocationRequests } from '../../../actions/allocation-requests';
import AllocAddModal from '../alloc-add-modal';
import { createProspectListText, sortAllocData } from '../../../Utils/Helpers';
import AllocationTable from '../../molecules/AllocationTable';
import { floorPreferences } from '../../../constants/etc';
import { defText } from '../admin/user-list-wrapper';
import { updateAllocationRequestApi } from '../../../services/allocation-requests';

const Allocations = () => {
  const dispatch = useDispatch();
  const { allocationRequests } = useSelector(getAllocationRequests);
  const requestsData = allocationRequests ? sortAllocData(allocationRequests) : [];
  const loading = useSelector(allocationRequestsValuesLoading);
  const [allocEditData, setAllocEditData] = useState(null);

  useEffect(() => {
    getAllocations();
  }, []);

  const getAllocations = () => {
    dispatch(fetchAllocationRequests.request({ _sort: 'project.ProjectName' }));
  };

  const closeModal = () => {
    setAllocEditData(null);
  };

  const openAllocModal = item => {
    setAllocEditData(item);
    if (item?.AllocationStatus === 'pending') {
      updateAllocationRequestApi({
        id: item.id,
        values: {
          AllocationStatus: 'inprogress',
          RequestIsLocked: true,
          LockedDate: moment().format(),
        },
      }).then(() => getAllocations());
    }
  };

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'ProjectName',
      key: 'ProjectName',
      fixed: 'left',
      width: 30,
      render: (item, data) => data.project?.ProjectName,
    },
    {
      title: 'Broker Name',
      dataIndex: 'Broker',
      key: 'Broker',
      width: 25,
      render: item => item?.username,
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
      width: 30,
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
      width: 20,
      render: item => moment(item).format('ll'),
    },
    {
      title: 'Status',
      dataIndex: 'AllocationStatus',
      key: 'AllocationStatus',
      fixed: 'right',
      align: 'center',
      width: 20,
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
      width: 15,
      render: item => (
        <EditOutlined style={{ color: '#886CC0' }} onClick={() => openAllocModal(item)} />
      ),
    },
  ];

  return (
    <>
      {allocEditData && (
        <AllocAddModal closeModal={closeModal} allocEditData={allocEditData} isSales={true} />
      )}
      <PageFilter>
        <Col span={5}>
          <Input placeholder='Filter Project name' />
        </Col>
        <Col span={5}>
          <Input placeholder='Filter with Broker' />
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
      <Paragraph type='secondary' fz={24} fw={600}>
        Allocation Requests
      </Paragraph>
      <AllocationTable columns={columns} loading={loading} requestsData={requestsData} />
    </>
  );
};

export default Allocations;
