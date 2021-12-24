import React from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';
import ModalContent from './ModalContent';
import { ModalWrapper } from '../atoms';

const CarouselWrapper = styled.div`
  padding: 15px 30px 30px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 70vh;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const ProjectGalleryModal = ({ categoryData, closeModal }) => {
  const imageList = categoryData?.Images || [];

  return (
    <ModalWrapper closeModal={closeModal}>
      <ModalContent title={categoryData?.MediaCategoryName || ''} closeModal={closeModal}>
        <CarouselWrapper>
          <Carousel autoplay={true} arrow>
            {imageList.map(el => (
              <ImageWrapper key={el.id}>
                <img src={el?.url} alt={el.name} />
              </ImageWrapper>
            ))}
          </Carousel>
        </CarouselWrapper>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ProjectGalleryModal;
