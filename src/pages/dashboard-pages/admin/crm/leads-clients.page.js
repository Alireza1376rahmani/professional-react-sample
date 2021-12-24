import React from 'react';
import UserListWrapper, { defText } from '../../../../components/organisms/admin/user-list-wrapper';
import { checkExistIcon } from '../../../../Utils/Helpers';

const LeadsClientsPage = () => {
  return (
    <UserListWrapper
      role='buyerClients'
      // buttonText='New Buyer Client'
      endpoint='/rq-buyer-clients'
      mainColumns={[
        {
          title: 'Corp?',
          dataIndex: 'IsCompany',
          key: 'IsCompany',
          order: 1,
          align: 'center',
          width: 50,
          render: text => checkExistIcon(text),
        },
        {
          title: 'Full Name',
          dataIndex: 'LegalFullName',
          key: 'LegalFullName',
          order: 2,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Phone',
          dataIndex: 'CommPhone',
          key: 'CommPhone',
          order: 3,
          width: 150,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Mobile',
          dataIndex: 'MobilePhone',
          key: 'MobilePhone',
          order: 4,
          width: 150,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Email',
          dataIndex: 'CommEmail',
          key: 'CommEmail',
          order: 5,
          width: 200,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Lead Type',
          dataIndex: 'LeadRating',
          key: 'LeadRating',
          order: 6,
          width: 150,
          render: text => defText(text, 'left'),
        },
      ]}
    />
  );
};

export default LeadsClientsPage;
