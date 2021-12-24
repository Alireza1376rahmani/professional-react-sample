import React from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Avatar, Col, List, Paragraph, Row, Tooltip } from '../atoms';
import BuildingIcon from '../../assets/images/custom-icons/BuildingIcon';
import KeyIcon from '../../assets/images/custom-icons/KeyIcon';
import ParkingIcon from '../../assets/images/custom-icons/ParkingIcon';
import DocSearchIcon from '../../assets/images/custom-icons/DocSearch';
// import FloorPlanIcon from '../../assets/images/custom-icons/FloorPlanIcon';
import GalleryIcon from '../../assets/images/custom-icons/GalleryIcon';
import MapsIcon from '../../assets/images/custom-icons/MapsIcon';
import TasksIcon from '../../assets/images/custom-icons/TasksIcon';
import PercentIcon from '../../assets/images/custom-icons/PercentIcon';
import FloorPlanIcon from '../../assets/images/FloorPlanIcon.svg';

export const actionIcons = [
  { icon: <DocSearchIcon />, key: 'overview', label: 'Overview' },
  {
    icon: <img src={FloorPlanIcon} alt='floor-plan' />,
    key: 'plan_pricing',
    label: 'Floor plan & Pricing',
  },
  { icon: <GalleryIcon />, key: 'gallery', label: 'Gallery' },
  { icon: <MapsIcon />, key: 'neighbourhood', label: 'Neighbourhood' },
  { icon: <TasksIcon />, key: 'features_finishes', label: 'Features & Finishes' },
  { icon: <PercentIcon />, key: 'promotions_deals', label: 'Promotions & Deals' },
];

const SingleProjectCard = ({ item, history, redirectUrl }) => {
  return (
    <List.Item
      key={item?.id}
      onClick={() => history.push(`${redirectUrl || '/projects'}/${item?.id}`)}
    >
      <List.Item.Meta
        avatar={<Avatar size={180} shape='square' radius='10px' src={item?.Logo?.url || ''} />}
        title={
          <Paragraph mb={15} fz={18} fw={600}>
            {item.ProjectName}
          </Paragraph>
        }
        description={
          <>
            <Row justify='space-between' align='middle' mb={20}>
              <Col>
                <Paragraph mb={0} fz={14} fw={600} type='secondary'>
                  <BuildingIcon style={{ marginRight: '10px' }} /> {item.StorageCount || '0'}
                </Paragraph>
              </Col>
              <Col>
                <Paragraph mb={5} fz={10} fw={600} color='#C7C7C7' width='100%' align='end'>
                  Deadline
                </Paragraph>
                <Paragraph mb={0} fz={14} fw={600} type='secondary'>
                  {item.LaunchDate
                    ? moment(item.LaunchDate).format('DD/MM/YYYY')
                    : moment().format('DD/MM/YYYY')}
                </Paragraph>
              </Col>
            </Row>
            <Row mb={20} align='middle'>
              <Paragraph mb={0} fz={14} fw={600} type='secondary'>
                <KeyIcon style={{ marginRight: '10px' }} /> {item.ComboCount || '0'}
              </Paragraph>
            </Row>
            <Row justify='space-between' align='middle'>
              <Col>
                <Paragraph mb={0} fz={14} fw={600} type='secondary'>
                  <ParkingIcon style={{ marginRight: '10px' }} /> {item.ParkingCounts || '0'}
                </Paragraph>
              </Col>
              <Col>
                <Paragraph mb={5} fz={10} fw={600} color='#C7C7C7' width='100%' align='end'>
                  Price from
                </Paragraph>
                <Paragraph mb={0} fz={14} fw={600} color='#886CC0'>
                  $
                  {item?.projectPriceRange?.priceFrom
                    ? parseInt(item?.projectPriceRange?.priceFrom, 10).toLocaleString()
                    : '360,000'}
                </Paragraph>
              </Col>
            </Row>
          </>
        }
      />
      <Row align='middle' justify='space-between'>
        {actionIcons.map(el => (
          <Col
            key={el.key}
            height='28px'
            onClick={e => {
              e.stopPropagation();
              history.push({
                pathname: `${redirectUrl || '/projects'}/${item?.id}`,
                state: { tabType: el.key },
              });
            }}
          >
            <Tooltip placement='bottom' title={el.label}>
              {el.icon}
            </Tooltip>
          </Col>
        ))}
      </Row>
    </List.Item>
  );
};

export default withRouter(SingleProjectCard);
