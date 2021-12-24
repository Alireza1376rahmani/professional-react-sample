import React from 'react';
import { Col, Paragraph, Row } from '../../../atoms';

const PromotionsDeals = ({ project }) => {
  const promotionsDealsData = project?.promotionsDeals
    ? project?.promotionsDeals[0]?.longValues || []
    : [];

  return (
    <>
      <Row gutter={16} mb={30} align='middle'>
        {project?.FeaturedImages?.formats?.thumbnail?.url && (
          <Col span={12}>
            <img
              src={project?.FeaturedImages?.url}
              alt='FeaturedImages'
              style={{
                borderRadius: '10px',
                width: '100%',
                height: '500px',
              }}
            />
          </Col>
        )}
        {!!project?.Media?.length && !!project?.Media[0]?.Images?.length && (
          <Col span={12}>
            <img
              src={project?.Media[0]?.Images[project?.Media[0]?.Images?.length - 1]?.url}
              alt='FeaturedImages'
              style={{
                borderRadius: '10px',
                width: '100%',
                height: '500px',
              }}
            />
          </Col>
        )}
      </Row>
      <Row back_color='#F6F6F6' align='middle' padding='15px 30px' radius='10px' mb={60}>
        <Paragraph type='destructive' mb={0}>
          ** Registration is intended for buyers only. No Agents.**
        </Paragraph>
      </Row>
      {promotionsDealsData.map(el => (
        <Row mb={30} key={el.id}>
          <Col span={24}>
            <Paragraph fw={600} mb={5}>
              {el.title}
            </Paragraph>
          </Col>
          <Col span={24}>
            <Paragraph type='secondary' lh='27px' mb={0} white_space={'pre-line'}>
              {el.value || ''}
            </Paragraph>
          </Col>
        </Row>
      ))}
    </>
  );
};

export default PromotionsDeals;
