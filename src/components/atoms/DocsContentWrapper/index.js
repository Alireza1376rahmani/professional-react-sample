import styled, { css } from 'styled-components';

const DocsContentWrapper = styled.div`
  border: 1px solid #f1eaff;
  border-radius: 10px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}
  ${props =>
    props.border &&
    css`
      border: ${props.border};
    `}
  ${props =>
    props.padding &&
    css`
      padding: ${props.padding};
    `}
  ${props =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `}
`;

export default DocsContentWrapper;
