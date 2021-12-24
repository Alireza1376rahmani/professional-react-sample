import React from 'react';
import { withRouter } from 'react-router-dom';
import { Avatar, Button, Card, Col, ContentWrapper, List, Paragraph, Row } from '../atoms';
import BuildingIcon from '../../assets/images/custom-icons/BuildingIcon';
import KeyIcon from '../../assets/images/custom-icons/KeyIcon';
import ParkingIcon from '../../assets/images/custom-icons/ParkingIcon';

const opportunitiesData = [
  {
    id: 1,
    title: 'Universal City East (Pickering)',
    units: 215,
    stories: 10,
    estimation: '02-07-2021',
    price: 402000,
  },
  {
    id: 2,
    title: 'Bridal Trail Towns',
    units: 215,
    stories: 10,
    estimation: '02-07-2021',
    price: 402000,
  },
  {
    id: 3,
    title: 'Vincent Condominiums',
    units: 215,
    stories: 10,
    estimation: '02-07-2021',
    price: 402000,
  },
  {
    id: 4,
    title: 'Voya Mississauga',
    units: 215,
    stories: 10,
    estimation: '02-07-2021',
    price: 402000,
  },
  {
    id: 5,
    title: 'Universal City 3',
    units: 215,
    stories: 10,
    estimation: '02-07-2021',
    price: 402000,
  },
  {
    id: 6,
    title: 'Upper West Side 2 (Oakville)',
    units: 215,
    stories: 10,
    estimation: '02-07-2021',
    price: 4202000,
  },
];

const OtherOpportunities = ({ history }) => {
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
        title='Other Opportunities'
        extra={
          <Button
            type='primary'
            sectype='ghost'
            padding='0'
            onClick={() => history.push('/investment-opportunities')}
          >
            View All
          </Button>
        }
      >
        <List
          dataSource={opportunitiesData}
          itemLayout='vertical'
          action_width='100%'
          title_mb={0}
          item_padding='20px 0'
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Row align='middle' justify='space-between' gutter={24} wrap={false}>
                  <Col>
                    <Row align='middle'>
                      <Paragraph mb={0} fz={14} fw={600} type='secondary' margin='0 25px 0 0'>
                        <BuildingIcon style={{ marginRight: '5px' }} />
                        215
                      </Paragraph>
                      <Paragraph mb={0} fz={14} fw={600} type='secondary' margin='0 25px 0 0'>
                        <KeyIcon style={{ marginRight: '5px' }} />
                        112
                      </Paragraph>
                      <Paragraph mb={0} fz={14} fw={600} type='secondary' margin='0 25px 0 0'>
                        <ParkingIcon style={{ marginRight: '5px' }} />3
                      </Paragraph>
                    </Row>
                  </Col>
                  <Col padding='0'>
                    <Button
                      type='outline'
                      onClick={() => history.push('/investment-opportunities/1')}
                    >
                      See Details
                    </Button>
                  </Col>
                </Row>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={100}
                    shape='square'
                    radius='10px'
                    src='https://images.adsttc.com/media/images/51d4/84a8/b3fc/4bea/e100/01d6/large_jpg/Portada.jpg?1372882078'
                  />
                }
                title={
                  <Paragraph mb={5} fz={18}>
                    {item.title}
                  </Paragraph>
                }
                description={
                  <>
                    <Paragraph mb={10} fz={14} fw={600}>
                      {`${item.units} Units,  ${item.stories} Stories`}
                    </Paragraph>
                    <Row gutter={24} justify='space-between'>
                      <Col>
                        <Paragraph mb={5} fz={10} fw={600} type='secondary'>
                          Price from
                        </Paragraph>
                        <Paragraph mb={0} fz={14} fw={600} color='#886CC0'>
                          ${item.price.toLocaleString()}
                        </Paragraph>
                      </Col>
                      <Col>
                        <Paragraph
                          mb={5}
                          fz={10}
                          fw={600}
                          type='secondary'
                          width='100%'
                          align='end'
                        >
                          Est. Completion
                        </Paragraph>
                        <Paragraph mb={0} fz={14} fw={600} type='secondary'>
                          Summer 2022
                        </Paragraph>
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

export default withRouter(OtherOpportunities);
