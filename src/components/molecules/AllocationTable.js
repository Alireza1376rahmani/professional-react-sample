import React from 'react';
import { Paragraph, Table } from '../atoms';

const AllocationTable = ({ requestsData, columns, loading, hideExtra }) => {
  return (
    <Table
      dataSource={requestsData}
      columns={columns}
      loading={loading}
      extra='pagination'
      rowKey={record => record.id}
      pagination={
        hideExtra
          ? false
          : {
              position: ['bottomRight'],
              pageSize: 10,
              showSizeChanger: false,
              hideOnSinglePage: true,
              showTotal: (totals, current) => (
                <Paragraph type='secondary' fw={400} fz={16} mb={0}>
                  Showing {current[0]}-{current[1]} of {requestsData.length || 0}
                </Paragraph>
              ),
            }
      }
      scroll={hideExtra ? false : { x: 1250 }}
    />
  );
};

export default AllocationTable;
