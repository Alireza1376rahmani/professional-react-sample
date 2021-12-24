import React from 'react';
import styled from 'styled-components';
import { ContentWrapper, Row, Col, Paragraph } from '../../../atoms';

const Indicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #886cc0;
  margin: 7px 10px 0 0;
`;

const FeaturesFinishes = ({ project }) => {
  const featuresData = project?.featuresFinishes || [];
  if (featuresData.length <= 0) return <Row />;
  return (
    <Row>
      {featuresData &&
        featuresData.map(el => (
          <Col span={24} key={el.id}>
            <ContentWrapper mb={30} padding='30px' shadow='0 0 3px 3px #efefef'>
              <Paragraph fz={18} mb={15}>
                {el.mainTitle}
              </Paragraph>
              {el?.longValues &&
                el?.longValues.map(point => (
                  <Row mb={15} key={point?.id}>
                    <Indicator />
                    <Paragraph mb={0} width='calc(100% - 20px)'>
                      {point?.value}
                    </Paragraph>
                  </Row>
                ))}
            </ContentWrapper>
          </Col>
        ))}
    </Row>
  );
};

export default FeaturesFinishes;
