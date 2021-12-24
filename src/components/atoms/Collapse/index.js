import { Collapse as collapse } from 'antd';
import styled, { css } from 'styled-components';

const Collapse = styled(collapse)`
  .ant-collapse-arrow svg {
    font-size: 14px;
    color: #717579;
  }
  ${props =>
    (props.mb || props.mb === 0) &&
    css`
      margin-bottom: ${props.mb}px!important;
    `}
  ${props =>
    (props.head_mb || props.head_mb === 0) &&
    css`
      .ant-collapse-header {
        margin-bottom: ${props.head_mb}px !important;
      }
    `}
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
  ${props =>
    props.border &&
    css`
      border: ${props.border};
    `}
  ${props =>
    props.radius &&
    css`
      border-radius: ${props.radius};
    `}
  ${props =>
    props.padding &&
    css`
      padding: ${props.padding}!important;
    `}
  ${props =>
    props.width &&
    css`
      width: ${props.width}!important;
    `}
  ${props =>
    props.height &&
    css`
      height: ${props.height}!important;
    `}
  ${props =>
    props.back_color &&
    css`
      background-color: ${props.back_color}!important;
    `}
  ${props =>
    props.border_bot &&
    css`
      border-bottom: ${props.border_bot};
    `}
  ${props =>
    props.border_top &&
    css`
      border-top: ${props.border_top};
    `}
  ${props =>
    props.head_padding &&
    css`
      .ant-collapse-header {
        padding: ${props.head_padding}!important;
      }
    `}
  ${props =>
    props.arrow_right &&
    css`
      .ant-collapse-arrow {
        right: ${props.arrow_right}!important;
      }
    `}
  ${props =>
    props.content_padding &&
    css`
      .ant-collapse-content-box {
        padding: ${props.content_padding}!important;
      }
    `}
`;

export default Collapse;
