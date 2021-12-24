/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, ContentWrapper, Paragraph } from '../atoms';
import { fetchAllocationRequests } from '../../actions/allocation-requests';
import {
  allocationRequestsValuesLoading,
  getAllocationRequests,
} from '../../selectors/allocation-requests';
import { createProspectListText, sortAllocData } from '../../Utils/Helpers';
import { getUserRole } from '../../selectors/users';
import { statusesObj } from '../../constants/statuses';
import AllocationTable from './AllocationTable';

const roleAllocData = (data, role) => {
  const roleData = {
    brokers: data,
    sale_office: sortAllocData(data),
  };

  return roleData[role];
};

const AllocationRequestsPrev = ({ history }) => {
  const dispatch = useDispatch();
  const { allocationRequests } = useSelector(getAllocationRequests);
  const role = useSelector(getUserRole);
  const loading = useSelector(allocationRequestsValuesLoading);
  const requestsData = allocationRequests ? roleAllocData(allocationRequests, role) : [];

  useEffect(() => {
    dispatch(
      fetchAllocationRequests.request({
        _sort: 'updated_at:DESC',
        AllocationStatus_ne: 'cancelled',
        _limit: 10,
      })
    );
  }, []);

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'ProjectName',
      key: 'ProjectName',
      render: (item, data) => data.project?.ProjectName,
    },
    {
      title: 'Purchaser(s)',
      dataIndex: 'Prospects',
      key: 'Prospects',
      render: item => createProspectListText(item),
    },
    {
      title: 'Status',
      dataIndex: 'AllocationStatus',
      key: 'AllocationStatus',
      render: item => (
        <Paragraph color={statusesObj[item].color} mb={0} fw={350}>
          {statusesObj[item].text}
        </Paragraph>
      ),
    },
  ];

  return (
    <ContentWrapper padding='5px 20px'>
      <Card
        titlecolor='#717579'
        hpadding='0'
        bpadding='10px 0'
        title_padding='0'
        extra_padding='0'
        bordered={false}
        title='Allocation'
        extra={
          <Button
            type='primary'
            sectype='ghost'
            padding='0'
            onClick={() => history.push('/allocations')}
          >
            View All
          </Button>
        }
      >
        <AllocationTable
          requestsData={requestsData}
          columns={columns}
          loading={loading}
          hideExtra={true}
        />
      </Card>
    </ContentWrapper>
  );
};

export default withRouter(AllocationRequestsPrev);
