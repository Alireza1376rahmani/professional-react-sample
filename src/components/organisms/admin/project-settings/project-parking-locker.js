import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { defText } from '../user-list-wrapper';
import {
  fetchParkingLockerApi,
  fetchParkingLockerCountApi,
} from '../../../../services/project-settings';
import { Col, Form, FormItem, Row, Select, Tooltip } from '../../../atoms';
import TableWrapper from '../../table-wrapper';
import { getProjects, projectsValuesLoading } from '../../../../selectors/projects';
import { fetchProjects } from '../../../../actions/projects';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import { checkExistIcon } from '../../../../Utils/Helpers';

const initialFilterValues = { 'Project_id.id': '' };

const ProjectParkingLocker = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [parkingLocker, setParkingLocker] = useState([]);
  const [parkingLockerCount, setParkingLockerCount] = useState(0);
  const [parkingLockerLoading, setParkingLockerLoading] = useState(false);
  const [filterData, setFiltersData] = useState({});
  const { projects } = useSelector(getProjects);
  const projectsLoading = useSelector(projectsValuesLoading);
  const projectData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
  }, []);

  const getParkingLocker = params => {
    if (params['Project_id.id']) {
      const requestData = {
        _sort: 'Amenity_id.Description',
        ...params,
      };
      setParkingLockerLoading(true);
      fetchParkingLockerApi(requestData)
        .then(res => {
          setParkingLockerLoading(false);
          setParkingLocker(res?.data || []);
        })
        .catch(() => setParkingLockerLoading(false));

      fetchParkingLockerCountApi(requestData)
        .then(res => {
          setParkingLockerCount(res?.data || 0);
        })
        .catch(() => {});
    } else {
      setParkingLocker([]);
      setParkingLockerCount(0);
    }
  };

  const columns = [
    {
      title: 'Amenity Description',
      dataIndex: 'Amenity_id',
      key: 'Amenity_id',
      sorter: true,
      render: item => (
        <Tooltip placement='top' title={item?.Description}>
          <div>
            {defText(item?.Description, 'left', false, {
              max_width: '500px',
              text_overflow: 'ellipsis',
            })}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'SpaceType',
      key: 'SpaceType',
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'List Price',
      dataIndex: 'UnitPrice',
      key: 'UnitPrice',
      sorter: true,
      render: text => defText(text, 'right', true),
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
      dataSource={parkingLocker}
      columns={columns}
      loading={parkingLockerLoading}
      total={parkingLockerCount}
      filterContent={filterContent}
      filterData={filterData}
      getTableData={getParkingLocker}
    />
  );
};

export default ProjectParkingLocker;
