import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserListWrapper, { defText } from '../../../../components/organisms/admin/user-list-wrapper';
import { checkExistIcon } from '../../../../Utils/Helpers';
import { Col, FormItem, RangePicker, Select } from '../../../../components/atoms';
import { getProjects, projectsValuesLoading } from '../../../../selectors/projects';
import { fetchProjects } from '../../../../actions/projects';
import {
  fetchAllModelPlansApi,
  fetchAllocationTypes,
  fetchSalesSources,
} from '../../../../services/project-settings';
import { fetchUnitExposure } from '../../../../services/units';
import { convertExpoUnitData } from '../../../../components/molecules/AllocAddFirstStep';
import { fetchAllocationRequests } from '../../../../actions/allocation-requests';

const PurchasersPage = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector(getProjects);
  const [modelPlans, setModelPlans] = useState([]);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [unitTypes, setUnitTypes] = useState([]);
  const [allocationTypes, setAllocationTypes] = useState([]);
  const [salesSources, setSalesSources] = useState([]);
  const projectData = projects || [];
  const projectsLoading = useSelector(projectsValuesLoading);

  useEffect(() => {
    dispatch(fetchProjects.request({ _sort: 'ProjectName' }));
    dispatch(fetchAllocationRequests.request());
    getModelPlans();
    getUnitType();
    getAllocationTypes();
    getSalesSources();
  }, []);

  const getModelPlans = () => {
    setFiltersLoading(true);
    fetchAllModelPlansApi({
      // 'Project_id.id': selectedProject,
      _sort: 'ModelCode',
    })
      .then(res => {
        setModelPlans(res?.data || []);
        setFiltersLoading(false);
      })
      .catch(() => setFiltersLoading(false));
  };

  const getUnitType = () => {
    fetchUnitExposure()
      .then(res => {
        const resData = res?.data || { exposuretype: '', unitType: '' };
        const convertedUnitTypeData = convertExpoUnitData(resData?.unitType) || [];
        const unitTypeData = convertedUnitTypeData
          .filter(el => el !== 'ANY')
          .map(el => ({ value: el, label: el }));
        setUnitTypes(unitTypeData);
      })
      .catch(() => {});
  };

  const getAllocationTypes = () => {
    setFiltersLoading(true);
    fetchAllocationTypes()
      .then(res => {
        const resData = res?.data?.allocationType || [];
        setAllocationTypes(resData.map(el => ({ value: el.list, label: el.list })));
        setFiltersLoading(false);
      })
      .catch(() => setFiltersLoading(false));
  };

  const getSalesSources = () => {
    setFiltersLoading(true);
    fetchSalesSources()
      .then(res => {
        const resData = res?.data?.salesSource || [];
        setSalesSources(resData.map(el => ({ value: el.list, label: el.list })));
        setFiltersLoading(false);
      })
      .catch(() => setFiltersLoading(false));
  };

  const filters = (
    <>
      <Col>
        <FormItem
          name='apsSalesOffer_id.Project_id.id'
          label='Project'
          mb={0}
          width='250px'
          initialValue=''
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
                {el.ProjectName}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
      <Col>
        <FormItem
          name='apsSalesOffer_id.pjModel_id.id'
          label='Model'
          mb={0}
          width='200px'
          initialValue=''
        >
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
        <FormItem name='ModelUnitType' label='Unit Type' mb={0} width='150px' initialValue=''>
          <Select width='150px'>
            {[{ value: '', label: 'All' }, ...unitTypes].map(el => (
              <Select.Option value={el.value} key={el.value}>
                {el?.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
      <Col>
        <FormItem name='apsSalesOffer_id.SalesDate' label='Sale Date' mb={0} width='250px'>
          <RangePicker />
        </FormItem>
      </Col>
      <Col>
        <FormItem
          name='apsSalesOffer_id.AllocationType'
          label='Allocation'
          mb={0}
          width='150px'
          initialValue=''
        >
          <Select width='150px'>
            {[{ value: '', label: 'All' }, ...allocationTypes].map(el => (
              <Select.Option value={el.value} key={el.value}>
                {el.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
      <Col>
        <FormItem
          name='apsSalesOffer_id.SaleSourceType'
          label='Source'
          mb={0}
          width='150px'
          initialValue=''
        >
          <Select width='150px'>
            {[{ value: '', label: 'All' }, ...salesSources].map(el => (
              <Select.Option value={el.value} key={el.value}>
                {el.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </Col>
    </>
  );

  return (
    <UserListWrapper
      role='client'
      endpoint='/aps-purchasers'
      buttonText='New Purchaser'
      filters={filters}
      filtersLoading={filtersLoading || projectsLoading}
      mainColumns={[
        {
          title: 'Project',
          dataIndex: 'projectName',
          key: 'projectName',
          order: 1,
          width: 150,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Unit No',
          dataIndex: 'unitNo',
          key: 'unitNo',
          order: 2,
          width: 150,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Model',
          dataIndex: 'modelName',
          key: 'modelName',
          order: 3,
          width: 150,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Unit Type',
          dataIndex: 'unitType',
          key: 'unitType',
          order: 3,
          width: 150,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Invest?',
          dataIndex: 'apsSalesOffer_id',
          key: 'apsSalesOffer_id',
          order: 3,
          align: 'center',
          width: 50,
          render: item => checkExistIcon(item?.IsInvestment),
        },
        {
          title: 'Sale Date',
          dataIndex: 'apsSalesOffer_id',
          key: 'apsSalesOffer_id',
          order: 3,
          width: 150,
          render: text => defText(text?.SalesDate, 'left'),
        },
        {
          title: 'Corp?',
          dataIndex: 'IsCompany',
          key: 'IsCompany',
          order: 3,
          align: 'center',
          width: 50,
          render: text => checkExistIcon(text),
        },
        {
          title: 'Full Name',
          dataIndex: 'LegalFullName',
          key: 'LegalFullName',
          order: 3,
          render: text => defText(text, 'left'),
        },
        {
          title: 'Allocation',
          dataIndex: 'apsSalesOffer_id',
          key: 'apsSalesOffer_id',
          order: 3,
          width: 150,
          render: text => defText(text?.AllocationType, 'left'),
        },
        {
          title: 'Source',
          dataIndex: 'apsSalesOffer_id',
          key: 'apsSalesOffer_id',
          order: 3,
          width: 150,
          render: text => defText(text?.SaleSourceType, 'left'),
        },
      ]}
    />
  );
};

export default PurchasersPage;
