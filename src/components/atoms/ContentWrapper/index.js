import styled, { css } from 'styled-components';

const ContentWrapper = styled.div`
  background-color: #fff;
  padding: 10px 30px;
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background: #b5aad2;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a28bd2;
  }

  ${props =>
    (props.mb || props.mb === 0) &&
    css`
      margin-bottom: ${props.mb}px !important;
    `}
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
  ${props =>
    props.padding &&
    css`
      padding: ${props.padding};
    `}
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
    props.max_height &&
    css`
      max-height: ${props.max_height};
    `}
  ${props =>
    props.min_width &&
    css`
      min-width: ${props.min_width};
    `}
  ${props =>
    props.color &&
    css`
      color: ${props.color};
    `}
  ${props =>
    props.overflow_y &&
    css`
      overflow-y: ${props.overflow_y};
    `}
  ${props =>
    props.shadow &&
    css`
      box-shadow: ${props.shadow};
    `}
  ${props =>
    props.back_color &&
    css`
      background-color: ${props.back_color};
    `}
`;

export default ContentWrapper;
