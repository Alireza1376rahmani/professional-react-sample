import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from '../atoms';
import RemindMessagesList from '../molecules/RemindMessagesList';
import AllocationRequestsPrev from '../molecules/AllocationRequestsPrev';
import OtherProjects from '../molecules/OtherProjects';
import { getUserRole } from '../../selectors/users';
import MyPurchasesPrev from '../molecules/MyPurchasesPrev';

const dashboardComps = {
  brokers: [<RemindMessagesList />, <AllocationRequestsPrev />, <OtherProjects />],
  sale_office: [<RemindMessagesList />, <AllocationRequestsPrev />, <OtherProjects />],
  client: [
    <RemindMessagesList />,
    <MyPurchasesPrev />,
    <OtherProjects pageTitle='Other Opportunities' redirectUrl='/investment-opportunities' />,
  ],
};

const Dashboard = () => {
  const role = useSelector(getUserRole);
  const roleComp = dashboardComps[role];
  return (
    <Row gutter={24}>
      <Col span={15}>{roleComp[0]}</Col>
      <Col span={9}>{roleComp[2]}</Col>
      <Col span={24}> {roleComp[1]}</Col>
    </Row>
  );
};

export default Dashboard;
