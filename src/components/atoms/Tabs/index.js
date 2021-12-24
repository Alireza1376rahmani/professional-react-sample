import styled, { css } from 'styled-components';
import { Tabs as tabs } from 'antd';

const Tabs = styled(tabs)`
  .ant-tabs-tab {
    .ant-tabs-tab-btn {
      font-size: 24px;
      color: #717579;
    }
  }

  .ant-tabs-tab-active {
    .ant-tabs-tab-btn {
      font-weight: 600;
    }
  }

  .ant-tabs-ink-bar {
    background-color: #886cc0;
    height: 3px;
    border-radius: 2px;
  }

  ${props =>
    props.tab_btn_color &&
    css`
      .ant-tabs-tab-btn {
        color: ${props.tab_btn_color}!important;
      }
    `}

  ${props =>
    props.list_padding &&
    css`
      .ant-tabs-nav-wrap {
        padding: ${props.list_padding}!important;
      }
    `}

  ${props =>
    props.tab_btn_fz &&
    css`
      .ant-tabs-tab-btn {
        font-size: ${props.tab_btn_fz}px!important;
      }
    `}
  ${props =>
    props.tab_btn_padding &&
    css`
      .ant-tabs-tab-btn {
        padding: ${props.tab_btn_padding}px!important;
      }
    `}
  ${props =>
    props.width &&
    css`
      width: ${props.width}!important;
    `}
  ${props =>
    props.active_tab_btn_fw &&
    css`
      .ant-tabs-tab-active {
        .ant-tabs-tab-btn {
          font-weight: ${props.active_tab_btn_fw} !important;
        }
      }
    `}
  ${props =>
    props.tab_btn_fw &&
    css`
      .ant-tabs-tab-btn {
        font-weight: ${props.tab_btn_fw} !important;
      }
    `}
  ${props =>
    props.active_tab_btn_color &&
    css`
      .ant-tabs-tab-active {
        .ant-tabs-tab-btn {
          color: ${props.active_tab_btn_color} !important;
        }
      }
    `}
  ${props =>
    props.active_tab_back_color &&
    css`
      .ant-tabs-tab-active {
        background-color: ${props.active_tab_back_color} !important;
        border-bottom-color: ${props.active_tab_back_color} !important;
      }
    `}
`;

export default Tabs;
