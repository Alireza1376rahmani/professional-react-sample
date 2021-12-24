import React from 'react';
import AuthWrapper from '../../components/templates/AuthWrapper';
import ThankYou from '../../components/organisms/thank-you';

const ThankYouPage = () => {
  return (
    <AuthWrapper contentWidth='40%'>
      <ThankYou />
    </AuthWrapper>
  );
};

export default ThankYouPage;
