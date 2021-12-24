import styled, { css } from 'styled-components';
import { Typography } from 'antd';

const { Title: title } = Typography;
const Title = styled(title)`
  margin-bottom: 30px !important;
  color: #101d5b !important;
  font-weight: 500 !important;
  ${props =>
    props.level === 1 &&
    css`
      font-size: 36px !important;
      line-height: 40px !important;
    `}
  ${props =>
    props.level === 2 &&
    css`
      font-size: 24px !important;
      line-height: 28px !important;
    `}
  ${props =>
    props.level === 3 &&
    css`
      font-size: 18px !important;
      line-height: 16px !important;
    `}
  ${props =>
    props.level === 4 &&
    css`
      font-size: 16px !important;
      line-height: 24px !important;
    `}
  ${props =>
    props.level === 5 &&
    css`
      font-size: 14px !important;
      line-height: 24px !important;
    `}
  ${props =>
    props.level === 4 &&
    props.size_type === 'responsive' &&
    css`
      font-size: 14px !important;
      line-height: 24px !important;
    `}
  ${props =>
    props.level === 3 &&
    props.size_type === 'responsive' &&
    css`
      font-size: 16px !important;
      line-height: 24px !important;
    `}
  ${props =>
    props.level === 2 &&
    props.size_type === 'responsive' &&
    css`
      font-size: 18px !important;
      line-height: 16px !important;
    `}
  ${props =>
    props.level === 1 &&
    props.size_type === 'responsive' &&
    css`
      font-size: 24px !important;
      line-height: 28px !important;
    `}
  ${props =>
    props.mob_level === 2 &&
    css`
      @media screen and (max-width: 576px) {
        font-size: 24px !important;
        line-height: 28px !important;
      }
    `}
  ${props =>
    (props.mb || props.mb === 0) &&
    css`
      margin-bottom: ${props.mb}px !important;
    `}
  ${props =>
    props.color &&
    css`
      color: ${props.color} !important;
    `}
  ${props =>
    props.align &&
    css`
      text-align: ${props.align} !important;
    `}
  ${props =>
    props.line_height &&
    css`
      line-height: ${props.line_height} !important;
    `}
  ${props =>
    props.fw &&
    css`
      font-weight: ${props.fw} !important;
    `}
  ${props =>
    props.mt &&
    css`
      margin-top: ${props.mt}px;
    `}
`;

/** @component */
export default Title;
