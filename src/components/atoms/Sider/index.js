import styled, { css } from 'styled-components';
import { Layout as layout } from 'antd';

const Sider = styled(layout.Sider)`
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
    props.shadow &&
    css`
      box-shadow: ${props.shadow};
    `}
`;

export default Sider;
