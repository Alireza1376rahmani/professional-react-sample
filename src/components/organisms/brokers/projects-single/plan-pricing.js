import React from 'react';
import { Avatar, Col, List, Paragraph, Row } from '../../../atoms';
import { checkMultiple } from '../../../../Utils/Helpers';

const PlanPricing = ({ project }) => {
  const projectUnits = project?.marketingInformation || [];
  return (
    <List
      title_align='center'
      title_width='100%'
      meta_align='center'
      title_mb={0}
      item_mb={15}
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
            Showing {current[0]}-{current[1]} of {projectUnits.length}
          </Paragraph>
        ),
      }}
      dataSource={projectUnits}
      renderItem={(item, index) => (
        <a
          href={item?.downloadableDocument || item?.unitFeaturedImage?.url}
          target='_blank'
          rel='noreferrer'
        >
          <List.Item key={index}>
            <List.Item.Meta
              avatar={
                <Avatar
                  size={100}
                  shape='square'
                  radius='10px'
                  style={{ backgroundColor: '#FFF' }}
                  src={item?.unitFeaturedImage?.url}
                />
              }
              title={
                <Row gutter={24}>
                  <Col span={10}>
                    <Paragraph fz={18} mb={30}>
                      {item?.modelCode || ''} | {item?.Type || ''}
                    </Paragraph>
                    <Paragraph mb={5} fz={10} fw={600} color='#B3C5B4'>
                      Price
                    </Paragraph>
                    <Paragraph mb={0} fz={14} fw={600} color='#886CC0'>
                      ${item?.unitPrice?.toLocaleString() || '0'}
                    </Paragraph>
                  </Col>
                  <Col span={14}>
                    <Paragraph mb={15} fw={600} type='secondary'>
                      {item?.unitStatus}
                    </Paragraph>
                    <Row>
                      <Paragraph mb={0} fw={600} type='secondary'>
                        {item?.unitArea || '0'} SqFt, {item?.roomNumber || '0'} Beds
                        {checkMultiple(item?.roomNumber)}, {item?.bathroomNumber || '0'} Baths
                        {checkMultiple(item?.bathroomNumber)}
                      </Paragraph>
                    </Row>
                  </Col>
                </Row>
              }
            />
          </List.Item>
        </a>
      )}
    />
  );
};

export default PlanPricing;
