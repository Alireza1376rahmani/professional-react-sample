import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  Avatar,
  Button,
  Card,
  Col,
  ContentWrapper,
  List,
  Paragraph,
  Row,
  DocsContentWrapper,
} from '../atoms';
import { docsContent } from '../../constants/etc';

const MyPurchasesPrev = ({ history }) => {
  return (
    <ContentWrapper padding='5px 20px'>
      <Card
        titlecolor='#717579'
        hpadding='0'
        bpadding='0'
        title_padding='0'
        extra_padding='0'
        meta_mb={20}
        bordered={false}
        title='My Purchases'
        extra={
          <Button
            type='primary'
            sectype='ghost'
            padding='0'
            onClick={() => history.push('/my-purchases')}
          >
            View All
          </Button>
        }
      >
        <List
          title_content_align='flex-start'
          title_mb={0}
          title_justify='space-between'
          title_height='180px'
          title_direction='column'
          itemLayout='vertical'
          dataSource={[1, 2, 3]}
          renderItem={item => (
            <List.Item key={item}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src='https://uvibusiness.net/wp-content/uploads/2020/11/141.jpg'
                    size={180}
                    shape='square'
                    radius='10px'
                  />
                }
                title={
                  <>
                    <Row width='100%'>
                      <Col span={24}>
                        <Paragraph mb={0}>Lantern House</Paragraph>
                      </Col>
                      <Col span={24}>
                        <Paragraph mb={0} fz={12}>
                          Unit N
                        </Paragraph>
                      </Col>
                      <Row mb={15}>
                        <Col span={24} mb={0}>
                          <Paragraph mb={0} fz={10} fw={600} type='secondary'>
                            Sale Date
                          </Paragraph>
                          <Paragraph mb={0} fz={14} fw={600} type='secondary'>
                            02/21/2021
                          </Paragraph>
                        </Col>
                      </Row>
                    </Row>
                    <Row width='100%'>
                      <Col span={4}>
                        <Paragraph fz={10} mb={0} fw={600} type='secondary'>
                          Price
                        </Paragraph>
                        <Paragraph mb={5} fw={600} fz={14} color='#886CC0'>
                          $402,000
                        </Paragraph>
                      </Col>
                      <Col span={20} align='center'>
                        <Col span={24}>
                          <Row gutter={20} align='middle'>
                            {['signed', 'review'].map((el, index) => (
                              <Col span={10} key={index}>
                                <DocsContentWrapper padding='5px 10px'>
                                  {docsContent[el].icon}
                                  <Col>
                                    <Paragraph mb={5} fz={12} lh='1'>
                                      Document
                                    </Paragraph>
                                    <Paragraph
                                      lh='1'
                                      mb={0}
                                      fz={8}
                                      align='left'
                                      color={docsContent[el].color}
                                    >
                                      {docsContent[el].text}
                                    </Paragraph>
                                  </Col>
                                </DocsContentWrapper>
                              </Col>
                            ))}
                            <Col span={4}>
                              <DocsContentWrapper padding='5px 10px' justify='center' width='44px'>
                                <Paragraph mb={0} fz={12}>
                                  +4
                                </Paragraph>
                              </DocsContentWrapper>
                            </Col>
                          </Row>
                        </Col>
                      </Col>
                    </Row>
                  </>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </ContentWrapper>
  );
};

export default withRouter(MyPurchasesPrev);
