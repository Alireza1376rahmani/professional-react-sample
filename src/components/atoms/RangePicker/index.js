import styled, { css } from 'styled-components';
import { DatePicker } from 'antd';

const { RangePicker: rangePicker } = DatePicker;

const RangePicker = styled(rangePicker)`
  background: #ffffff;
  border: 1px solid #eeeeee;
  box-sizing: border-box;
  //border-radius: 50px;
  //height: 44px;
  height: 35px;
  padding: 0 15px;
  font-weight: 300;

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

  .ant-picker-active-bar {
    background-color: #886cc0;
  }
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
    props.radius &&
    css`
      border-radius: ${props.radius};
    `}
`;

export default RangePicker;
