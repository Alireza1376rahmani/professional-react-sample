import React from 'react';
import PageFilter from '../../molecules/PageFilter';
import { Avatar, Button, Col, Collapse, Input, List, Paragraph, Row } from '../../atoms';
import CashOutIcon from '../../../assets/images/custom-icons/CashOutIcon';
import DeleteIcon from '../../../assets/images/custom-icons/DeleteIcon';
import DocsIcon from '../../../assets/images/custom-icons/DocsIcon';
import EditIcon from '../../../assets/images/custom-icons/EditIcon';
import SketchIcon from '../../../assets/images/custom-icons/SketchIcon';
import StatisticIcon from '../../../assets/images/custom-icons/StatisticIcon';
import SitemapIcon from '../../../assets/images/custom-icons/SitemapIcon';
import HiRiseGridIcon from '../../../assets/images/custom-icons/HiRiseGridIcon';
import PackagesIcon from '../../../assets/images/custom-icons/PackagesIcon';
import ModelsIcon from '../../../assets/images/custom-icons/ModelsIcon';
import PriceListIcon from '../../../assets/images/custom-icons/PriceListIcon';
import WorksheetIcon from '../../../assets/images/custom-icons/WorksheetIcon';
import AmenitiesIcon from '../../../assets/images/custom-icons/AmenitiesIcon';
import PremiumIcon from '../../../assets/images/custom-icons/PremiumIcon';
import UnitAllocIcon from '../../../assets/images/custom-icons/UnitAllocIcon';
import IncentivesIcon from '../../../assets/images/custom-icons/IncentivesIcon';
import CommissionIcon from '../../../assets/images/custom-icons/CommissionIcon';
import UpgradesIcon from '../../../assets/images/custom-icons/UpgradesIcon';

const projectSetupData = [];

for (let i = 0; i < 45; i += 1) {
  projectSetupData.push({ title: 'Message title', content: 'Message content', date: '08-09-2021' });
}

export const projectSetupActions = [
  { key: 'Sketch', icon: <SketchIcon />, action: event => actionsWrapperFunc(event, () => {}) },
  { key: 'Docs', icon: <DocsIcon />, action: event => actionsWrapperFunc(event, () => {}) },
  { key: 'CashOut', icon: <CashOutIcon />, action: event => actionsWrapperFunc(event, () => {}) },
  {
    key: 'Statistic',
    icon: <StatisticIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  { key: 'Edit', icon: <EditIcon />, action: event => actionsWrapperFunc(event, () => {}) },
  { key: 'Delete', icon: <DeleteIcon />, action: event => actionsWrapperFunc(event, () => {}) },
];

export const projectSetupSectionList = [
  {
    key: 'Sitemap',
    label: 'Site Map',
    icon: <SitemapIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  {
    key: 'HiRiseGrid',
    label: 'Hi-Rise Grid Setup',
    icon: <HiRiseGridIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  {
    key: 'Packages',
    label: 'Packages',
    icon: <PackagesIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  {
    key: 'Models',
    label: 'Models',
    icon: <ModelsIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  {
    key: 'PriceList',
    label: 'Price list',
    icon: <PriceListIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  {
    key: 'Worksheet',
    label: 'Worksheet',
    icon: <WorksheetIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  {
    key: 'Amenities',
    label: 'Amenities',
    icon: <AmenitiesIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  {
    key: 'Premium',
    label: 'Premiums',
    icon: <PremiumIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  {
    key: 'UnitAlloc',
    label: 'Unit allocation to Brokers',
    icon: <UnitAllocIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  {
    key: 'Incentives',
    label: 'Incentives',
    icon: <IncentivesIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  {
    key: 'Commission',
    label: 'Commissions',
    icon: <CommissionIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
  {
    key: 'Upgrades',
    label: 'Options/Upgrades',
    icon: <UpgradesIcon />,
    action: event => actionsWrapperFunc(event, () => {}),
  },
];

const actionsWrapperFunc = (event, callback) => {
  event.stopPropagation();
  callback();
};

const ProjectSetup = () => {
  return (
    <>
      <PageFilter>
        <Col span={6}>
          <Input placeholder='Filter by name' />
        </Col>
        <Col span={6}>
          <Input placeholder='Filter by status' />
        </Col>
      </PageFilter>
      <Row mb={30} align='middle' justify='space-between'>
        <Paragraph type='secondary' mb={0} fz={24} fw={600}>
          Project Setup
        </Paragraph>
        <Button type='primary' padding='8px 25px'>
          + New Project
        </Button>
      </Row>
      <List
        title_align='center'
        meta_align='center'
        title_width='100%'
        title_mb={0}
        item_mb={30}
        item_back='#fff'
        item_padding='15px 20px 0 20px'
        item_radius='20px'
        total_pos='left'
        action_split_display='none'
        item_shadow='0px 4px 4px rgba(0, 0, 0, 0.04)'
        item_hover_shadow='0 3px 4px 1px #0000001c'
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          hideOnSinglePage: true,
          showTotal: (total, current) => (
            <Paragraph type='secondary' fw={400} fz={16}>
              Showing {current[0]}-{current[1]} of {projectSetupData.length}
            </Paragraph>
          ),
        }}
        dataSource={projectSetupData}
        renderItem={item => (
          <List.Item key={item.id}>
            <Collapse
              ghost
              expandIconPosition='right'
              width='100%'
              head_padding='0'
              head_mb={15}
              content_padding='0'
              arrow_right='0'
            >
              <Collapse.Panel
                header={
                  <Row>
                    <Col span={2} align='center'>
                      <Avatar size={45} min_width='45px' radius='10px' back_color='#F1EAFF' />
                    </Col>
                    <Col span={4} align='center'>
                      <Paragraph mb={0} type='primary'>
                        #P-000441425
                      </Paragraph>
                    </Col>
                    <Col span={4} align='center'>
                      <Paragraph mb={0} fw={400} type='secondary'>
                        Sep 8th, 2020
                      </Paragraph>
                    </Col>
                    <Col span={4} align='center'>
                      <Paragraph mb={0}>Project’s name</Paragraph>
                    </Col>
                    <Col span={4} align='center'>
                      <Paragraph mb={0}>Builder’s Name</Paragraph>
                    </Col>
                    <Col span={5} align='center'>
                      {projectSetupActions.map(el => (
                        <Col span={4} onClick={el.action} key={el.key}>
                          {el.icon}
                        </Col>
                      ))}
                    </Col>
                  </Row>
                }
                key='1'
              >
                <Row>
                  {projectSetupSectionList.map(el => (
                    <Col
                      key={el.key}
                      span={4}
                      onClick={el.action}
                      cursor='pointer'
                      padding='20px 0'
                      border_top='1px solid #EEEEEE'
                    >
                      <Row align='middle' wrap={false}>
                        {el.icon}
                        <Paragraph mb={0} margin='0 0 0 10px' type='secondary' fz={12}>
                          {el.label}
                        </Paragraph>
                      </Row>
                    </Col>
                  ))}
                </Row>
              </Collapse.Panel>
            </Collapse>
          </List.Item>
        )}
      />
    </>
  );
};

export default ProjectSetup;
