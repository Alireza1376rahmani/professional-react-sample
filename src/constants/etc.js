import React from 'react';
import SignedDocIcon from '../assets/images/custom-icons/SignedDocIcon';
import UnsignedDocIcon from '../assets/images/custom-icons/UnsignedDocIcon';
import InReviewDocIcon from '../assets/images/custom-icons/InReviewDocIcon';

export const phonePattern = /\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})/;
export const phoneMask = '(111) 111-1111';

export const postalPattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
export const postalMask = '*** ***';

export const floorPreferences = [
  { value: 'any', label: 'Any' },
  { value: 'low', label: 'Low' },
  { value: 'mid', label: 'Mid' },
  { value: 'high', label: 'High' },
];

export const docsContent = {
  signed: { icon: <SignedDocIcon />, text: 'Signed', color: '#81E18A' },
  unsigned: { icon: <UnsignedDocIcon />, text: 'Missing signature', color: '#EF3E36' },
  review: { icon: <InReviewDocIcon />, text: 'On review', color: '#B3C5B4' },
};

export const additionalQuestionsKeys = [
  'whatBrokerage',
  'contactRanking',
  'areYouRealtor',
  'agentName',
  'currentHomeStatus',
  'purchaseType',
  'lookingTo',
  'exposure',
  'ageRange',
  'hearAboutUs',
];

export const defFormLayout = {
  layout: 'horizontal',
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

export const sortDirectionKeys = {
  ascend: 'ASC',
  descend: 'DESC',
};
