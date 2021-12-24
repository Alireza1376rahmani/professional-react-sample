import styled, { css } from 'styled-components';
import { Typography } from 'antd';

const { Paragraph: paragraph } = Typography;
const Paragraph = styled(paragraph)`
  margin-bottom: 10px;
  color: #171b1e;
  font-weight: 500;

  ${props =>
    props.type === 'primary' &&
    css`
      color: #886cc0 !important;
    `}
  ${props =>
    props.type === 'secondary' &&
    css`
      color: #717579 !important;
    `}
  ${props =>
    props.ml &&
    css`
      margin-left: ${props.ml}px;
    `}
  ${props =>
    props.type === 'destructive' &&
    css`
      color: #ef3e36;
    `}
  ${props =>
    (props.mb || props.mb === 0) &&
    css`
      margin-bottom: ${props.mb}px!important;
    `}
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin}!important;
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
    props.max_width &&
    css`
      max-width: ${props.max_width}!important;
    `}
  ${props =>
    props.white_space &&
    css`
      white-space: ${props.white_space}!important;
    `}
  ${props =>
    props.text_overflow &&
    css`
      text-overflow: ${props.text_overflow}!important;
      overflow: hidden;
      white-space: nowrap;
      //display: block;
      //width: 100%;
      //white-space: nowrap;
      //overflow: hidden;
    `}
  ${props =>
    props.cursor &&
    css`
      cursor: ${props.cursor}!important;
    `}
  ${props =>
    props.hover_color &&
    css`
      &:hover {
        color: ${props.hover_color}!important;
      }
    `}
  ${props =>
    props.lh &&
    css`
      line-height: ${props.lh}!important;
    `}
  ${props =>
    props.fz &&
    css`
      font-size: ${props.fz}px;
    `}
  ${props =>
    props.mob_fz &&
    css`
      @media screen and (max-width: 600px) {
        font-size: ${props.mob_fz}px;
      }
    `}
  ${props =>
    props.tab_fz &&
    css`
      @media screen and (max-width: 992px) {
        font-size: ${props.tab_fz}px;
      }
    `}
  ${props =>
    props.fw &&
    css`
      font-weight: ${props.fw};
    `}
  ${props =>
    props.display &&
    css`
      display: ${props.display};
    `}
  ${props =>
    props.color &&
    css`
      color: ${props.color}!important;
    `}
  ${props =>
    props.padding &&
    css`
      padding: ${props.padding}!important;
    `}
  ${props =>
    props.align &&
    css`
      text-align: ${props.align};
    `}
  ${props =>
    props.vert_align &&
    css`
      display: flex;
      align-items: ${props.vert_align};
    `}
  ${props =>
    props.sectype === 'light' &&
    css`
      font-weight: 300;
    `}
  ${props =>
    props.sectype === 'intake' &&
    css`
      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
      @media screen and (max-width: 480px) {
        font-size: 14px;
      }
    `}
    ${props =>
    props.type === 'reviewsText' &&
    css`
      margin-top: 23px;
      line-height: 21px;
      padding-right: 110px;
      @media screen and (max-width: 768px) {
        font-size: 16px;
        padding-right: 0;
      }
      @media screen and (max-width: 480px) {
        font-size: 14px;
      }
    `}
    ${props =>
    props.class === 'reviewsName' &&
    css`
      font-size: 18px;
      line-height: 21px;
      color: #717579;
      margin-bottom: 9px !important;
    `}
    ${props =>
    props.size_type &&
    props.size_type === 'responsive' &&
    css`
      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
      @media screen and (max-width: 480px) {
        font-size: 14px;
      }
    `}
`;

/** @component */
export default Paragraph;
