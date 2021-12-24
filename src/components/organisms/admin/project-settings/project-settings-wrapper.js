import React, { useEffect, useState } from 'react';
import { Space, Spin } from 'antd';
import { SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import DecorModelModal from '../../decor-model-modal';
import { Button, Col, Input, Paragraph, Row, Select, Table } from '../../../atoms';
import { getProjects, projectsValuesLoading } from '../../../../selectors/projects';
import { fetchProjects } from '../../../../actions/projects';
import { sortDirectionKeys } from '../../../../constants/etc';

const ProjectSettingsWrapper = ({
  columns,
  dataSource,
  dataSourceCount,
  loading,
  getDataReq,
  addButtonText,
  customHeadFilters,
  customSelectedProject,
  extraFilterData,
  pageName,
  resetPagination,
  setResetPagination,
  tableExtraProps = {},
}) => {
  const dispatch = useDispatch();
  const [selectedProject, setSelectedProject] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [pageSize, setPageSize] = useState(25);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortColumn, setSortColumn] = useState('');
  const { projects } = useSelector(getProjects);
  const projectsLoading = useSelector(projectsValuesLoading);
  const projectData = projects || [];

  const activeProject = selectedProject || customSelectedProject;

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
  }, []);
  useEffect(() => {
    if (resetPagination) {
      setPageSize(25);
      setPageNumber(1);
      setResetPagination(false);
    }
  }, [resetPagination]);

  useEffect(() => {
    if (activeProject || customHeadFilters) {
      const extraData = {
        _limit: pageSize,
        _start: pageNumber * pageSize - pageSize,
      };
      if (searchText) {
        extraData[`${searchedColumn || ''}_contains`] = searchText || '';
      }
      if (sortColumn) {
        // eslint-disable-next-line no-underscore-dangle
        extraData._sort = `${sortColumn}:${sortDirection}`;
      }
      getDataReq(activeProject, extraData);
    }
  }, [activeProject, searchText, sortColumn, sortDirection, pageSize, pageNumber]);

  const getColumnSearchProps = (filterKey, sortKey) => {
    if (!extraFilterData['Project_id.id']) return {};
    const searchData = {
      sorter: !!sortKey,
    };

    return filterKey
      ? {
          ...searchData,
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
              <Input
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, filterKey)}
                style={{ marginBottom: 8, display: 'block' }}
              />
              <Space>
                <Button
                  type='primary'
                  onClick={() => handleSearch(selectedKeys, confirm, filterKey)}
                  icon={<SearchOutlined />}
                  size='small'
                  width='120px'
                >
                  Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size='small' width='120px'>
                  Reset
                </Button>
              </Space>
            </div>
          ),
          filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : '' }} />,
          onFilter: (value, record) =>
            record[filterKey]
              ? record[filterKey].toString().toLowerCase().includes(value.toLowerCase())
              : '',
        }
      : searchData;
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
    setSearchedColumn('');
  };

  const handleSort = sortData => {
    setSortColumn(sortData?.column?.key || '');
    setSortDirection(sortDirectionKeys[sortData?.order] || '');
  };

  const closeModal = () => {
    setModalOpen(false);
    getDataReq(activeProject, searchedColumn, searchText);
  };

  const convertedColumns = columns.map(el => ({
    ...el,
    ...getColumnSearchProps(el?.filterKey, el?.sortKey),
  }));

  const pageModals = (currentPage, closeFunc, defProject) =>
    ({
      decorOptions: <DecorModelModal closeModal={closeFunc} defProject={defProject} />,
      floorPremiums: '',
      modelPlans: '',
      deposits: '',
      incentives: '',
      parkingLocker: '',
      premiums: '',
      unitsSuites: '',
    }[currentPage] || '');

  return (
    <>
      {modalOpen && pageModals(pageName, closeModal, activeProject)}
      <Spin spinning={projectsLoading}>
        <Row mb={15}>
          {customHeadFilters || (
            <Col span={19}>
              <Col span={24}>
                <Row align='bottom'>
                  <Col span={12}>
                    <Col span={24}>
                      <Select
                        placeholder='Select a project'
                        width='300px'
                        showSearch={true}
                        onChange={setSelectedProject}
                        filterOption={(value, option) =>
                          option.children.toLowerCase().includes(value.toLowerCase())
                        }
                      >
                        {projectData.map(el => (
                          <Select.Option value={el?.id} key={el?.id}>
                            {el?.ProjectName}
                          </Select.Option>
                        ))}
                      </Select>
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Col>
          )}
          {addButtonText && (
            <Col xxl={3} span={24} justify='end' align='end'>
              <Button
                icon={<UploadOutlined />}
                type='primary'
                onClick={() => setModalOpen(true)}
                disabled={!activeProject}
              >
                {addButtonText}
              </Button>
            </Col>
          )}
        </Row>
      </Spin>
      <Table
        columns={convertedColumns}
        extra='pagination'
        onChange={(a, b, sortData) => handleSort(sortData)}
        expand_back='#fff'
        rowKey={record => record.id}
        loading={loading}
        cell_padding='5px 10px'
        pagination={{
          position: ['bottomRight'],
          defaultPageSize: 25,
          showSizeChanger: true,
          pageSizeOptions: [25, 50, 100],
          pageSize,
          current: pageNumber,
          onChange: (page, size) => {
            setPageNumber(page);
            setPageSize(size);
          },
          total: dataSourceCount,
          showTotal: (totals, current) => (
            <Paragraph type='secondary' fw={400} fz={16} mb={0}>
              Showing {current[0]}-{current[1]} of {dataSourceCount || 0}
            </Paragraph>
          ),
        }}
        dataSource={dataSource}
        {...tableExtraProps}
      />
    </>
  );
};

export default ProjectSettingsWrapper;
