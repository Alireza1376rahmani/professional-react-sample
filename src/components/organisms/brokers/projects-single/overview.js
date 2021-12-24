import React from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Col, Paragraph, Row } from '../../../atoms';
import BuildingIcon from '../../../../assets/images/custom-icons/BuildingIcon';
import KeyIcon from '../../../../assets/images/custom-icons/KeyIcon';
import ParkingIcon from '../../../../assets/images/custom-icons/ParkingIcon';

const Overview = ({ project }) => {
  const condosSpecs = project?.specification || [];
  const facilities = project?.facilitiesTitle || [];

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
                height: '400px',
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
                height: '400px',
              }}
            />
          </Col>
        )}
      </Row>
      <Row
        align='middle'
        mb={30}
        className={
          (project.StorageCount || '0') === '0' &&
          (project.ComboCount || '0') === '0' &&
          (project.ParkingCounts || '0') === '0'
            ? 'hidden'
            : undefined
        }
      >
        <Paragraph
          mb={0}
          fz={14}
          fw={600}
          type='secondary'
          margin='0 25px 0 0'
          className={(project.StorageCount || '0') !== '0' ? undefined : 'hidden'}
        >
          <BuildingIcon style={{ marginRight: '5px' }} />
          {project.StorageCount || '0'}
        </Paragraph>
        <Paragraph
          mb={0}
          fz={14}
          fw={600}
          type='secondary'
          margin='0 25px 0 0'
          className={(project.ComboCount || '0') !== '0' ? undefined : 'hidden'}
        >
          <KeyIcon style={{ marginRight: '5px' }} />
          {project.ComboCount || '0'}
        </Paragraph>
        <Paragraph
          mb={0}
          fz={14}
          fw={600}
          type='secondary'
          margin='0 25px 0 0'
          className={(project.ParkingCounts || '0') !== '0' ? undefined : 'hidden'}
        >
          <ParkingIcon style={{ marginRight: '5px' }} />
          {project.ParkingCounts || '0'}
        </Paragraph>
      </Row>
      {project?.Notes && (
        <Paragraph type='secondary' mb={100}>
          {project?.Notes}
        </Paragraph>
      )}
      <Row gutter={24} mb={60}>
        {condosSpecs.map(el => (
          <Col span={12} key={el.id}>
            <Row border_bot='1px solid #D7D7D7'>
              <Paragraph mb={10} fz={16}>
                {el?.mainTitle}
              </Paragraph>
            </Row>
            {el?.titleValue &&
              el?.titleValue.map(values => (
                <Row key={values?.id} border_bot='1px solid #D7D7D7' padding='10px 0'>
                  <Col span={12}>
                    <Paragraph mb={0} fz={12}>
                      {values?.title}
                    </Paragraph>
                  </Col>
                  <Col span={12}>
                    <Paragraph mb={0} fz={12}>
                      {values?.value}
                    </Paragraph>
                  </Col>
                </Row>
              ))}
          </Col>
        ))}
      </Row>
      <Paragraph
        type='secondary'
        fz={16}
        fw={600}
        className={facilities.length > 0 ? undefined : 'hidden'}
      >
        Facilities
      </Paragraph>
      <Row>
        {facilities.map(el => (
          <Col key={el.id} span={8}>
            <Paragraph mb={15}>
              <CheckOutlined style={{ color: '#2F8A09', marginRight: '10px' }} />
              {el.titles}
            </Paragraph>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Overview;
