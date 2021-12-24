import React from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Col, List, Paragraph, Row } from '../atoms';
import BuildingIcon from '../../assets/images/custom-icons/BuildingIcon';
import KeyIcon from '../../assets/images/custom-icons/KeyIcon';
import ParkingIcon from '../../assets/images/custom-icons/ParkingIcon';
import { actionIcons } from './SingleProjectCard';

const SingleOpportunityCard = ({ index, history }) => {
  return (
    <List.Item key={index} onClick={() => history.push('/investment-opportunities/1')}>
      <List.Item.Meta
        avatar={
          <Avatar
            size={180}
            shape='square'
            radius='10px'
            src='https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
          />
        }
        title={
          <Paragraph mb={15} fz={18} fw={600}>
            Project’s name
          </Paragraph>
        }
        description={
          <>
            <Row justify='space-between' align='middle' mb={20}>
              <Col>
                <Paragraph mb={0} fz={14} fw={600} type='secondary'>
                  <BuildingIcon style={{ marginRight: '10px' }} /> 16
                </Paragraph>
              </Col>
              <Col>
                <Paragraph mb={5} fz={10} fw={600} color='#C7C7C7' width='100%' align='end'>
                  Deadline
                </Paragraph>
                <Paragraph mb={0} fz={14} fw={600} type='secondary'>
                  02/21/2021
                </Paragraph>
              </Col>
            </Row>
            <Row mb={20} align='middle'>
              <Paragraph mb={0} fz={14} fw={600} type='secondary'>
                <KeyIcon style={{ marginRight: '10px' }} /> 112
              </Paragraph>
            </Row>
            <Row justify='space-between' align='middle'>
              <Col>
                <Paragraph mb={0} fz={14} fw={600} type='secondary'>
                  <ParkingIcon style={{ marginRight: '10px' }} /> 3
                </Paragraph>
              </Col>
              <Col>
                <Paragraph mb={5} fz={10} fw={600} color='#C7C7C7' width='100%' align='end'>
                  Price from
                </Paragraph>
                <Paragraph mb={0} fz={14} fw={600} color='#886CC0'>
                  $402,000
                </Paragraph>
              </Col>
            </Row>
          </>
        }
      />
      <Row align='middle' justify='space-between'>
        {actionIcons.map((el, iconIndex) => (
          <Col key={iconIndex} height='28px'>
            {el.icon}
          </Col>
        ))}
      </Row>
    </List.Item>
  );
};

export default withRouter(SingleOpportunityCard);
