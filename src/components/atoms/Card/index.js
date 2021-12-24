import styled, { css } from 'styled-components';
import { Card as card } from 'antd';
import propTypes from 'prop-types';

const Card = styled(card)`
  margin-bottom: 30px;

  ${props =>
    (props.mb || props.mb === 0) &&
    css`
      margin-bottom: ${props.mb}px !important;
    `}

  .ant-card-head {
    color: #101d5b;
    font-size: 20px;
    padding: 0 30px;

    .ant-card-extra {
      svg {
        font-size: 20px;
        cursor: pointer;
        color: #00dace;
      }
    }
  }
  .ant-card-body {
    padding: 30px;
  }
  ${props =>
    props.hpadding &&
    css`
      .ant-card-head {
        padding: ${props.hpadding};
      }
    `}
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}
  ${props =>
    props.bpadding &&
    css`
      .ant-card-body {
        padding: ${props.bpadding};
      }
    `}
    ${props =>
    props.bheight &&
    css`
      .ant-card-body {
        height: ${props.bheight}px;
      }
    `}
    ${props =>
    props.bshadow &&
    css`
      .ant-card-body {
        box-shadow: ${props.bshadow};
      }
    `}
  ${props =>
    props.b_backcolor &&
    css`
      .ant-card-body {
        background-color: ${props.b_backcolor};
      }
    `}
  ${props =>
    props.extrasize &&
    css`
      .ant-card-head .ant-card-extra svg {
        font-size: ${props.extrasize};
      }
    `}
  ${props =>
    props.extracolor &&
    css`
      .ant-card-head .ant-card-extra svg {
        color: ${props.extracolor};
      }
    `}
  ${props =>
    props.hide === 'body' &&
    css`
      .ant-card-body {
        display: none;
      }
    `}
  ${props =>
    props.hide === 'header' &&
    css`
      .ant-card-head {
        display: none;
      }
    `}
  ${props =>
    props.title_fz &&
    css`
      .ant-card-head-title {
        font-size: ${props.title_fz}px;
      }
    `}
  ${props =>
    props.title_padding &&
    css`
      .ant-card-head-title {
        padding: ${props.title_padding};
      }
    `}
  ${props =>
    props.extra_padding &&
    css`
      .ant-card-extra {
        padding: ${props.extra_padding};
      }
    `}
  ${props =>
    props.titlecolor &&
    css`
      .ant-card-head-title {
        color: ${props.titlecolor};
      }
    `}
  ${props =>
    props.b_align &&
    css`
      .ant-card-body {
        text-align: ${props.b_align};
      }
    `}
  ${props =>
    props.cursor &&
    css`
      cursor: ${props.cursor};
    `}
  ${props =>
    props.hwhite_space &&
    css`
      .ant-card-head-title {
        white-space: ${props.hwhite_space};
      }
    `}
  @media screen and (max-width: 768px) {
    .ant-card-body {
      padding: 15px;
    }

    .ant-card-head {
      padding: 0 15px;
    }

    ${props =>
      props.bpadding &&
      css`
        .ant-card-body {
          padding: ${props.bpadding};
        }
      `}
  }
`;

Card.propTypes = {
  type: propTypes.string,
};

Card.defaultProps = {};

/** @component */
export default Card;
