/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import moment from 'moment';
import { Button, Col, ContentWrapper, Paragraph, Row, Tabs, TextArea } from '../../../atoms';
import Overview from './overview';
import PlanPricing from './plan-pricing';
import Gallery from './gallery';
import Neighbourhood from './neighbourhood';
import FeaturesFinishes from './features-finishes';
import PromotionsDeals from './promotions-deals';
import { fetchOneProject } from '../../../../actions/projects';
import { getSelectedProject, getSelectedProjectLoading } from '../../../../selectors/projects';

const { TabPane } = Tabs;

const ProjectsSingle = ({ history, match, location }) => {
  const dispatch = useDispatch();
  const loading = useSelector(getSelectedProjectLoading);
  const project = useSelector(getSelectedProject) || {};
  const projectId = match?.params?.projectId;

  let projectPages = [
    {
      key: 'overview',
      label: 'Overview',
      component: <Overview project={project} />,
      visible: true,
    },
    {
      key: 'plan_pricing',
      label: 'Floor plan & Pricing',
      component: <PlanPricing project={project} />,
      visible: (project?.marketingInformation || []).length > 0,
    },
    {
      key: 'gallery',
      label: 'Gallery',
      component: <Gallery project={project} />,
      visible: (project?.Media || []).length > 0,
    },
    {
      key: 'neighbourhood',
      label: 'Neighbourhood',
      component: <Neighbourhood project={project} />,
      visible: true,
    },
    {
      key: 'features_finishes',
      label: 'Features & Finishes',
      component: <FeaturesFinishes project={project} />,
      visible: (project?.featuresFinishes || []).length > 0,
    },
    {
      key: 'promotions_deals',
      label: 'Promotions & Deals',
      component: <PromotionsDeals project={project} />,
      visible:
        (project?.promotionsDeals ? project?.promotionsDeals[0]?.longValues || [] : []).length > 0,
    },
  ];
  projectPages = projectPages.filter(el => el.visible);
  useEffect(() => {
    dispatch(fetchOneProject.request({ id: projectId }));
  }, [projectId]);

  let address = '';

  if (project?.Address) {
    const { Address1, Address2, Province, City, Country, PostalCode } = project?.Address;
    address = `${Address1 || ''} ${Address2 || ''}, ${City || ''}, ${Province || ''} ${
      PostalCode || ''
    }, ${Country || ''}`;
  }
  return (
    <Spin spinning={loading}>
      <Row mb={15}>
        <Button
          type='grey_ghost'
          icon={<LeftOutlined />}
          padding='0'
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </Row>
      <Row padding='30px' back_color='#F6F6F6' align='center' justify='space-between' mb={30}>
        <Col span={24} align='center' justify='space-between' mb={15}>
          <Paragraph fz={18} mb={0}>
            {project?.ProjectName || ''}
          </Paragraph>
          <Paragraph fz={18} mb={0}>
            Price from $
            {project?.priceFrom ? parseInt(project?.priceFrom, 10).toLocaleString() : ''} - $
            {project?.priceTo ? parseInt(project?.priceTo, 10).toLocaleString() : ''}
          </Paragraph>
        </Col>
        <Col span={24} justify='space-between'>
          <Paragraph type='secondary' fw={400} mb={0}>
            {address}
          </Paragraph>
          <Col>
            <Paragraph mb={5} fz={10} fw={600} color='#C7C7C7' align='end'>
              Deadline
            </Paragraph>
            <Paragraph mb={0} fz={14} fw={600} type='secondary' align='end'>
              {project?.deadline
                ? moment(project.deadline).format('DD/MM/YYYY')
                : moment().format('DD/MM/YYYY')}
            </Paragraph>
          </Col>
        </Col>
      </Row>
      <Tabs
        width='100%'
        type='card'
        tab_btn_fz={14}
        active_tab_btn_fw={500}
        active_tab_btn_color='#886CC0'
        tab_btn_fw={500}
        defaultActiveKey={location.state?.tabType || 'overview'}
        tab_btn_color='#717579'
        active_tab_back_color='#fbfbfb'
      >
        {projectPages.map(el => (
          <TabPane tab={el.label} key={el.key}>
            <Row padding='30px 5px' gutter={16}>
              <Col span={16}>{el.component}</Col>
              <Col span={8}>
                <ContentWrapper shadow='0 0 3px 3px rgba(0, 0, 0, 0.05)' padding='30px'>
                  <Paragraph fz={24} mb={15}>
                    Act now
                  </Paragraph>
                  <Paragraph fw={400} fz={13} mb={15} type='secondary' lh='25px'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </Paragraph>
                  <TextArea height='200px' mb={30} />
                  <Button type='primary' width='100%'>
                    Act now
                  </Button>
                </ContentWrapper>
              </Col>
            </Row>
          </TabPane>
        ))}
      </Tabs>
    </Spin>
  );
};

export default withRouter(ProjectsSingle);
