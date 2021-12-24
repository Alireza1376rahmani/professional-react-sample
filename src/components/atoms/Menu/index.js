import styled, { css } from 'styled-components';
import { Menu as menu } from 'antd';

const Menu = styled(menu)`
  ${props =>
    props.type === 'sidebar' &&
    css`
      border-right: 0;
      padding-bottom: 30px;

      .ant-menu-item {
        color: #717579;
        background-color: #fff !important;
        max-width: 100%;

        &:hover {
          color: #886cc0;
          path {
            fill: #886cc0;
          }
        }

        .case_icon svg {
          width: 18px;
        }
        .ant-menu-item-icon {
          width: 24px;
        }

        &.ant-menu-item-selected,
        &:active,
        .ant-menu-submenu-title:active {
          background-color: #f1eaff !important;
          border-radius: 0 10px 50px 0;
          width: calc(100% - 40px);
          color: #886cc0;
          font-weight: 700;

          :after {
            left: 0;
            right: unset;
            border-radius: 0 57px 57px 0;
            border-right: 9px solid #886cc0;
          }

          path {
            fill: #886cc0;
          }
        }
      }

      .ant-menu-sub {
        background-color: #fff;

        .ant-menu-item {
          padding-left: 65px !important;
        }
      }
      .ant-menu-item,
      .ant-menu-submenu {
        font-weight: 500;
        font-size: 16px;
        svg {
          font-size: 18px;
        }
      }
      .ant-menu-item:active,
      .ant-menu-submenu-title:active {
        background-color: #fff;
      }
      .ant-menu-submenu {
        color: #717579 !important;
        font-weight: 500 !important;
      }
      .ant-menu-submenu-title:hover {
        color: #886cc0 !important;

        path {
          fill: #886cc0;
        }
      }
      .ant-menu-submenu {
        .ant-menu-submenu-arrow {
          color: #717579 !important;
        }
        &:hover {
          .ant-menu-submenu-title > .ant-menu-submenu-arrow {
            color: #886cc0 !important;
            path {
              fill: #886cc0;
            }
          }
        }
      }
    `}
  ${props =>
    props.type === 'sidebar' &&
    props.sectype === 'collapsed' &&
    css`
      .ant-menu-item {
        &.ant-menu-item-selected,
        &:active,
        .ant-menu-submenu-title:active {
          width: 100%;
          border-radius: 0;
        }
      }
    `}
`;

export default Menu;
