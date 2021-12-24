import React, { useEffect, useState } from 'react';
import UserListWrapper, { defText } from '../../../../components/organisms/admin/user-list-wrapper';
import { Col, FormItem, Input, Select } from '../../../../components/atoms';
import { fetchAdminUsersApi } from '../../../../services/users';
// import { fetchAgentClasses } from '../../../../services/project-settings';

const CoBrokeAgentsPage = () => {
  const [brokerage, setBrokerage] = useState([]);
  // const [agentClasses, setAgentClasses] = useState([]);
  const [filtersLoading, setFiltersLoading] = useState(false);

  useEffect(() => {
    getAgencies();
    // getAgentClasses();
  }, []);

  // const getAgentClasses = () => {
  //   fetchAgentClasses()
  //     .then(res => {
  //       setFiltersLoading(false);
  //       setAgentClasses(res?.data || []);
  //     })
  //     .catch(() => setFiltersLoading(false));
  // };

  const getAgencies = () => {
    fetchAdminUsersApi('/re-broker-agencies')
      .then(res => {
        setFiltersLoading(false);
        setBrokerage(res?.data || []);
      })
      .catch(() => setFiltersLoading(false));
  };

  const filters = (
    <>
      <Col>
        <FormItem name='BrokerAgency_id.id' label='Brokerage' mb={0} width='250px' initialValue=''>
          <Select width='250px'>
            {[{ id: '', AgencyName: 'All' }, ...brokerage].map(el => (
              <Select.Option value={el.id} key={el.id}>
                {el?.AgencyName}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
      <Col>
        <FormItem name='Agent Class' label='Agent Class' mb={0} width='200px' initialValue=''>
          <Select width='200px'>
            {[{ id: '', label: 'All' }].map(el => (
              <Select.Option value={el.id} key={el.id}>
                {el.label}
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
    </>
  );

  return (
    <UserListWrapper
      role='brokers'
      endpoint='/re-broker-agents'
      buttonText='New Agent'
      filters={filters}
      filtersLoading={filtersLoading}
      mainColumns={[
        {
          title: 'First Name',
          dataIndex: 'FirstName',
          key: 'FirstName',
          sorter: true,
          order: 1,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Last Name',
          dataIndex: 'LastName',
          key: 'LastName',
          sorter: true,
          order: 2,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Agent Class',
          dataIndex: 'BrokerRating',
          key: 'BrokerRating',
          sorter: true,
          order: 2,
          width: 200,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Email',
          dataIndex: 'Email',
          key: 'Email',
          sorter: true,
          order: 3,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Phone',
          dataIndex: 'Phone',
          key: 'Phone',
          sorter: true,
          order: 4,
          size: 24,
          width: 200,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Agency',
          dataIndex: 'AgencyName',
          key: 'AgencyName',
          sorter: true,
          order: 5,
          hideInModal: true,
          render: text => defText(text, 'left'),
        },
        {
          title: 'RECO Number',
          dataIndex: 'RECONumber',
          key: 'RECONumber',
          sorter: true,
          order: 6,
          hideInModal: true,
          width: 150,
          render: text => defText(text, 'left'),
        },
      ]}
    />
  );
};

export default CoBrokeAgentsPage;
