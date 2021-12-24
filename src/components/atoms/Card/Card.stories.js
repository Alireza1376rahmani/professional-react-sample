import React from 'react';

import { Editable } from './Editable';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: 'Card/Editable',
  component: Editable,
};

const Template = args => <Editable {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  canSave: true,
  onSave: () => {},
  children: 'Hi',
  onEditEnableChange: () => {},
};
