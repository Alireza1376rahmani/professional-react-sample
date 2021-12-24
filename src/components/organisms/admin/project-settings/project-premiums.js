import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { fetchPremiumsApi, fetchPremiumsCountApi } from '../../../../services/project-settings';
import { defText } from '../user-list-wrapper';
import { Col, Form, FormItem, Row, Select, Tooltip } from '../../../atoms';
import { getProjects, projectsValuesLoading } from '../../../../selectors/projects';
import { fetchProjects } from '../../../../actions/projects';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import TableWrapper from '../../table-wrapper';
import { checkExistIcon } from '../../../../Utils/Helpers';

const initialFilterValues = { 'Project_id.id': '' };

const ProjectPremiums = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [premiums, setPremiums] = useState([]);
  const [premiumsCount, setPremiumsCount] = useState(0);
  const [premiumsLoading, setPremiumsLoading] = useState(false);
  const [filterData, setFiltersData] = useState({});
  const { projects } = useSelector(getProjects);
  const projectsLoading = useSelector(projectsValuesLoading);
  const projectData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
  }, []);

  const getPremiums = params => {
    if (params['Project_id.id']) {
      setPremiumsLoading(true);
      const requestData = {
        _sort: 'PremiumDesc',
        ...params,
      };
      fetchPremiumsApi(requestData)
        .then(res => {
          setPremiumsLoading(false);
          setPremiums(res?.data || []);
        })
        .catch(() => setPremiumsLoading(false));

      fetchPremiumsCountApi(requestData)
        .then(res => {
          setPremiumsCount(res?.data || 0);
        })
        .catch(() => {});
    } else {
      setPremiums([]);
      setPremiumsCount(0);
    }
  };

  const columns = [
    {
      title: 'Premium Description',
      dataIndex: 'PremiumDesc',
      key: 'PremiumDesc',
      sorter: true,
      render: item => (
        <Tooltip placement='top' title={item}>
          <div>
            {defText(item, 'left', false, {
              max_width: '500px',
              text_overflow: 'ellipsis',
            })}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'PremiumType',
      key: 'PremiumType',
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Premium($)',
      dataIndex: 'PremiumAmt',
      key: 'PremiumAmt',
      sorter: true,
      render: text => defText(text, 'right', { onlyLocale: true }),
    },
    {
      title: 'Notes',
      dataIndex: 'Notes',
      key: 'Notes',
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Inactive',
      dataIndex: 'Inactive',
      key: 'Inactive',
      align: 'center',
      render: item => checkExistIcon(item),
    },
  ];

  const filterContent = (
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
                  <Select width='250px'>
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
  );

  return (
    <TableWrapper
      dataSource={premiums}
      columns={columns}
      loading={premiumsLoading}
      total={premiumsCount}
      filterContent={filterContent}
      filterData={filterData}
      getTableData={getPremiums}
    />
  );
};

export default ProjectPremiums;
