import styled, { css } from 'styled-components';
import { Layout as layout } from 'antd';

const Content = styled(layout.Content)`
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
`;

export default Content;
