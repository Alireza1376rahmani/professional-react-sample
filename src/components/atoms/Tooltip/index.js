import styled, { css } from 'styled-components';
import { Tooltip as tooltip } from 'antd';

const Tooltip = styled(tooltip)`
  ${props =>
    (props.mb || props.mb === 0) &&
    css`
      margin-bottom: ${props.mb}px!important;
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
    props.text_color &&
    css`
      .ant-tooltip-inner {
        color: ${props.text_color}!important;
      }
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
    props.cursor &&
    css`
      cursor: ${props.cursor};
    `}
`;

/** @component */
export default Tooltip;
