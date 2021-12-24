import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Col, ContentWrapper, List, Paragraph, Row } from '../atoms';
import BuildingIcon from '../../assets/images/custom-icons/BuildingIcon';
import KeyIcon from '../../assets/images/custom-icons/KeyIcon';
import ParkingIcon from '../../assets/images/custom-icons/ParkingIcon';
import { fetchProjects } from '../../actions/projects';
import { getProjects } from '../../selectors/projects';

const OtherProjects = ({ pageTitle, redirectUrl, history }) => {
  const dispatch = useDispatch();
  const { projects } = useSelector(getProjects);
  const projectsData = projects || [];

  useEffect(() => {
    dispatch(fetchProjects.request({ _limit: 6, _sort: 'created_at:DESC' }));
  }, []);

  return (
    <ContentWrapper padding='5px 20px' height='520px' overflow_y='auto'>
      <Card
        titlecolor='#717579'
        hpadding='0'
        bpadding='0'
        title_padding='0'
        extra_padding='0'
        meta_mb={20}
        bordered={false}
        title={pageTitle || 'Featured Projects'}
        mb={0}
        extra={
          <Button
            type='primary'
            sectype='ghost'
            padding='0'
            onClick={() => history.push(redirectUrl || '/projects')}
          >
            View All
          </Button>
        }
      >
        <List
          dataSource={projectsData}
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
                        {item?.StorageCount || '0'}
                      </Paragraph>
                      <Paragraph mb={0} fz={14} fw={600} type='secondary' margin='0 25px 0 0'>
                        <KeyIcon style={{ marginRight: '5px' }} />
                        {item?.ComboCount || '0'}
                      </Paragraph>
                      <Paragraph mb={0} fz={14} fw={600} type='secondary' margin='0 25px 0 0'>
                        <ParkingIcon style={{ marginRight: '5px' }} /> {item?.ParkingCounts || '0'}
                      </Paragraph>
                    </Row>
                  </Col>
                  <Col padding='0'>
                    <Button
                      type='outline'
                      onClick={() => history.push(`${redirectUrl || '/projects'}/${item.id}`)}
                    >
                      See Details
                    </Button>
                  </Col>
                </Row>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar size={100} shape='square' radius='10px' src={item?.Logo?.url || ''} />
                }
                title={
                  <Paragraph mb={5} fz={18}>
                    {item?.ProjectName}
                  </Paragraph>
                }
                description={
                  <>
                    <Paragraph mb={10} fz={14} fw={600}>
                      {`${item?.UnitCount || 'No'} Units,  ${item?.StoryCount || 'No'} Stories`}
                    </Paragraph>
                    <Row gutter={24} justify='space-between'>
                      <Col>
                        <Paragraph mb={5} fz={10} fw={600} type='secondary'>
                          Price from
                        </Paragraph>
                        <Paragraph mb={0} fz={14} fw={600} color='#886CC0'>
                          $
                          {item?.projectPriceRange?.priceFrom
                            ? parseInt(item?.projectPriceRange?.priceFrom, 10).toLocaleString()
                            : '360,000'}
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

export default withRouter(OtherProjects);
