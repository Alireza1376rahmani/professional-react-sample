import styled, { css } from 'styled-components';
import { Form as form } from 'antd';

const Form = styled(form)`
  ${props =>
    props.margin &&
    css`
      margin: ${props.margin};
    `}
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}
  ${props =>
    props.overflow &&
    css`
      overflow: ${props.overflow};
    `}
  ${props =>
    props.justify &&
    css`
      justify-content: ${props.justify};
    `}
`;

export default Form;
