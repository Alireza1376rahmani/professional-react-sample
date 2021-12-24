import React, { useState } from 'react';
import SignUpFirstStep from '../../molecules/SignUpFirstStep';
import SignUpSecStep from '../../molecules/SignUpSecStep';
import { convertProfileData } from '../../../Utils/Helpers';

const BrokerSignUp = ({
  setBrokerStep,
  brokerFirstForm,
  layout,
  brokerSecForm,
  signUpRequest,
  loading,
  step,
  defUserData,
}) => {
  const [brokerFirstFormValues, setBrokerFirstFormValues] = useState(1);
  const [receiveUpdates, setReceiveUpdates] = useState(false);

  const submitFirstStep = values => {
    setBrokerFirstFormValues(values);
    setBrokerStep(2);
  };

  const submitSecForm = values => {
    const updateData = convertProfileData(defUserData, {
      ...brokerFirstFormValues,
      ...values,
      receiveUpdates,
    });
    const { email, password } = brokerFirstFormValues;
    const signUpData = {
      username: email.toLowerCase(),
      email: email.toLowerCase(),
      password,
      role: 'brokers',
      ...updateData,
    };
    signUpRequest(signUpData);
  };

  const goToFirst = () => {
    setBrokerStep(1);
  };

  const brokerStepComps = {
    1: (
      <SignUpFirstStep
        firstForm={brokerFirstForm}
        layout={layout}
        submitFirstStep={submitFirstStep}
        initialValues={brokerFirstFormValues}
      />
    ),
    2: (
      <SignUpSecStep
        secForm={brokerSecForm}
        layout={layout}
        goToFirst={goToFirst}
        submitSecForm={submitSecForm}
        loading={loading}
        receiveUpdates={receiveUpdates}
        setReceiveUpdates={setReceiveUpdates}
      />
    ),
  };
  return <>{brokerStepComps[step]}</>;
};

export default BrokerSignUp;
