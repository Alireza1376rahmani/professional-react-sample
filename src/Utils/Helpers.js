import { CheckOutlined } from '@ant-design/icons';
import React from 'react';
import { additionalQuestionsKeys } from '../constants/etc';

export const createProspectListText = prospects => {
  if (!prospects) return '';

  let listText = '';
  for (let i = 0; i < prospects.length; i += 1) {
    if (i > 1) {
      listText += '...';
      break;
    }
    listText += `${prospects[i].FirstName} ${prospects[i].LastName}${
      i !== prospects.length - 1 ? ', ' : ''
    }`;
  }
  return listText;
};

export const sortAllocData = data => {
  const filteredData = data.filter(el => el.AllocationStatus !== 'cancelled');
  const pendingData = filteredData.filter(el => el.AllocationStatus === 'pending');
  const leftData = filteredData.filter(el => el.AllocationStatus !== 'pending');
  return [...pendingData, ...leftData];
};

export const convertProfileData = (defData, values) => {
  const defCopy = { ...defData };
  Object.keys(values).forEach(key => {
    if (additionalQuestionsKeys.includes(key)) {
      defCopy.additionalQuestions[key] = values[key];
    } else {
      defCopy[key] = values[key];
    }
  });
  return defCopy;
};

export const checkMultiple = count => (count && parseInt(count, 10) > 1 ? 's' : '');

export const filterOption = (value, option) =>
  option.children.toLowerCase().includes(value.toLowerCase());

export const filterEmptyValues = values => {
  const extraData = {};
  Object.keys(values).forEach(key => {
    if (values[key]) {
      extraData[key] = values[key];
    }
  });
  return extraData;
};

export const checkExistIcon = item => (item ? <CheckOutlined style={{ color: '#EF3E36' }} /> : '-');
export const twoDigitFormat = num =>
  Number(num).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

export const checkAllSelect = (values = [], key, form, setState = () => {}) => {
  if (values.includes('all')) {
    if (values.indexOf('all') !== 0) {
      setFieldValue(key, ['all'], setState, form);
    }
    if (values.length === 1 && values.indexOf('all') === 0) {
      setFieldValue(key, values, setState, form);
    }
    if (values.length > 1 && values.indexOf('all') === 0) {
      setFieldValue(
        key,
        values.filter(el => el !== 'all'),
        setState,
        form
      );
    }
  } else if (values.includes('any')) {
    if (values.indexOf('any') !== 0) {
      setFieldValue(key, ['any'], setState, form);
    }
    if (values.length === 1 && values.indexOf('any') === 0) {
      setFieldValue(key, values, setState, form);
    }
    if (values.length > 1 && values.indexOf('any') === 0) {
      setFieldValue(
        key,
        values.filter(el => el !== 'any'),
        setState,
        form
      );
    }
  } else {
    setFieldValue(
      key,
      values.filter(el => el !== 'all' && el !== 'any'),
      setState,
      form
    );
  }
};

const setFieldValue = (key, value, setState, form) => {
  form.setFieldsValue({ [key]: value });
  if (setState) {
    setState(value);
  }
};
