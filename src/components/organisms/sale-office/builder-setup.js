import React from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Input, List, Paragraph, Row, Avatar } from '../../atoms';
import PageFilter from '../../molecules/PageFilter';

const builderData = [];

for (let i = 0; i < 45; i += 1) {
  builderData.push({ title: 'Message title', content: 'Message content', date: '08-09-2021' });
}

const BuilderSetup = () => {
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
          Builder Setup
        </Paragraph>
        <Button type='primary' padding='8px 25px'>
          + New Builder
        </Button>
      </Row>
      <List
        title_align='center'
        meta_align='center'
        title_width='100%'
        title_mb={0}
        item_mb={30}
        item_back='#fff'
        item_padding='20px'
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
              Showing {current[0]}-{current[1]} of {builderData.length}
            </Paragraph>
          ),
        }}
        dataSource={builderData}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <EditOutlined style={{ color: '#886cc0', marginRight: '10px' }} onClick={() => {}} />,
              <DeleteOutlined style={{ color: '#886cc0' }} onClick={() => {}} />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar size={45} radius='10px' back_color='#F1EAFF' />}
              title={
                <Row>
                  <Col span={6}>
                    <Paragraph mb={0} type='primary'>
                      #P-000441425
                    </Paragraph>
                  </Col>
                  <Col span={6}>
                    <Paragraph mb={0} fw={400} type='secondary'>
                      Sep 8th, 2020
                    </Paragraph>
                  </Col>
                  <Col span={6}>
                    <Paragraph mb={0}>Builder’s Name</Paragraph>
                  </Col>
                  <Col span={6}>
                    <Paragraph mb={0}>Builder's Address</Paragraph>
                  </Col>
                </Row>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default BuilderSetup;
