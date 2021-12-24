import React from 'react';
import UserListWrapper, { defText } from '../../../../components/organisms/admin/user-list-wrapper';

const BrokerAgenciesPage = () => {
  return (
    <UserListWrapper
      role='agency'
      endpoint='/re-broker-agencies'
      buttonText='New Agency'
      mainColumns={[
        {
          title: 'Brokerage Name',
          dataIndex: 'AgencyName',
          key: 'AgencyName',
          order: 1,
          size: 24,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Contact Name',
          dataIndex: 'Contact',
          key: 'Contact',
          order: 2,
          size: 24,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Phone',
          dataIndex: 'Phone',
          key: 'Phone',
          order: 2,
          size: 24,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Email',
          dataIndex: 'Email',
          key: 'Email',
          order: 3,
          render: text => defText(text, 'left'),
        },
      ]}
    />
  );
};

export default BrokerAgenciesPage;
