import React, { useEffect, useState } from 'react';
import { Paragraph, Table } from '../atoms';
import { sortDirectionKeys } from '../../constants/etc';

const defPaginationData = { size: 25, number: 1 };

const TableWrapper = ({
  columns = [],
  loading = false,
  total = 0,
  dataSource = [],
  tableExtraProps = {},
  filterContent = '',
  filterData = {},
  getTableData = () => {},
  triggerRequest = false,
}) => {
  const [paginationData, setPaginationData] = useState(defPaginationData);
  const [sortData, setSortData] = useState({
    column: '',
    direction: '',
  });

  useEffect(() => {
    convertedRequest();
  }, [paginationData, sortData]);

  useEffect(() => {
    if (triggerRequest) {
      convertedRequest();
    }
  }, [triggerRequest]);

  useEffect(() => {
    if (JSON.stringify(paginationData) === JSON.stringify(defPaginationData)) {
      convertedRequest();
    } else {
      setPaginationData(defPaginationData);
    }
  }, [filterData]);

  const convertedRequest = () => {
    let params = {};
    if (Object.keys(filterData)[0]) {
      const { size, number } = paginationData;
      const { column, direction } = sortData;
      params = {
        _limit: size,
        _start: number * size - size,
      };
      if (column) {
        // eslint-disable-next-line no-underscore-dangle
        params._sort = `${column}:${direction}`;
      }
      Object.keys(filterData).forEach(key => {
        if (filterData[key]) {
          params[key] = filterData[key];
        }
      });
    } else {
      params = {
        _limit: 0,
        _start: 1,
      };
    }
    getTableData(params);
  };

  const handleSortChange = data => {
    if (dataSource?.length) {
      setSortData({
        column: data?.column?.sortKey || data?.column?.key,
        direction: sortDirectionKeys[data?.order] || '',
      });
    }
  };

  const columnsData = columns.map(el => ({
    ...el,
    sorter: el?.sorter ? !!dataSource?.length : false,
  }));

  return (
    <>
      {filterContent}
      <Table
        columns={columnsData}
        extra='pagination'
        onChange={(a, b, data) => handleSortChange(data)}
        expand_back='#fff'
        rowKey={record => record.id}
        loading={loading}
        cell_padding='5px 10px'
        pagination={{
          position: ['bottomRight'],
          defaultPageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: [25, 50, 100],
          pageSize: paginationData.size,
          hideOnSinglePage: true,
          current: paginationData.number,
          onChange: (page, size) => setPaginationData({ size, number: page }),
          total,
          showTotal: (totals, current) => (
            <Paragraph type='secondary' fw={400} fz={16} mb={0}>
              Showing {current[0]}-{current[1]} of {total || 0}
            </Paragraph>
          ),
        }}
        dataSource={dataSource}
        {...tableExtraProps}
      />
    </>
  );
};

export default TableWrapper;
