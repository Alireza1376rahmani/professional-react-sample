import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Button, Paragraph, Row } from '../atoms';

const ModalContentWrapper = styled.div`
  width: 70%;
  background-color: #fff;
  border-radius: 4px;
  position: relative;
  height: max-content;
  margin: 80px 0;
  transform: scale(0);
  transition: all ease 0.3s;

  ${props =>
    props.open_status === 'open' &&
    css`
      transform: scale(1);
    `}
  ${props =>
    props.width &&
    css`
      width: ${props.width}!important;
    `}
  ${props =>
    props.max_width &&
    css`
      max-width: ${props.max_width}!important;
    `}
`;

const ModalContent = ({ title, closeModal, children, customWidth, customMaxWidth }) => {
  const [openStatus, setOpenStatus] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setOpenStatus('open');
    }, 0);

    return () => setOpenStatus('');
  }, []);

  return (
    <ModalContentWrapper
      onClick={event => event.stopPropagation()}
      open_status={openStatus}
      width={customWidth}
      max_width={customMaxWidth}
    >
      <Row padding='15px 30px' align='middle' justify='space-between'>
        <Paragraph fz={20} fw={700} mb={0}>
          {title}
        </Paragraph>
        <Button type='grey_ghost' padding='0' height='fit-content' onClick={closeModal}>
          Close
        </Button>
      </Row>
      {children}
    </ModalContentWrapper>
  );
};

export default ModalContent;
