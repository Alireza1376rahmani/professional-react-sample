import styled, { css } from 'styled-components';
import { Table as table } from 'antd';
import propTypes from 'prop-types';

const Table = styled(table)`
  .ant-table {
    border: 1px solid #e8eef4;
    box-sizing: border-box;
    border-radius: 4px 4px 0 0;
  }

  //table {
  //  table-layout: fixed !important;
  //}

  .docs_table_header {
    display: flex;
    justify-content: space-between;
  }

  .documents_status {
    .anticon {
      margin-right: 10px;

      &.anticon-check-circle {
        color: #00dace;
      }

      &.anticon-exclamation-circle {
        color: #fc5e7a;
      }
      &.anticon-close-circle {
        color: #fc5e7a;
      }
      &.anticon-clock-circle {
        color: #35a5e4;
      }
    }
  }

  .ant-table-cell {
    padding: 5px;
  }
  }

  .ant-table-title {
    border-bottom: 1px solid #e8eef4;
  }
  .ant-table-thead {
    .ant-table-cell {
      padding: 7px 10px !important;
    }
    > tr > th {
      background-color: #fff;
      font-weight: 500;
      font-size: 16px;
      color: #171b1e;
    }
  }
  .ant-table-tbody {
    .ant-table-row {
      &:nth-child(odd) {
        background-color: #fafafb;
      }
    }
    .ant-table-cell {
      padding: 5px 10px !important;
    }
    > tr {
      td {
        font-size: 14px;
        color: #717579;
        font-weight: 350;
      }

      &:last-child {
        > td {
          border-bottom: 0;
        }
      }
    }
  }
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
  ${props =>
    props.colswidth &&
    css`
      th {
        width: ${props.colswidth};
      }
    `}
  ${props =>
    props.mb &&
    css`
      margin-bottom: ${props.mb};
    `}
  ${props =>
    props.row &&
    css`
      .ant-table-cell {
        width: ${props.row};
      }
    `}
  ${props =>
    props.headcolor &&
    css`
      .ant-table-thead > tr > th {
        color: ${props.headcolor};
      }
    `}
  ${props =>
    props.headerbackcolor &&
    css`
      .ant-table-thead > tr > th {
        background-color: ${props.headerbackcolor};
      }
    `}
  ${props =>
    props.footerbackcolor &&
    css`
      .ant-table-footer {
        background-color: ${props.footerbackcolor};
      }
    `}
  ${props =>
    props.expand_back &&
    css`
      .ant-table-expanded-row .ant-table-cell {
        background-color: ${props.expand_back};
      }
    `}
  ${props =>
    props.footertopborder &&
    css`
      .ant-table-footer {
        border-top: ${props.footertopborder}!important;
      }
    `}
  ${props =>
    props.footerpadding &&
    css`
      .ant-table-footer {
        padding: ${props.footerpadding}!important;
      }
    `}
  ${props =>
    props.cell_padding &&
    css`
      .ant-table-cell {
        padding: ${props.cell_padding}!important;
      }
    `}
  ${props =>
    props.bodycolor &&
    css`
      .ant-table-tbody > tr td {
        color: ${props.bodycolor};
      }
    `}
  ${props =>
    props.bodyweight &&
    css`
      .ant-table-tbody > tr td {
        font-weight: ${props.bodyweight};
      }
    `}
  ${props =>
    props.hide === 'body' &&
    css`
      .ant-table-tbody {
        display: none;
      }
      .ant-table,
      .ant-table-container {
        border-bottom: none;
      }
      .ant-table-thead > tr > th {
        border-bottom: none;
      }
    `}
  ${props =>
    props.extra === 'pagination' &&
    css`
      .ant-pagination-total-text {
        margin-right: auto;
      }
      .ant-pagination-item {
        background-color: #f1eaff !important;
        border-radius: 50%;
        border: 1px solid #886cc0 !important;
        a {
          color: #886cc0;
        }

        &:hover,
        &.ant-pagination-item-active {
          background-color: #886cc0 !important;
          a {
            color: #fff;
          }
        }
      }

      .ant-pagination-item-ellipsis,
      .ant-pagination-item-link-icon {
        color: #886cc0 !important;
      }

      .ant-pagination-prev,
      .ant-pagination-next {
        button {
          background-color: transparent;
          border-radius: 50%;
          border: 1px solid #886cc0;
          color: #886cc0;
        }

        &.ant-pagination-disabled,
        &.ant-pagination-disabled:hover {
          button {
            color: rgba(0, 0, 0, 0.25);
            border-color: #d9d9d9;
            background-color: transparent;
          }
        }

        &:hover {
          button {
            background-color: #886cc0;
            border-radius: 50%;
            border-color: #886cc0;
            color: #fff;
          }
        }
      }
    `}
${props =>
  props.pagination_margin &&
  css`
    .ant-pagination {
      margin: ${props.pagination_margin};
    }
  `}
    ${props =>
      props.rowHeight &&
      css`
        .ant-table-thead > tr {
          height: ${props.rowHeight}px;
        }
      `}
    ${props =>
      props.flex === 'contents' &&
      css`
        .ant-table-thead > tr {
          display: contents;
        }
      `}
    ${props =>
      props.flex === 'contents-none' &&
      css`
        .ant-table-thead > tr > .ant-table-cell {
          padding: 11px 16px;
        }
      `}
`;

Table.propTypes = {
  type: propTypes.string,
};

Table.defaultProps = {};

/** @component */
export default Table;
