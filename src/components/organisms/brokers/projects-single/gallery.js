import React, { useState } from 'react';
import { Avatar, Button, List, Paragraph, Row } from '../../../atoms';
import ProjectGalleryModal from '../../../molecules/ProjectGalleryModal';

const Gallery = ({ project }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const galleryData = project?.Media || [];

  return (
    <>
      {selectedCategory && (
        <ProjectGalleryModal
          closeModal={() => setSelectedCategory(null)}
          categoryData={selectedCategory}
        />
      )}
      <List
        dataSource={galleryData}
        title_align='center'
        title_width='100%'
        meta_align='center'
        title_mb={0}
        item_mb={15}
        item_back='#fff'
        item_padding='20px'
        item_radius='20px'
        total_pos='left'
        item_shadow='0px 4px 4px rgba(0, 0, 0, 0.04)'
        item_hover_shadow='0 3px 4px 1px #0000001c'
        pagination={{
          pageSize: 6,
          showSizeChanger: false,
          hideOnSinglePage: true,
          showTotal: (total, current) => (
            <Paragraph type='secondary' fw={400} fz={16}>
              Showing {current[0]}-{current[1]} of {galleryData.length}
            </Paragraph>
          ),
        }}
        renderItem={item => (
          <List.Item key={item?.id}>
            <List.Item.Meta
              title={
                <Row justify='space-between' align='middle'>
                  <Paragraph mb={0} fz={16}>
                    {item?.MediaCategoryName}
                  </Paragraph>
                  <Button
                    padding='0'
                    type='primary'
                    sectype='ghost'
                    onClick={() => setSelectedCategory(item)}
                  >
                    View gallery
                  </Button>
                </Row>
              }
              avatar={
                <Avatar
                  size={50}
                  shape='square'
                  radius='10px'
                  style={{ backgroundColor: '#F1EAFF' }}
                  src={!!item?.Images.length && item?.Images[0]?.url}
                />
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default Gallery;
