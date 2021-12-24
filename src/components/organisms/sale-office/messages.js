import React from 'react';
import { Avatar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Col, Input, Paragraph, List } from '../../atoms';
import PageFilter from '../../molecules/PageFilter';

const messagesData = [];

for (let i = 0; i < 45; i += 1) {
  messagesData.push({ title: 'Message title', content: 'Message content', date: '08-09-2021' });
}
const Messages = () => {
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
          <List.Item key={item.id} actions={[<DeleteOutlined style={{ color: '#886cc0' }} />]}>
            <List.Item.Meta
              avatar={<Avatar size={45} />}
              title={
                <>
                  <Paragraph fz={14} mb={0} margin='0 60px 0 0'>
                    {item.title}
                  </Paragraph>
                  <Paragraph fz={14} mb={0}>
                    {item.content}
                  </Paragraph>
                </>
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

export default Messages;
