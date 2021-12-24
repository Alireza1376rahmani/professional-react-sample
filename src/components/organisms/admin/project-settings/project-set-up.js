import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  FormItem,
  Paragraph,
  Row,
  Select,
  Table,
  Tooltip,
} from '../../../atoms';
import { getProjects, projectsValuesLoading } from '../../../../selectors/projects';
import { fetchProjects } from '../../../../actions/projects';
import { defText } from '../user-list-wrapper';
import ProjectAddModal from '../../project-add-modal';
import { fetchBuilders } from '../../../../actions/builders';
import { getBuilders } from '../../../../selectors/builders';
import { fetchAllProjectsCountApi } from '../../../../services/projects';
import { defFormLayout } from '../../../../constants/etc';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';

const ProjectSetUp = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { projects = [] } = useSelector(getProjects);
  const { builders = [] } = useSelector(getBuilders);
  const loading = useSelector(projectsValuesLoading);
  const [projectsCount, setProjectsCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedBuilder, setSelectedBuilder] = useState(null);
  const [pageSize, setPageSize] = useState(25);
  const [pageNumber, setPageNumber] = useState(1);
  const projectsData = selectedBuilder ? projects || [] : [];
  const buildersData = builders || [];

  useEffect(() => {
    dispatch(fetchBuilders.request({ _sort: 'BuilderName' }));
  }, []);

  useEffect(() => {
    if (selectedBuilder) {
      const defFilters = {
        _limit: pageSize,
        _start: pageNumber * pageSize - pageSize,
      };
      getProjectsData(
        selectedBuilder ? { ...defFilters, 'Builder_id.id': selectedBuilder } : defFilters
      );
    } else {
      setProjectsCount(0);
    }
  }, [selectedBuilder, pageSize, pageNumber]);

  const getProjectsData = (extraFilters = {}) => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName', ...extraFilters }));
    fetchAllProjectsCountApi({ ...extraFilters })
      .then(res => setProjectsCount(res?.data || 0))
      .catch(() => {});
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'ProjectName',
      key: 'ProjectName',
      render: text => defText(text),
    },
    {
      title: 'Builder Name',
      dataIndex: 'BuilderName',
      key: 'BuilderName',
      render: (text, record) => record?.builder?.BuilderName || '-',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      align: 'center',
      render: date => (date ? moment(date).format('MM-DD-YYYY') : '-'),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: '',
      align: 'center',
      render: (text, record) => (
        <>
          <EditOutlined
            style={{ color: '#886cc0', marginRight: '15px' }}
            onClick={() => setEditData(record)}
          />
          <DeleteOutlined style={{ color: '#EF3E36' }} />
        </>
      ),
    },
  ];

  return (
    <>
      {(modalOpen || editData) && <ProjectAddModal closeModal={closeModal} editData={editData} />}
      <Row mb={15} align='middle' justify='space-between'>
        <Form
          {...defFormLayout}
          form={form}
          initialValues={{ 'Builder_id.id': '' }}
          onFinish={values => setSelectedBuilder(values['Builder_id.id'])}
        >
          <Row align='bottom' gutter={24} mb={15}>
            <Col>
              <FormItem
                name='Builder_id.id'
                label='Builder'
                mb={0}
                width='250px'
                rules={[
                  {
                    required: true,
                    message: 'Please select Builder!',
                  },
                ]}
              >
                <Select
                  placeholder='Select a builder'
                  width='250px'
                  showSearch={true}
                  allowClear={true}
                  filterOption={(value, option) =>
                    option.children.toLowerCase().includes(value.toLowerCase())
                  }
                >
                  {buildersData.map(el => (
                    <Select.Option value={el?.id} key={el?.id}>
                      {el?.BuilderName}
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
                    setSelectedBuilder(null);
                    form.resetFields();
                  }}
                />
              </Tooltip>
            </Col>
          </Row>
        </Form>
        <Button type='primary' padding='8px 25px' onClick={() => setModalOpen(true)}>
          + New Project
        </Button>
      </Row>
      <Table
        columns={columns}
        extra='pagination'
        expand_back='#fff'
        rowKey={record => record.id}
        loading={loading}
        pagination={{
          position: ['bottomRight'],
          defaultPageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: [10, 25, 50, 100],
          hideOnSinglePage: true,
          pageSize,
          current: pageNumber,
          onChange: (page, size) => {
            setPageNumber(page);
            setPageSize(size);
          },
          total: projectsCount,
          showTotal: (totals, current) => (
            <Paragraph type='secondary' fw={400} fz={16} mb={0}>
              Showing {current[0]}-{current[1]} of {projectsCount || 0}
            </Paragraph>
          ),
        }}
        dataSource={projectsData}
      />
    </>
  );
};

export default ProjectSetUp;
