import styled, { css } from 'styled-components';
import { Layout as layout } from 'antd';

const Header = styled(layout.Header)`
  height: auto;
  line-height: initial;
  ${props =>
    props.back_color &&
    css`
      background-color: ${props.back_color};
    `}
  ${props =>
    props.padding &&
    css`
      padding: ${props.padding};
    `}
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}
`;

export default Header;
