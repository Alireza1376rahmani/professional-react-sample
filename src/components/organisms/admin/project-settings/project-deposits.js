import React, { useEffect, useState } from 'react';
import { Empty, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDepositDetsApi,
  fetchDepositSetsApi,
  fetchDepositSetsCountApi,
} from '../../../../services/project-settings';
import { defText } from '../user-list-wrapper';
import { checkExistIcon } from '../../../../Utils/Helpers';
import { Col, Form, FormItem, Paragraph, Row, Select, Table, Tooltip } from '../../../atoms';
import { defFormLayout, sortDirectionKeys } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import { getProjects, projectsValuesLoading } from '../../../../selectors/projects';
import { fetchProjects } from '../../../../actions/projects';

const initialFilterValues = { 'pjDepositSet_id.Project_id': '' };
const defPaginationData = { size: 25, number: 1 };

const ProjectDeposits = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [deposits, setDeposits] = useState([]);
  const [depositDets, setDepositDets] = useState([]);
  const [depositsCount, setDepositsCount] = useState(0);
  const [depositSetsLoading, setDepositsSetsLoading] = useState(false);
  const [depositDetsLoading, setDepositDetsLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [filterData, setFiltersData] = useState({});
  const [paginationData, setPaginationData] = useState(defPaginationData);
  const [sortData, setSortData] = useState({
    column: '',
    direction: '',
  });
  const { projects } = useSelector(getProjects);
  const projectsLoading = useSelector(projectsValuesLoading);
  const projectData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
  }, []);

  useEffect(() => {
    convertedRequest();
  }, [paginationData, sortData, filterData]);

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
    getDepositSets(params);
  };

  const getDepositSets = params => {
    if (params['Project_id.id']) {
      setDepositsSetsLoading(true);
      const requestData = {
        // 'pjDepositSet_id.Project_id': projectId,
        _sort: 'Description',
        ...params,
      };
      fetchDepositSetsApi(requestData)
        .then(res => {
          setDepositsSetsLoading(false);
          setDeposits(res?.data || []);
        })
        .catch(() => setDepositsSetsLoading(false));
      fetchDepositSetsCountApi(requestData)
        .then(res => {
          setDepositsCount(res?.data || 0);
        })
        .catch(() => {});
    } else {
      setDeposits([]);
      setDepositsCount(0);
    }
  };
  const getDepositDets = params => {
    setDepositDetsLoading(true);
    const requestData = {
      // _sort: 'DepDueDays',
      ...params,
    };
    fetchDepositDetsApi(requestData)
      .then(res => {
        setDepositDetsLoading(false);
        setDepositDets(res?.data || []);
      })
      .catch(() => setDepositDetsLoading(false));
  };

  const onExpand = (expanded, record) => {
    if (expanded) {
      setExpandedRowKeys([record.id]);
      getDepositDets({ 'pjDepositSet_id.id': record.id });
    } else {
      setExpandedRowKeys([]);
    }
  };

  const handleSortChange = data => {
    if (deposits?.length) {
      setSortData({
        column: data?.column?.sortKey || data?.column?.key,
        direction: sortDirectionKeys[data?.order] || '',
      });
    }
  };

  const columns = [
    {
      title: 'Sched Type',
      dataIndex: 'SchedType',
      key: 'SchedType',
      sorter: true,
      width: 200,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Deposit Set',
      dataIndex: 'Description',
      key: 'Description',
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Total(%)',
      dataIndex: 'PerCentReq',
      key: 'PerCentReq',
      sorter: true,
      render: text => defText(text, 'right', true),
    },
    {
      title: 'Int’l',
      dataIndex: 'International',
      key: 'International',
      sorter: true,
      render: text => checkExistIcon(text),
    },
    {
      title: 'Notes',
      dataIndex: 'Notes',
      key: 'Notes',
      sorter: true,
      width: 250,
      render: item => (
        <Tooltip placement='top' title={item}>
          <div>
            {defText(item, 'left', false, {
              max_width: '250px',
              text_overflow: 'ellipsis',
            })}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Inactive',
      dataIndex: 'Inactive',
      key: 'Inactive',
      align: 'center',
      width: 80,
      render: item => checkExistIcon(item),
    },
  ];

  const childColumns = [
    {
      title: 'Seq No',
      dataIndex: 'DepSeqNo',
      key: 'DepSeqNo',
      render: text => defText(text, 'right'),
    },
    {
      title: 'Type',
      dataIndex: 'DepositType',
      key: 'DepositType',
      render: text => defText(text, 'left'),
    },
    {
      title: 'Due Days',
      dataIndex: 'DepDueDays',
      key: 'DepDueDays',
      render: text => defText(text, 'right'),
    },
    {
      title: 'Deposit(%)',
      dataIndex: 'DepPerCent',
      key: 'DepPerCent',
      render: text => defText(text, 'right', true),
    },
    {
      title: 'Deposit($)',
      dataIndex: 'DepositAmt',
      key: 'DepositAmt',
      render: text => defText(text, 'right', true),
    },
  ];

  return (
    <>
      <Row>
        <Col span={24}>
          <Spin spinning={projectsLoading}>
            <Form
              {...defFormLayout}
              form={form}
              initialValues={initialFilterValues}
              onFinish={setFiltersData}
            >
              <Row align='bottom' gutter={24} mb={15}>
                <Col>
                  <FormItem
                    name='Project_id.id'
                    label='Project'
                    mb={0}
                    width='250px'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Project!',
                      },
                    ]}
                  >
                    <Select width='250px' placeholder='Select a project'>
                      {projectData.map(el => (
                        <Select.Option value={el.id} key={el.id}>
                          {el?.ProjectName}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Col>
                <Col align='center' height='40px'>
                  <Tooltip placement='top' title='Apply Filters'>
                    <ApplyFilterIcon
                      className='filter_icon apply'
                      onClick={form.submit}
                      style={{ margin: '3px 15px 0 0' }}
                    />
                  </Tooltip>
                  <Tooltip placement='top' title='Clear Filters'>
                    <ClearFilterIcon
                      className='filter_icon clear'
                      onClick={() => {
                        setFiltersData(initialFilterValues);
                        form.resetFields();
                      }}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Col>
      </Row>
      <Table
        dataSource={deposits}
        columns={columns}
        extra='pagination'
        expand_back='#fff'
        onChange={(a, b, data) => handleSortChange(data)}
        rowKey={record => record.id}
        loading={depositSetsLoading}
        pagination={{
          position: ['bottomRight'],
          defaultPageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: [25, 50, 100],
          pageSize: paginationData.size,
          current: paginationData.number,
          onChange: (page, size) => setPaginationData({ size, number: page }),
          total: depositsCount,
          showTotal: (totals, current) => (
            <Paragraph type='secondary' fw={400} fz={16} mb={0}>
              Showing {current[0]}-{current[1]} of {depositsCount || 0}
            </Paragraph>
          ),
        }}
        expandable={{
          expandedRowRender: () => (
            <Spin spinning={depositDetsLoading}>
              {depositDets?.length ? (
                <Table
                  dataSource={depositDets}
                  columns={childColumns}
                  pagination={false}
                  rowKey={record => record.id}
                />
              ) : (
                <Empty />
              )}
            </Spin>
          ),
          onExpand,
          expandedRowKeys,
        }}
      />
    </>
  );
};

export default ProjectDeposits;
