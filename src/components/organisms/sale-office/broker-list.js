import React from 'react';
import { DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import PageFilter from '../../molecules/PageFilter';
import { Button, Col, ContentWrapper, Input, List, Paragraph, Row, Select } from '../../atoms';

const brokerData = [];

const userStatusList = ['active', 'inactive'];

for (let i = 0; i < 45; i += 1) {
  brokerData.push({ id: i, userStatus: userStatusList[Math.floor(Math.random() * 2)] });
}

const userStatusComp = {
  active: (
    <ContentWrapper back_color='#CFF7DB' color='#09BD3C' min_width='160px' radius='20px'>
      Active
    </ContentWrapper>
  ),
  inactive: (
    <ContentWrapper back_color='#FDDEE4' color='#FC2E53' min_width='160px' radius='20px'>
      Inactive
    </ContentWrapper>
  ),
};

const BrokerList = () => {
  return (
    <>
      <PageFilter>
        <Col span={5}>
          <Input placeholder='Filter with ID' />
        </Col>
        <Col span={5}>
          <Input placeholder='Filter with creation date' />
        </Col>
        <Col span={5}>
          <Input placeholder='Filter with Project' />
        </Col>
        <Col span={5}>
          <Select placeholder='Filter with Broker' value={null}>
            {['Broker'].map(el => (
              <Select.Option value={el} key={el}>
                {el}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={4}>
          <Select placeholder='All status' value={null}>
            {['All'].map(el => (
              <Select.Option value={el} key={el}>
                {el}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </PageFilter>
      <Row mb={30} align='middle' justify='space-between'>
        <Paragraph type='secondary' mb={0} fz={24} fw={600}>
          Brokers
        </Paragraph>
        <Button type='primary' padding='8px 25px'>
          + New Broker
        </Button>
      </Row>
      <List
        title_align='center'
        meta_align='center'
        title_width='100%'
        title_mb={0}
        item_mb={30}
        item_back='#fff'
        item_padding='20px 25px 20px 30px'
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
              Showing {current[0]}-{current[1]} of {brokerData.length}
            </Paragraph>
          ),
        }}
        dataSource={brokerData}
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <InfoCircleOutlined
                style={{ color: '#886cc0', marginRight: '10px' }}
                onClick={() => {}}
              />,
              <EditOutlined style={{ color: '#886cc0', marginRight: '10px' }} onClick={() => {}} />,
              <DeleteOutlined style={{ color: '#886cc0' }} onClick={() => {}} />,
            ]}
          >
            <List.Item.Meta
              title={
                <Row>
                  <Col span={5} align='center'>
                    <Paragraph mb={0}>First Name</Paragraph>
                  </Col>
                  <Col span={5} align='center'>
                    <Paragraph mb={0}>Last Name</Paragraph>
                  </Col>
                  <Col span={5} align='center'>
                    <Paragraph mb={0}>Email address</Paragraph>
                  </Col>
                  <Col span={5} align='center'>
                    <Paragraph mb={0}>Phone number</Paragraph>
                  </Col>
                  <Col span={4} align='center'>
                    {userStatusComp[item.userStatus]}
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

export default BrokerList;
