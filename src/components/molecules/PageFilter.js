import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { CaretDownFilled, FilterFilled } from '@ant-design/icons';
import { Paragraph, Row } from '../atoms';

const PageFilterWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
  border-bottom: 1px solid #eeeeee;

  .filter_trigger_wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 10px;

    .anticon-filter {
      margin-right: 8px;
    }
    .anticon-caret-down {
      margin-left: 10px;
      color: #d7d7d7;
      font-size: 12px;
      transition: all ease 0.2s;
    }

    &:hover {
      .anticon-caret-down {
        color: #717579;
      }
    }
  }

  .filter_inputs_wrapper {
    width: 100%;
    overflow: hidden;
    height: 0;
    margin-bottom: 0;
    transition: all ease 0.3s;
    display: flex;
    align-items: center;
  }

  ${props =>
    props.opened === 'open' &&
    css`
      .anticon-caret-down {
        transform: rotate(180deg);
      }
      .filter_inputs_wrapper {
        margin-bottom: 15px;
        height: 40px;
      }
    `}
`;

const PageFilter = ({ children }) => {
  const [inputsOpen, setInputsOpen] = useState(false);

  return (
    <PageFilterWrapper opened={inputsOpen ? 'open' : ''}>
      <Row>
        <Paragraph type='secondary' fz={18} mb={0}>
          <div className='filter_trigger_wrapper' onClick={() => setInputsOpen(!inputsOpen)}>
            <FilterFilled /> Filter <CaretDownFilled />
          </div>
        </Paragraph>
      </Row>
      <div className='filter_inputs_wrapper'>
        <Row gutter={24} width='100%'>
          {children}
        </Row>
      </div>
    </PageFilterWrapper>
  );
};

export default PageFilter;
