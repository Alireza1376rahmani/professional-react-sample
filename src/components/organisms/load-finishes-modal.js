import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, FormItem, ModalWrapper, Row, Select } from '../atoms';
import ModalContent from '../molecules/ModalContent';
import { defFormLayout } from '../../constants/etc';
import { checkAllSelect, filterOption } from '../../Utils/Helpers';
import { fetchProjects } from '../../actions/projects';
import { getProjects, projectsValuesLoading } from '../../selectors/projects';
import { fetchDecorCategoriesApi } from '../../services/decor-categories';
import { fetchAllSubCategoriesApi, fetchAllSuppliersApi } from '../../services/options-library';
import {
  addProjectFinishesApi,
  fetchDecorProductsApi,
  fetchFinishesApi,
  fetchUpgApi,
} from '../../services/project-settings';

const LoadFinishesModal = ({
  closeModal,
  defProject = '',
  defCategory = '',
  defSubCategory = '',
  defSupplier = '',
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoriesLoading, setSubCategoriesLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [suppliersLoading, setSuppliersLoading] = useState(false);
  const [decorProducts, setDecorProducts] = useState([]);
  const [decorProductsLoading, setDecorProductsLoading] = useState(false);
  const [upg, setUpg] = useState([]);
  const [upgLoading, setUpgLoading] = useState(false);
  const [finishes, setFinishes] = useState([]);
  const [finishesLoading, setFinishesLoading] = useState(false);
  const [addDecorOptionLoading, setAddDecorOptionLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(defCategory || '');
  const [selectedSubCategory, setSelectedSubCategory] = useState(defSubCategory || '');
  const [selectedSupplier, setSelectedSupplier] = useState(defSupplier || '');

  const { projects } = useSelector(getProjects);
  const projectsLoading = useSelector(projectsValuesLoading);
  const projectData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
    getDecorCategories();
    getSuppliers();
    getUPGLevels();
  }, []);

  useEffect(() => {
    const category = selectedCategory ? { 'Category_id.id': selectedCategory } : {};
    // form.setFieldsValue({ SubCateg_id: '' });
    getSubCategories(category);
  }, [selectedCategory]);

  useEffect(() => {
    form.setFieldsValue({ Product_id: ['any'] });
    if (selectedCategory && selectedSubCategory) {
      getDecorProducts({
        'Category_Id.id': selectedCategory,
        'SubCateg_id.id': selectedSubCategory,
      });
    } else {
      setDecorProducts([]);
    }
  }, [selectedCategory, selectedSubCategory]);

  useEffect(() => {
    form.setFieldsValue({ Product_id: ['any'] });
    if (selectedCategory && selectedSubCategory && selectedSupplier) {
      getFinishes({
        'Category_id.id': selectedCategory,
        'SubCateg_id.id': selectedSubCategory,
        'Supplier_id.id': selectedSupplier,
      });
    } else {
      setDecorProducts([]);
    }
  }, [selectedCategory, selectedSubCategory, selectedSupplier]);

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

  const getSubCategories = (params = {}) => {
    setSubCategoriesLoading(true);
    fetchAllSubCategoriesApi({ _sort: 'Description', ...params })
      .then(res => {
        setSubCategoriesLoading(false);
        setSubCategories(res?.data || []);
      })
      .catch(() => setSubCategoriesLoading(false));
  };

  const getSuppliers = () => {
    setSuppliersLoading(true);
    fetchAllSuppliersApi({ _sort: 'SuppName' })
      .then(res => {
        setSuppliersLoading(false);
        setSuppliers(res?.data || []);
      })
      .catch(() => setSuppliersLoading(false));
  };

  const getDecorProducts = params => {
    setDecorProductsLoading(true);
    fetchDecorProductsApi({
      Inactive: false,
      _sort: 'Description',
      ...params,
    })
      .then(res => {
        setDecorProducts(
          res?.data?.length ? [{ id: 'all', Description: 'All' }, ...res?.data] : []
        );
        setDecorProductsLoading(false);
      })
      .catch(() => setDecorProductsLoading(false));
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

  const getFinishes = params => {
    setFinishesLoading(true);
    fetchFinishesApi({
      Inactive: false,
      _sort: 'Description',
      ...params,
    })
      .then(res => {
        setFinishes(res?.data || []);
        setFinishesLoading(false);
      })
      .catch(() => setFinishesLoading(false));
  };

  const submitForm = values => {
    const pushData = {
      ...values,
      Product_id: values?.Product_id || ['any'],
    };
    setAddDecorOptionLoading(true);
    addProjectFinishesApi(pushData)
      .then(() => {
        setAddDecorOptionLoading(false);
        closeModal();
      })
      .catch(() => setAddDecorOptionLoading(false));
  };

  return (
    <ModalWrapper closeModal={closeModal}>
      <ModalContent title='Upgrade Finishe(s)' closeModal={closeModal} customMaxWidth='580px'>
        <Row padding='0px 30px 15px'>
          <Form form={form} {...defFormLayout} onFinish={submitForm}>
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
                    initialValue={defProject}
                  >
                    <Select showSearch={true} filterOption={filterOption}>
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
                    name='Category_id'
                    label='Category'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Category!',
                      },
                    ]}
                    initialValue={defCategory}
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
                  <FormItem
                    name='SubCateg_id'
                    label='Sub-Category'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Sub-Category!',
                      },
                    ]}
                    initialValue={defSubCategory}
                  >
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
                <Spin spinning={suppliersLoading}>
                  <FormItem
                    name='Supplier_id'
                    label='Supplier'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Supplier!',
                      },
                    ]}
                    initialValue={defSupplier}
                  >
                    <Select
                      showSearch={true}
                      filterOption={filterOption}
                      onChange={setSelectedSupplier}
                    >
                      {suppliers.map(el => (
                        <Select.Option value={el.id} key={el.id}>
                          {el?.SuppName}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={12}>
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
                    <Select showSearch={true} filterOption={filterOption}>
                      {upg.map(el => (
                        <Select.Option value={el.id} key={el.id}>
                          {el?.value}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={24}>
                <Spin spinning={decorProductsLoading}>
                  <FormItem name='Product_id' label='Decor Product(s)'>
                    <Select
                      mode='multiple'
                      allowClear={true}
                      maxTagCount='responsive'
                      filterOption={filterOption}
                      onChange={values => checkAllSelect(values, 'Product_id', form)}
                    >
                      {[{ id: 'any', Description: 'ANY' }, ...decorProducts].map(el => (
                        <Select.Option value={el.id} key={el.id}>
                          {el?.Description}
                        </Select.Option>
                      ))}
                    </Select>
                  </FormItem>
                </Spin>
              </Col>
              <Col span={24}>
                <Spin spinning={finishesLoading}>
                  <FormItem
                    name='finishes'
                    label='Finish(es)'
                    rules={[
                      {
                        required: true,
                        message: 'Please select Finish(es)!',
                      },
                    ]}
                  >
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
              <Col span={12}>
                {/* <Spin spinning={modelPlansLoading}> */}
                <FormItem label='Model(s)'>
                  <Select
                    mode='multiple'
                    allowClear={true}
                    maxTagCount='responsive'
                    filterOption={filterOption}
                    disabled={true}
                    back_color='#e1e1e13d'
                    // onChange={values => checkAllSelect(values, 'pjModel_id')}
                  >
                    {[].map(el => (
                      <Select.Option value={el.id} key={el.id}>
                        {el?.ModelName}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
                {/* </Spin> */}
              </Col>
              <Col span={12}>
                {/* <Spin spinning={roomsLoading}> */}
                <FormItem label='Room(s)'>
                  <Select
                    mode='multiple'
                    allowClear={true}
                    maxTagCount='responsive'
                    filterOption={filterOption}
                    disabled={true}
                    back_color='#e1e1e13d'
                    // onChange={values => checkAllSelect(values, 'Room_id')}
                  >
                    {[].map(el => (
                      <Select.Option value={el.id} key={el.id}>
                        {el?.Description}
                      </Select.Option>
                    ))}
                  </Select>
                </FormItem>
                {/* </Spin> */}
              </Col>
              <Col span={24} justify='end' margin='15px 0 0 0'>
                <FormItem>
                  <Button
                    type='primary'
                    onClick={() => form.submit()}
                    loading={addDecorOptionLoading}
                  >
                    Load Upgrade Finishe(s)
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

export default LoadFinishesModal;
