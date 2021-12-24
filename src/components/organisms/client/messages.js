import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { Col, Input, List, Paragraph, Row, Avatar } from '../../atoms';
import PageFilter from '../../molecules/PageFilter';
import ArchiveIcon from '../../../assets/images/custom-icons/ArchiveIcon';
import CalendarIcon from '../../../assets/images/custom-icons/CalendarIcon';
import ChequeIcon from '../../../assets/images/custom-icons/ChequeIcon';
import HandShakeIcon from '../../../assets/images/custom-icons/HandShakeIcon';

export const messageTypes = {
  occupancy: {
    type: 'occupancy',
    title: 'Occupancy date',
    description: 'Water’s Edge at the Cove',
    icon: <CalendarIcon />,
  },
  cheque: {
    type: 'cheque',
    title: 'Your check will be debited tomorrow',
    description: 'Water’s Edge at the Cove',
    icon: <ChequeIcon />,
  },
  closing: {
    type: 'closing',
    title: 'Closing date',
    description: 'Water’s Edge at the Cove',
    icon: <HandShakeIcon />,
  },
};

const typeList = ['occupancy', 'cheque', 'closing'];

const messagesData = [];

for (let i = 0; i < 45; i += 1) {
  const printData = messageTypes[typeList[Math.floor(Math.random() * 3)]];
  messagesData.push({ ...printData, id: i, date: '08/09/2021' });
}

const Messages = ({ history }) => {
  return (
    <>
      <PageFilter>
        <Col span={5}>
          <Input placeholder='Filter by message content' />
        </Col>
        <Col span={5}>
          <Input placeholder='Filter by message title' />
        </Col>
        <Col span={5}>
          <Input placeholder='Filter by date' />
        </Col>
      </PageFilter>
      <Paragraph type='secondary' fz={24} fw={600}>
        Messages
      </Paragraph>
      <List
        title_align='center'
        meta_align='center'
        title_width='100%'
        action_split_display='none'
        title_mb={0}
        item_mb={30}
        item_back='#fff'
        item_padding='20px'
        item_radius='20px'
        item_cursor='pointer'
        total_pos='left'
        item_shadow='0px 4px 4px rgba(0, 0, 0, 0.04)'
        item_hover_shadow='0 3px 4px 1px #0000001c'
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          hideOnSinglePage: true,
          showTotal: (total, current) => (
            <Paragraph type='secondary' fw={400} fz={16}>
              Showing {current[0]}-{current[1]} of {messagesData.length}
            </Paragraph>
          ),
        }}
        dataSource={messagesData}
        renderItem={item => (
          <List.Item key={item.id} actions={[<ArchiveIcon />]}>
            <List.Item.Meta
              onClick={() => history.push(`/messages/${item.type}`)}
              avatar={
                <Avatar
                  size={54}
                  icon={item.icon}
                  align='center'
                  justify='center'
                  icon_width='100%'
                  padding='12px'
                  back_color='#F1EAFF'
                />
              }
              title={
                <Row>
                  <Col span={12}>
                    <Paragraph mb={5}>{item.title}</Paragraph>
                    <Paragraph fz={12} mb={0} type='secondary'>
                      {item.description}
                    </Paragraph>
                  </Col>
                  <Col span={6} align='center'>
                    <Paragraph type='secondary' fz={12} mb={0}>
                      Thread
                    </Paragraph>
                  </Col>
                  <Col span={6} align='center'>
                    <Paragraph type='secondary' fz={12} mb={0}>
                      Unit #
                    </Paragraph>
                  </Col>
                </Row>
              }
            />
            <Paragraph type='secondary' fz={12} mb={0} fw={400}>
              {moment(item.date).format('ll')}
            </Paragraph>
          </List.Item>
        )}
      />
    </>
  );
};

export default withRouter(Messages);
