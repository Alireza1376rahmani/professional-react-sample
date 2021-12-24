import styled, { css } from 'styled-components';
import { Select as select } from 'antd';

const Select = styled(select)`
  width: 100%;
  .ant-select-selector {
    background: #fff !important;
    border: 1px solid #eeeeee !important;
    box-sizing: border-box;
    //border-radius: 50px !important;
    //height: 44px !important;
    height: 35px !important;
    font-weight: 300;
    padding: 12px 15px !important;
    display: flex;
    align-items: center;
  }

  &:hover {
    border-color: #886cc0;
  }
  &:focus,
  &.ant-input-focused {
    border-color: #886cc0;
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 0 0 2px #886cc02e;
  }

  &.ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    color: #00000096;
  }
  ${props =>
    props.mode === 'multiple' &&
    css`
      .ant-select-selector {
        padding: 0 5px !important;
      }
    `}
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
    props.padding &&
    css`
      padding: ${props.padding}!important;
    `}
  ${props =>
    props.max_width &&
    css`
      max-width: ${props.max_width}!important;
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
    props.cursor &&
    css`
      cursor: ${props.cursor};
    `}
  ${props =>
    props.back_color &&
    css`
      .ant-select-selector {
        background-color: ${props.back_color}!important;
      }
    `}
`;

export default Select;
