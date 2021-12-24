import styled, { css } from 'styled-components';
import { Form } from 'antd';

const FormItem = styled(Form.Item)`
  max-width: 100% !important;
  font-size: 14px !important;
  line-height: 18px !important;
  font-weight: 500 !important;
  padding: 0 !important;
  margin-bottom: 10px;

  .ant-form-item-label {
    padding: 0 0 3px 0 !important;
    max-height: 30px;
  }

  .ant-form-item-control-input {
    min-height: 20px;
  }

  .ant-form-item-label > label {
    font-weight: 400;
    font-size: 14px;
    color: #717579;
    margin-bottom: 8px;

    &:before {
      color: #717579 !important;
    }
  }

  &:focus-within .ant-form-item-label > label {
    color: #886cc0;

    &:before {
      color: #886cc0 !important;
    }
  }

  ${props =>
    (props.label_mb || props.label_mb === 0) &&
    css`
      .ant-form-item-label > label {
        margin-bottom: ${props.label_mb}px;
      }
    `}
  ${props =>
    (props.mb || props.mb === 0) &&
    css`
      margin-bottom: ${props.mb}px;
    `}
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
  ${props =>
    props.margin_right &&
    css`
      margin-right: ${props.margin_right}!important;
    `}
  ${props =>
    props.justify &&
    css`
      .ant-form-item-control-input-content {
        display: flex;
        justify-content: ${props.justify}!important;
      }
    `}
  ${props =>
    props.layout === 'vertical' &&
    css`
      div {
        width: 100%;
        text-align: start;
      }
    `}
  ${props =>
    props.labelcolor &&
    css`
      .ant-form-item-label > label {
        color: ${props.labelcolor};
      }
    `}
  ${props =>
    props.labelalign &&
    css`
      .ant-form-item-label {
        text-align: ${props.labelalign};
      }
    `}
  ${props =>
    props.labelheight &&
    css`
      .ant-form-item-label {
        height: ${props.labelheight};
      }
    `}
  ${props =>
    props.hide === 'requiredText' &&
    css`
      .ant-form-item-explain {
        display: none;
      }
    `}
  ${props =>
    props.error_padding &&
    css`
      .ant-form-item-explain {
        padding: ${props.error_padding};
      }
    `}
  ${props =>
    props.display_item === 'none' &&
    css`
      .ant-form-item-control-input {
        display: ${props.display_item};
      }
    `}
  ${props =>
    props.show_only === 'validate' &&
    css`
      .ant-form-item-control-input,
      .ant-form-item-label {
        display: none;
      }
    `}
`;

FormItem.defaultProps = {};

/** @component */
export default FormItem;
