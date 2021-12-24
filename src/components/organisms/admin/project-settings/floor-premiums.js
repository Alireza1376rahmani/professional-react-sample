import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllFloorPremiumsApi,
  fetchAllFloorPremiumsCountApi,
  updateFloorPremiumsApi,
} from '../../../../services/project-settings';
import { defText } from '../user-list-wrapper';
import { checkExistIcon } from '../../../../Utils/Helpers';
import TableWrapper from '../../table-wrapper';
import { Col, Form, FormItem, InputNumber, Row, Select, Tooltip } from '../../../atoms';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import { getProjects, projectsValuesLoading } from '../../../../selectors/projects';
import { fetchProjects } from '../../../../actions/projects';

const initialFilterValues = { 'Project_id.id': '' };

const FloorPremiums = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [floorPremiums, setFloorPremiums] = useState([]);
  const [floorPremiumsCount, setFloorPremiumsCount] = useState(0);
  const [floorPremiumsLoading, setFloorPremiumsLoading] = useState(false);
  const [filterData, setFiltersData] = useState({});
  const [editRowData, setEditRowData] = useState(null);
  // const [filtersLoading, setFiltersLoading] = useState(false);
  const { projects } = useSelector(getProjects);
  const projectsLoading = useSelector(projectsValuesLoading);
  const projectData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
  }, []);

  const getFloorPremiums = params => {
    if (params['Project_id.id']) {
      setFloorPremiumsLoading(true);
      const requestData = {
        _sort: 'FloorLevel',
        ...params,
      };
      fetchAllFloorPremiumsApi(requestData)
        .then(res => {
          setFloorPremiumsLoading(false);
          setFloorPremiums(res?.data || []);
        })
        .catch(() => setFloorPremiumsLoading(false));
      fetchAllFloorPremiumsCountApi(requestData)
        .then(res => {
          setFloorPremiumsCount(res?.data || 0);
        })
        .catch(() => {});
    } else {
      setFloorPremiums([]);
      setFloorPremiumsCount(0);
    }
  };

  const updateFloorPremiums = (recordId, value) => {
    setFloorPremiumsLoading(true);
    updateFloorPremiumsApi({ id: recordId, values: { Premium: value } })
      .then(res => {
        setFloorPremiumsLoading(false);
        const floorPremiumsCopy = [...floorPremiums];
        floorPremiumsCopy.splice(
          floorPremiumsCopy.findIndex(el => el.id === res?.data?.id),
          1,
          res?.data
        );
        setFloorPremiums(floorPremiumsCopy);
        setEditRowData(null);
      })
      .catch(() => {
        setFloorPremiumsLoading(false);
        setEditRowData(null);
      });
  };

  const checkEdit = (record, defComp, defaultValue, key) => {
    if (record.id === editRowData?.id && key === editRowData?.key) {
      const editFields = {
        Premium: (
          <Row justify='end'>
            <InputNumber
              width='100px'
              autoFocus={true}
              height='30px'
              hide='controls'
              type='number'
              precision={2}
              step={0.1}
              min={0}
              onFocus={e => e.target.select()}
              defaultValue={defaultValue}
              onBlur={e => updateFloorPremiums(record.id, e.target.value)}
              onPressEnter={e => updateFloorPremiums(record.id, e.target.value)}
              onKeyDown={cancelPriceEdit}
            />
          </Row>
        ),
      };
      return editFields[key];
    }
    return defComp;
  };

  const cancelPriceEdit = event => {
    if (event.keyCode === 27 && editRowData) {
      setEditRowData(null);
    }
  };

  const columns = [
    {
      title: 'Floor Level',
      dataIndex: 'FloorLevel',
      key: 'FloorLevel',
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Legal Level',
      dataIndex: 'LegalLevel',
      key: 'LegalLevel',
      sorter: true,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Floor Premium',
      dataIndex: 'Premium',
      key: 'Premium',
      sorter: true,
      render: (text, data) =>
        checkEdit(
          data,
          defText(text, 'right', true, {
            onClick: () => {
              setEditRowData({ key: 'Premium', id: data.id });
            },
          }),
          text,
          'Premium'
        ),
    },
    {
      title: 'Inactive',
      dataIndex: 'inactive',
      key: 'inactive',
      align: 'center',
      render: inactive => checkExistIcon(inactive),
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
      dataSource={floorPremiums}
      columns={columns}
      loading={floorPremiumsLoading}
      total={floorPremiumsCount}
      filterContent={filterContent}
      filterData={filterData}
      getTableData={getFloorPremiums}
    />
  );
};

export default FloorPremiums;
