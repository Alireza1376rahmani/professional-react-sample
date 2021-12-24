import React from 'react';
import { Col, Input, List, Paragraph, Row, Select, Avatar, DocsContentWrapper } from '../../atoms';
import PageFilter from '../../molecules/PageFilter';
import DepositCardIcon from '../../../assets/images/custom-icons/DepositCardIcon';
import { docsContent } from '../../../constants/etc';

const salesData = [];

for (let i = 0; i < 45; i += 1) {
  salesData.push({ title: 'title' });
}

const MySales = () => {
  return (
    <>
      <PageFilter>
        <Col span={5}>
          <Input placeholder='Filter Project name' />
        </Col>
        <Col span={5}>
          <Input placeholder='Filter with sale date' />
        </Col>
        <Col span={5}>
          <Input placeholder='Filter with broker name' />
        </Col>
        <Col span={5}>
          <Select placeholder='All status' value={null}>
            {['All'].map(el => (
              <Select.Option value={el} key={el}>
                {el}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </PageFilter>
      <Paragraph type='secondary' fz={24} fw={600}>
        My Sales
      </Paragraph>
      <List
        title_align='center'
        title_width='100%'
        meta_align='center'
        title_mb={0}
        item_mb={30}
        item_back='#fff'
        item_padding='20px'
        item_radius='20px'
        total_pos='left'
        item_shadow='0px 4px 4px rgba(0, 0, 0, 0.04)'
        item_hover_shadow='0 3px 4px 1px #0000001c'
        pagination={{
          pageSize: 10,
          showSizeChanger: false,
          hideOnSinglePage: true,
          showTotal: (total, current) => (
            <Paragraph type='secondary' fw={400} fz={16}>
              Showing {current[0]}-{current[1]} of {salesData.length}
            </Paragraph>
          ),
        }}
        dataSource={salesData}
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src='https://uvibusiness.net/wp-content/uploads/2020/11/141.jpg'
                  size={100}
                  shape='square'
                  radius='10px'
                />
              }
              title={
                <>
                  <Row>
                    <Col span={4}>
                      <Paragraph mb={5}>Lantern House</Paragraph>
                      <Paragraph mb={8} fz={12}>
                        Unit N
                      </Paragraph>
                      <Row>
                        <Col span={24}>
                          <Paragraph fz={10} mb={3} fw={600} type='secondary'>
                            Price
                          </Paragraph>
                        </Col>
                        <Col span={24}>
                          <Paragraph mb={5} fw={600} color='#886CC0'>
                            $402,000
                          </Paragraph>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={20}>
                      <Row>
                        <Col span={24} mb={15}>
                          <Paragraph mb={5} fz={10} fw={600} type='secondary'>
                            Sale Date
                          </Paragraph>
                          <Paragraph mb={0} fz={14} fw={600} type='secondary'>
                            02/21/2021
                          </Paragraph>
                        </Col>
                        <Col span={24}>
                          <Row gutter={16}>
                            <Col span={6}>
                              <DocsContentWrapper>
                                <DepositCardIcon />
                                <Paragraph type='primary' mb={0} margin='0 0 0 10px' fz={12}>
                                  See deposits
                                </Paragraph>
                              </DocsContentWrapper>
                            </Col>
                            {['signed', 'unsigned', 'review'].map((el, index) => (
                              <Col span={6} key={index}>
                                <DocsContentWrapper padding='5px 15px'>
                                  {docsContent[el].icon}
                                  <Col margin='0 0 0 10px'>
                                    <Paragraph mb={0} fz={12}>
                                      Document
                                    </Paragraph>
                                    <Paragraph
                                      type='primary'
                                      mb={0}
                                      fz={8}
                                      color={docsContent[el].color}
                                    >
                                      {docsContent[el].text}
                                    </Paragraph>
                                  </Col>
                                </DocsContentWrapper>
                              </Col>
                            ))}
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default MySales;
