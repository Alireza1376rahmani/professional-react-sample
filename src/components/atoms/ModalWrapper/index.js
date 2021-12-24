import React from 'react';
import styled from 'styled-components';

const ModalWrapperComp = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  background-color: rgba(8, 26, 51, 0.8);
  z-index: 300;
  overflow-y: auto;
`;

const ModalWrapper = ({ children, closeModal }) => {
  return <ModalWrapperComp onClick={closeModal}>{children}</ModalWrapperComp>;
};

export default ModalWrapper;
