import React from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import Overview from '../../brokers/projects-single/overview';
import PlanPricing from '../../brokers/projects-single/plan-pricing';
import Gallery from '../../brokers/projects-single/gallery';
import Neighbourhood from '../../brokers/projects-single/neighbourhood';
import FeaturesFinishes from '../../brokers/projects-single/features-finishes';
import PromotionsDeals from '../../brokers/projects-single/promotions-deals';
import { Button, Col, ContentWrapper, Paragraph, Row, Tabs, TextArea } from '../../../atoms';

const { TabPane } = Tabs;

const OpportunitiesSingle = ({ history }) => {
  const opportunitiesPages = [
    { key: 'overview', label: 'Overview', component: <Overview /> },
    { key: 'plan_pricing', label: 'Floor plan & Pricing', component: <PlanPricing /> },
    { key: 'gallery', label: 'Gallery', component: <Gallery /> },
    { key: 'neighbourhood', label: 'Neighbourhood', component: <Neighbourhood /> },
    { key: 'features_finishes', label: 'Features & Finishes', component: <FeaturesFinishes /> },
    { key: 'promotions_deals', label: 'Promotions & Deals', component: <PromotionsDeals /> },
  ];

  return (
    <>
      <Row mb={15}>
        <Button
          type='grey_ghost'
          icon={<LeftOutlined />}
          padding='0'
          onClick={() => history.goBack()}
        >
          Back to Dashboard
        </Button>
      </Row>
      <Row padding='30px' back_color='#F6F6F6' align='center' justify='space-between' mb={30}>
        <Col span={24} align='center' justify='space-between' mb={15}>
          <Paragraph fz={18} mb={0}>
            Universal City East
          </Paragraph>
          <Paragraph fz={18} mb={0}>
            Price from $440.000-$880.000
          </Paragraph>
        </Col>
        <Col span={24} justify='space-between'>
          <Paragraph type='secondary' fw={400} mb={0}>
            Universal City Condos Community | 1496 Bayly Street, Pickering, ON
          </Paragraph>
          <Col>
            <Paragraph mb={5} fz={10} fw={600} color='#C7C7C7' align='end'>
              Deadline
            </Paragraph>
            <Paragraph mb={0} fz={14} fw={600} type='secondary' align='end'>
              10/21/2021
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
        tab_btn_color='#717579'
        active_tab_back_color='#fbfbfb'
      >
        {opportunitiesPages.map(el => (
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
    </>
  );
};

export default withRouter(OpportunitiesSingle);
