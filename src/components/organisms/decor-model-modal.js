import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import ModalContent from '../molecules/ModalContent';
import { Button, Col, Form, FormItem, InputNumber, ModalWrapper, Row, Select } from '../atoms';
import { defFormLayout } from '../../constants/etc';
import { fetchDecorCategoriesApi } from '../../services/decor-categories';
import { fetchProjects } from '../../actions/projects';
import { getProjects, projectsValuesLoading } from '../../selectors/projects';
import {
  addDecorOptionsApi,
  fetchAllModelPlansApi,
  fetchAllRoomsApi,
  fetchDecorProductsApi,
  fetchFinishesApi,
  fetchUnitMeasureApi,
  fetchUpgApi,
} from '../../services/project-settings';
import { checkAllSelect, filterOption } from '../../Utils/Helpers';
import { fetchAllSubCategoriesApi } from '../../services/options-library';

const DecorModelModal = ({ closeModal, defProject, editData }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { projects } = useSelector(getProjects);
  const projectsLoading = useSelector(projectsValuesLoading);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedProject, setSelectedProject] = useState(editData?.Project_id?.id || defProject);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [modelPlans, setModelPlans] = useState([]);
  const [modelPlansLoading, setModelPlansLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [decorProducts, setDecorProducts] = useState([]);
  const [decorProductsLoading, setDecorProductsLoading] = useState(false);
  const [finishes, setFinishes] = useState([]);
  const [finishesLoading, setFinishesLoading] = useState(false);
  const [upg, setUpg] = useState([]);
  const [upgLoading, setUpgLoading] = useState(false);
  const [unitMeasures, setUnitMeasures] = useState([]);
  const [unitMeasuresLoading, setUnitMeasuresLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);
  const [addDecorOptionLoading, setAddDecorOptionLoading] = useState(false);
  const projectData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
    getDecorCategories();
    getRooms();
    getUnitMeasures();
    getUPGLevels();
    if (selectedProject && !editData) {
      form.setFieldsValue({
        Project_id: selectedProject,
      });
    }
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      form.setFieldsValue({
        SubCateg_id: null,
        Product_id: [],
        finishes: [],
      });
      setSelectedSubCategory(null);
      getSubCategories();
      // if (!selectedSubCategory) {
      //   form.setFieldsValue({ SubCateg_id: 'all' });
      // }
    }
  }, [selectedCategory]);

  useEffect(() => {
    getDecorProducts();
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    if (selectedCategory) getFinishes();
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    if (selectedProject) {
      getModelPlans();
    }
  }, [selectedProject]);

  const getDecorCategories = () => {
    setCategoriesLoading(true);
    const requestData = {
      _sort: 'Description',
    };
    fetchDecorCategoriesApi(requestData)
      .then(res => {
        setCategories(res?.data || []);
        setCategoriesLoading(false);
      })
      .catch(() => setCategoriesLoading(false));
  };

  const getUPGLevels = () => {
    setUpgLoading(true);
    fetchUpgApi({ Inactive: false, _sort: 'value' })
      .then(res => {
        setUpg(res?.data || []);
        setUpgLoading(false);
      })
      .catch(() => setUpgLoading(false));
  };

  const getModelPlans = () => {
    setModelPlansLoading(true);
    fetchAllModelPlansApi({
      'Project_id.id': selectedProject,
      _sort: 'ModelCode',
    })
      .then(res => {
        setModelPlans(
          res?.data?.length
            ? [{ id: 'any', ModelName: 'ANY' }, { id: 'all', ModelName: 'ALL' }, ...res?.data]
            : []
        );
        setModelPlansLoading(false);
      })
      .catch(() => setModelPlansLoading(false));
  };

  const getRooms = () => {
    setRoomsLoading(true);
    fetchAllRoomsApi({ Inactive: false, _sort: 'Description' })
      .then(res => {
        setRooms(
          res?.data
            ? [{ id: 'any', Description: 'ANY' }, { id: 'all', Description: 'ALL' }, ...res?.data]
            : []
        );
        setRoomsLoading(false);
      })
      .catch(() => setRoomsLoading(false));
  };

  const getDecorProducts = () => {
    setDecorProductsLoading(true);
    const requestData = {
      'Category_Id.id': selectedCategory,
      Inactive: false,
      _sort: 'Description',
    };
    if (selectedSubCategory && selectedSubCategory !== 'all') {
      requestData['SubCateg_id.id'] = selectedSubCategory;
    }
    fetchDecorProductsApi(requestData)
      .then(res => {
        setDecorProducts(
          res?.data?.length ? [{ id: 'all', Description: 'All' }, ...res?.data] : []
        );
        setDecorProductsLoading(false);
      })
      .catch(() => setDecorProductsLoading(false));
  };

  const getFinishes = () => {
    setFinishesLoading(true);
    const requestData = {
      Inactive: false,
      'Category_id.id': selectedCategory,
      _sort: 'Description',
    };

    if (selectedSubCategory && selectedSubCategory !== 'all') {
      requestData['SubCateg_id.id'] = selectedSubCategory;
    }
    fetchFinishesApi(requestData)
      .then(res => {
        setFinishes(res?.data?.length ? [{ id: 'all', Description: 'All' }, ...res?.data] : []);
        setFinishesLoading(false);
      })
      .catch(() => setFinishesLoading(false));
  };

  const getUnitMeasures = () => {
    setUnitMeasuresLoading(true);
    fetchUnitMeasureApi({ Inactive: false, _sort: 'value' })
      .then(res => {
        setUnitMeasures(res?.data || []);
        setUnitMeasuresLoading(false);
      })
      .catch(() => setUnitMeasuresLoading(false));
  };

  const getSubCategories = () => {
    setSubCategoriesLoading(true);
    fetchAllSubCategoriesApi({
      Inactive: false,
      _sort: 'Description',
      'Category_id.id': selectedCategory,
    })
      .then(res => {
        setSubCategories(
          res?.data?.length ? [{ id: 'all', Description: 'All' }, ...res?.data] : []
        );
        setSubCategoriesLoading(false);
      })
      .catch(() => setSubCategoriesLoading(false));
  };

  const changeProject = value => {
    setSelectedProject(value);
    form.setFieldsValue({ pjModel_id: [] });
  };

  const submitForm = values => {
    const pushData = {
      ...values,
      pjModel_id: values?.pjModel_id || ['any'],
      Room_id: values?.Room_id || ['any'],
    };
    setAddDecorOptionLoading(true);
    addDecorOptionsApi(pushData)
      .then(() => {
        setAddDecorOptionLoading(false);
        closeModal();
      })
      .catch(() => setAddDecorOptionLoading(false));
  };

  return (
    <ModalWrapper closeModal={closeModal}>
      <ModalContent title={'Upgrade Matrix'} closeModal={closeModal} customMaxWidth='580px'>
        <Row padding='0px 30px 15px'>
          <Form
            form={form}
            {...defFormLayout}
            onFinish={submitForm}
            // initialValues={{ pjModel_id: ['any'], Room_id: ['any'] }}
          >
            <Row gutter={24}>
              <Col span={24}>
                <Spin spinning={projectsLoading}>
                  <FormItem
                    name='Project_id'
                    label='Project'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Project!',
                      },
                    ]}
                  >
                    <Select showSearch={true} filterOption={filterOption} onChange={changeProject}>
                      {projectData.map(el => (
                        <Select.Option value={el?.id} key={el?.id}>
                          {el?.ProjectName}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={12}>
                <Spin spinning={categoriesLoading}>
                  <FormItem
                    name='Category_Id'
                    label='Category'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Category!',
                      },
                    ]}
                  >
                    <Select
                      onChange={setSelectedCategory}
                      showSearch={true}
                      filterOption={filterOption}
                    >
                      {categories.map(el => (
                        <Select.Option value={el?.id} key={el?.id}>
                          {el?.Description}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={12}>
                <Spin spinning={subCategoriesLoading}>
                  <FormItem name='SubCateg_id' label='Sub-Category'>
                    <Select
                      onChange={setSelectedSubCategory}
                      showSearch={true}
                      filterOption={filterOption}
                    >
                      {subCategories.map(el => (
                        <Select.Option value={el?.id} key={el?.id}>
                          {el?.Description}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={12}>
                <Spin spinning={modelPlansLoading}>
                  <FormItem name='pjModel_id' label='Model(s)'>
                    <Select
                      mode='multiple'
                      allowClear={true}
                      maxTagCount='responsive'
                      filterOption={filterOption}
                      onChange={values => checkAllSelect(values, 'pjModel_id', form)}
                    >
                      {modelPlans.map(el => (
                        <Select.Option value={el.id} key={el.id}>
                          {el?.ModelName}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={12}>
                <Spin spinning={roomsLoading}>
                  <FormItem name='Room_id' label='Room(s)'>
                    <Select
                      mode='multiple'
                      allowClear={true}
                      maxTagCount='responsive'
                      filterOption={filterOption}
                      onChange={values => checkAllSelect(values, 'Room_id', form)}
                    >
                      {rooms.map(el => (
                        <Select.Option value={el.id} key={el.id}>
                          {el?.Description}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={24}>
                <Spin spinning={decorProductsLoading}>
                  <FormItem
                    name='Product_id'
                    label='Decor Product(s)'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Decor Product(s)!',
                      },
                    ]}
                  >
                    <Select
                      mode='multiple'
                      allowClear={true}
                      maxTagCount='responsive'
                      filterOption={filterOption}
                      onChange={values => checkAllSelect(values, 'Product_id', form)}
                    >
                      {decorProducts.map(el => (
                        <Select.Option value={el.id} key={el.id}>
                          {el?.Description}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={8}>
                <Spin spinning={upgLoading}>
                  <FormItem
                    name='OPTLevel'
                    label='UPG Level'
                    rules={[
                      {
                        required: true,
                        message: 'Please select UPG Level!',
                      },
                    ]}
                  >
                    <Select
                      mode='multiple'
                      allowClear={true}
                      maxTagCount='responsive'
                      filterOption={filterOption}
                      onChange={values => checkAllSelect(values, 'OPTLevel', form)}
                    >
                      {upg.map(el => (
                        <Select.Option value={el.id} key={el.id}>
                          {el?.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={16}>
                <Spin spinning={finishesLoading}>
                  <FormItem name='finishes' label='Finish(es)'>
                    <Select
                      mode='multiple'
                      allowClear={true}
                      maxTagCount='responsive'
                      filterOption={filterOption}
                    >
                      {finishes.map(el => (
                        <Select.Option value={el.id} key={el.id}>
                          {el?.Description}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={8}>
                <Spin spinning={unitMeasuresLoading}>
                  <FormItem name='UOM' label='UoM'>
                    <Select showSearch={true} filterOption={filterOption}>
                      {unitMeasures.map(el => (
                        <Select.Option value={el.code} key={el.id}>
                          {el.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={6}>
                <FormItem name='Qty' label='Qty'>
                  <InputNumber min={0} width='100%' hide='controls' />
                </FormItem>
              </Col>
              <Col span={10}>
                <FormItem name='UnitPrice' label='Unit Price'>
                  <InputNumber
                    min={0}
                    width='100%'
                    hide='controls'
                    type='number'
                    precision={2}
                    step={1}
                    onFocus={e => e.target.select()}
                    // formatter={text => Number(text).toFixed(2)}
                  />
                </FormItem>
              </Col>
              <Col span={24} justify='end' margin='15px 0 0 0'>
                <FormItem>
                  <Button
                    type='primary'
                    onClick={() => form.submit()}
                    loading={addDecorOptionLoading}
                  >
                    Load Upgrade Matrix
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Row>
      </ModalContent>
    </ModalWrapper>
  );
};

export default DecorModelModal;
