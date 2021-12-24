import styled, { css } from 'styled-components';
import { Divider as divider } from 'antd';

const Divider = styled(divider)`
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}
`;

/** @component */
export default Divider;
