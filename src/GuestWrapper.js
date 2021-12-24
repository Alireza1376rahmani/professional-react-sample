import React, { Fragment } from 'react';

const GuestWrapper = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default React.memo(GuestWrapper);
