import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteDecorOptionsApi,
  fetchAllDecorOptionsApi,
  fetchAllDecorOptionsCountApi,
  fetchAllModelPlansApi,
  fetchAllRoomsApi,
  fetchModelRooms,
  fetchUpgApi,
  updateDecorOptionsApi,
} from '../../../../services/project-settings';
import { defText } from '../user-list-wrapper';
import {
  Button,
  Col,
  Form,
  FormItem,
  InputNumber,
  Modal,
  Row,
  Select,
  Tooltip,
} from '../../../atoms';
import { defFormLayout } from '../../../../constants/etc';
import { getProjects, projectsValuesLoading } from '../../../../selectors/projects';
import { fetchProjects } from '../../../../actions/projects';
import { fetchDecorCategoriesApi } from '../../../../services/decor-categories';
import ClearFilterIcon from '../../../../assets/images/custom-icons/ClearFilterIcon';
import ApplyFilterIcon from '../../../../assets/images/custom-icons/ApplyFilterIcon';
import { filterOption } from '../../../../Utils/Helpers';
import { fetchAllSubCategoriesApi } from '../../../../services/options-library';
import TableWrapper from '../../table-wrapper';
import DecorModelModal from '../../decor-model-modal';

const { confirm } = Modal;

const DecorModelOptions = () => {
  const dispatch = useDispatch();
  const [decorOptions, setDecorOptions] = useState([]);
  const [decorOptionsCount, setDecorOptionsCount] = useState(0);
  const [decorOptionsLoading, setDecorOptionsLoading] = useState(false);
  const [modelPlans, setModelPlans] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [modelRooms, setModelRooms] = useState([]);
  const [modelRoomsLoading, setModelRoomsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [upg, setUpg] = useState([]);
  const [filterData, setFiltersData] = useState({});
  const [filterDataLoading, setFilterDataLoading] = useState(false);
  const [extraFormRef] = Form.useForm();
  const [selectedProject, setSelectedProject] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [editRowData, setEditRowData] = useState(null);
  const [triggerRequest, setTriggerRequest] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { projects } = useSelector(getProjects);
  const projectsLoading = useSelector(projectsValuesLoading);
  const projectData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
    getDecorCategories();
    getRooms();
    getUPGLevels();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      getModelPlans();
    }
  }, [selectedProject]);

  useEffect(() => {
    const category = selectedCategory ? { 'Category_id.id': selectedCategory } : {};
    extraFormRef.setFieldsValue({ 'SubCateg_id.id': '' });
    getSubCategories(category);
  }, [selectedCategory]);

  useEffect(() => {
    if (editRowData?.key === 'Room_id') {
      const modelData = editRowData?.record?.pjModel_id?.id
        ? { modelId: editRowData?.record?.pjModel_id?.id }
        : {};
      getModelRooms(modelData);
    }
  }, [editRowData]);

  const getDecorOptions = params => {
    if (params['Project_id.id']) {
      setTriggerRequest(false);
      setDecorOptionsLoading(true);
      const requestData = {
        _sort: 'category_id.Description',
        ...params,
      };
      fetchAllDecorOptionsApi(requestData)
        .then(res => {
          setDecorOptionsLoading(false);
          setDecorOptions(res?.data || []);
        })
        .catch(() => setDecorOptionsLoading(false));
      fetchAllDecorOptionsCountApi(requestData)
        .then(res => {
          setDecorOptionsCount(res?.data || 0);
        })
        .catch(() => {});
    } else {
      setDecorOptions([]);
      setDecorOptionsCount(0);
    }
  };

  const getModelRooms = params => {
    setModelRoomsLoading(true);
    fetchModelRooms(params)
      .then(res => {
        setModelRooms(res?.data?.rooms || []);
        setModelRoomsLoading(false);
      })
      .catch(() => setModelRoomsLoading(false));
  };

  const showDeleteConfirm = data => {
    confirm({
      title: 'Do you want to remove this model option?',
      icon: <ExclamationCircleOutlined style={{ color: '#EF3E36' }} />,
      maskClosable: true,
      cancelText: 'No',
      okText: 'Yes',
      className: 'modal_container',
      onOk() {
        return deleteDecorOptionsApi({
          id: data.id,
        }).then(() => setTriggerRequest(true));
      },
      onCancel() {},
    });
  };

  const getModelPlans = () => {
    setFilterDataLoading(true);
    fetchAllModelPlansApi({
      'Project_id.id': selectedProject,
      _sort: 'ModelCode',
    })
      .then(res => {
        setModelPlans(res?.data || []);
        setFilterDataLoading(false);
      })
      .catch(() => setFilterDataLoading(false));
  };

  const getRooms = () => {
    setFilterDataLoading(true);
    fetchAllRoomsApi({ Inactive: false, _sort: 'Description' })
      .then(res => {
        setRooms(res?.data || []);
        setFilterDataLoading(false);
      })
      .catch(() => setFilterDataLoading(false));
  };

  const getDecorCategories = () => {
    setFilterDataLoading(true);
    const requestData = {
      _sort: 'Description',
    };

    fetchDecorCategoriesApi(requestData)
      .then(res => {
        setCategories(res?.data || []);
        setFilterDataLoading(false);
      })
      .catch(() => setFilterDataLoading(false));
  };

  const getSubCategories = (params = {}) => {
    setFilterDataLoading(true);
    fetchAllSubCategoriesApi({ _sort: 'Description', ...params })
      .then(res => {
        setFilterDataLoading(false);
        setSubCategories(res?.data || []);
      })
      .catch(() => setFilterDataLoading(false));
  };

  const getUPGLevels = () => {
    setFilterDataLoading(true);
    fetchUpgApi({ Inactive: false, _sort: 'value' })
      .then(res => {
        setUpg(res?.data || []);
        setFilterDataLoading(false);
      })
      .catch(() => setFilterDataLoading(false));
  };

  const clearExtraFields = () => {
    extraFormRef.resetFields();
    setSelectedProject(null);
    setFiltersData({
      'Project_id.id': '',
      'category_id.id': '',
      'SubCateg_id.id': '',
      'pjModel_id.id': '',
      'Room_id.id': '',
      OPTLevel: '',
    });
  };

  const checkEdit = (record, defComp, defaultValue, key) => {
    if (record.id === editRowData?.id && key === editRowData?.key) {
      const editFields = {
        UnitPrice: (
          <InputNumber
            width='100px'
            autoFocus={true}
            height='30px'
            hide='controls'
            type='number'
            precision={2}
            step={0}
            min={0}
            onFocus={e => e.target.select()}
            defaultValue={defaultValue}
            onBlur={e => updateDecorOption(record.id, 'UnitPrice', e.target.value)}
            onPressEnter={e => updateDecorOption(record.id, 'UnitPrice', e.target.value)}
            onKeyDown={cancelInlineEdit}
          />
        ),
        Room_id: (
          <Spin spinning={modelRoomsLoading}>
            <Select
              autoFocus={true}
              allowClear={true}
              defaultValue={defaultValue}
              onChange={value => updateDecorOption(record.id, 'Room_id', value)}
              onKeyDown={cancelInlineEdit}
            >
              {modelRooms.map(el => (
                <Select.Option value={el.id} key={el.id}>
                  {el.Description}
                </Select.Option>
              ))}
            </Select>
          </Spin>
        ),
      };
      return editFields[key];
    }
    return defComp;
  };

  const handleRowEdit = (key, record) => {
    setEditRowData({ key, id: record.id, record });
  };

  const cancelInlineEdit = event => {
    if (event.keyCode === 27 && editRowData) {
      setEditRowData(null);
    }
  };

  const updateDecorOption = (recordId, key, value) => {
    setDecorOptionsLoading(true);
    updateDecorOptionsApi({ id: recordId, values: { [key]: value || null } })
      .then(res => {
        setDecorOptionsLoading(false);
        const decorOptionsCopy = [...decorOptions];
        decorOptionsCopy.splice(
          decorOptionsCopy.findIndex(el => el.id === res?.data?.id),
          1,
          res?.data
        );
        setDecorOptions(decorOptionsCopy);
        setEditRowData(null);
      })
      .catch(() => {
        setDecorOptionsLoading(false);
        setEditRowData(null);
      });
  };

  const closeModal = () => {
    setModalOpen(false);
    setTriggerRequest(true);
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category_id',
      key: 'category_id',
      sorter: true,
      sortKey: 'category_id.Description',
      width: 180,
      render: item => defText(item?.Description, 'left'),
    },
    {
      title: 'Sub-Category',
      dataIndex: 'SubCateg_id',
      key: 'SubCateg_id',
      sorter: true,
      sortKey: 'SubCateg_id.Description',
      width: 250,
      render: item => defText(item?.Description, 'left'),
    },
    {
      title: 'Model',
      dataIndex: 'pjModel_id',
      key: 'pjModel_id',
      sorter: true,
      sortKey: 'pjModel_id.ModelCode',
      width: 150,
      render: item => defText(item?.ModelCode, 'left'),
    },
    {
      title: 'Room',
      dataIndex: 'Room_id',
      key: 'Room_id',
      sorter: true,
      sortKey: 'Room_id.Description',
      width: 200,
      render: (text, data) =>
        checkEdit(
          data,
          defText(text?.Description, 'left', false, {
            onClick: () => {
              handleRowEdit('Room_id', data);
            },
          }),
          data?.Room_id?.id,
          'Room_id'
        ),
    },
    {
      title: 'Option Description',
      dataIndex: 'Product_id',
      key: 'Product_id',
      sorter: true,
      sortKey: 'Product_id.Description',
      render: item => (
        <Tooltip placement='top' title={item?.Description}>
          <div>
            {defText(item?.Description, 'left', false, {
              max_width: '350px',
              text_overflow: 'ellipsis',
            })}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Level',
      dataIndex: 'OptType_id',
      key: 'OptType_id',
      sorter: true,
      sortKey: 'OPTLevel',
      width: 100,
      render: text => defText(text?.value, 'center'),
    },
    {
      title: 'Finish(es)',
      dataIndex: 'finishes',
      key: 'finishes',
      sorter: true,
      sortKey: 'finishes',
      width: 150,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Qty',
      dataIndex: 'Qty',
      key: 'Qty',
      width: 120,
      render: text => defText(text, 'right', { onlyLocale: true }),
    },
    {
      title: 'UoM',
      dataIndex: 'UOM',
      key: 'UOM',
      width: 120,
      render: text => defText(text, 'left'),
    },
    {
      title: 'Unit Price',
      dataIndex: 'UnitPrice',
      key: 'UnitPrice',
      width: 140,
      render: (text, data) =>
        checkEdit(
          data,
          defText(text, 'right', true, {
            onClick: () => {
              handleRowEdit('UnitPrice', data);
            },
          }),
          text,
          'UnitPrice'
        ),
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: '',
      align: 'center',
      width: 50,
      render: (text, record) =>
        editRowData?.id === record.id ? (
          <></>
        ) : (
          <>
            <DeleteOutlined
              style={{ color: '#EF3E36' }}
              onClick={() => showDeleteConfirm(record)}
            />
          </>
        ),
    },
  ];

  const filterContent = (
    <Row mb={15}>
      <Col xxl={21} span={24} mb={15} xxl_mb={0}>
        <Spin spinning={projectsLoading || filterDataLoading}>
          <Col span={24}>
            <Row align='bottom' gutter={12}>
              <Col>
                <Form
                  form={extraFormRef}
                  {...defFormLayout}
                  onFinish={setFiltersData}
                  initialValues={{
                    'category_id.id': '',
                    'SubCateg_id.id': '',
                    'pjModel_id.id': '',
                    'Room_id.id': '',
                    OPTLevel: '',
                  }}
                >
                  <Row gutter={12} align='bottom'>
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
                        <Select
                          placeholder='Select a project'
                          showSearch={true}
                          onChange={setSelectedProject}
                          filterOption={(value, option) =>
                            option.children.toLowerCase().includes(value.toLowerCase())
                          }
                          width='250px'
                        >
                          {projectData.map(el => (
                            <Select.Option value={el?.id} key={el?.id}>
                              {el?.ProjectName}
                            </Select.Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col>
                      <FormItem name='category_id.id' label='Category' mb={0} width='200px'>
                        <Select width='200px' onChange={setSelectedCategory}>
                          {[{ id: '', Description: 'All' }, ...categories].map(el => (
                            <Select.Option value={el?.id} key={el?.id}>
                              {el?.Description}
                            </Select.Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col>
                      <FormItem name='SubCateg_id.id' label='Sub-Category' width='200px' mb={0}>
                        <Select showSearch={true} filterOption={filterOption} width='200px'>
                          {[{ id: '', Description: 'All' }, ...subCategories].map(el => (
                            <Select.Option value={el?.id} key={el?.id}>
                              {el?.Description}
                            </Select.Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col>
                      <FormItem name='pjModel_id.id' label='Model' mb={0} width='200px'>
                        <Select width='200px'>
                          {[{ id: '', ModelName: 'All' }, ...modelPlans].map(el => (
                            <Select.Option value={el.id} key={el.id}>
                              {el?.ModelName}
                            </Select.Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col>
                      <FormItem name='Room_id.id' label='Room' mb={0} width='200px'>
                        <Select width='200px'>
                          {[{ id: '', Description: 'All' }, ...rooms].map(el => (
                            <Select.Option value={el.id} key={el.id}>
                              {el?.Description}
                            </Select.Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col>
                      <FormItem name='OPTLevel' label='Level' mb={0} width='150px'>
                        <Select width='150px'>
                          {[{ id: '', code: '', value: 'All' }, ...upg].map(el => (
                            <Select.Option value={el.code} key={el.id}>
                              {el?.code || el?.value}
                            </Select.Option>
                          ))}
                        </Select>
                      </FormItem>
                    </Col>
                    <Col align='center' height='40px'>
                      <Tooltip placement='top' title='Apply Filters'>
                        <ApplyFilterIcon
                          className='filter_icon apply'
                          onClick={() => extraFormRef.submit()}
                          style={{ margin: '3px 15px 0 0' }}
                        />
                      </Tooltip>
                      <Tooltip placement='top' title='Clear Filters'>
                        <ClearFilterIcon className='filter_icon clear' onClick={clearExtraFields} />
                      </Tooltip>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Col>
        </Spin>
      </Col>
      <Col xxl={3} span={24} justify='end' align='end'>
        <Button
          icon={<UploadOutlined />}
          type='primary'
          onClick={() => setModalOpen(true)}
          disabled={!filterData[['Project_id.id']]}
        >
          Load Upgrade(s)
        </Button>
      </Col>
    </Row>
  );

  return (
    <>
      {modalOpen && (
        <DecorModelModal closeModal={closeModal} defProject={filterData[['Project_id.id']]} />
      )}
      <TableWrapper
        dataSource={decorOptions}
        columns={columns}
        loading={decorOptionsLoading}
        total={decorOptionsCount}
        filterContent={filterContent}
        filterData={filterData}
        getTableData={getDecorOptions}
        triggerRequest={triggerRequest}
      />
    </>
  );
};
export default DecorModelOptions;
