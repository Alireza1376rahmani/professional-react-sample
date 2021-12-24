import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
import moment from 'moment';
import { Button, ModalWrapper, Row, Form } from '../atoms';
import ModalContent from '../molecules/ModalContent';
import AllocAddSecStep from './AllocAddSecStep';
import AllocAddFirstStep from '../molecules/AllocAddFirstStep';
import { addAllocationRequest, updateAllocationRequest } from '../../actions/allocation-requests';
import {
  getAddAllocationRequestLoading,
  getSuccessState,
  getUpdateAllocationRequestLoading,
} from '../../selectors/allocation-requests';
import { getUserData } from '../../selectors/users';

const convertCustomerData = ({
  IsCompany,
  Salutation,
  CompanyName,
  FirstName,
  LastName,
  Address1,
  Address2,
  Province,
  City,
  Country,
  PostalCode,
  Phone,
  Email,
  birthDate,
  Occupation,
  EmployerName,
  License,
  CustomerDocuments,
}) => ({
  CompanyName,
  FirstName,
  LastName,
  IsCompany,
  Salutation,
  Address: {
    Address1,
    Address2,
    Province,
    City,
    Country,
    PostalCode,
  },
  Contact: {
    ContactDataType: 'Personal',
    Phone,
    Email,
    Website: '',
    birthDate,
    Fax: '',
  },
  CustomerDocuments,
  Occupation,
  EmployerName,
  License,
});

const AllocAddModal = ({ closeModal, allocEditData, isSales }) => {
  const [formFirstStep] = Form.useForm();
  const [formSecStep] = Form.useForm();
  const [statusForm] = Form.useForm();
  const [firstStepData, setFirstStepData] = useState(null);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState(allocEditData?.AllocationStatus || '');
  const dispatch = useDispatch();
  const [customerList, setCustomerList] = useState(allocEditData?.Prospects || []);
  const [editData, setEditData] = useState(null);
  const updateSuccess = useSelector(getSuccessState);
  const addLoading = useSelector(getAddAllocationRequestLoading);
  const updateLoading = useSelector(getUpdateAllocationRequestLoading);
  const Broker = useSelector(getUserData);

  useEffect(() => {
    if (updateSuccess) {
      closeModal();
      if (!isSales) {
        notification.success({
          message: 'Thank you for your submission',
          description: 'We have received your worksheet.',
          duration: 3,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  useEffect(() => {
    if (editData) setStep(2);
  }, [editData]);

  const goToSecStep = values => {
    firstStepData(values);
    setStep(2);
  };

  const backToFirst = () => {
    setStep(1);
    formSecStep.resetFields();
    setEditData(null);
  };

  const addCustomer = async draftDeposit => {
    const values = await formFirstStep.validateFields();
    setFirstStepData({ ...values, draftDeposit });
    setStep(2);
  };

  const saveCustomer = values => {
    if (editData?.index || editData?.index === 0) {
      const listCopy = [...customerList];
      listCopy.splice(editData.index, 1, convertCustomerData(values));
      setCustomerList(listCopy);
    } else {
      setCustomerList([...customerList, convertCustomerData(values)]);
    }
    backToFirst();
  };

  const editCustomer = index => {
    setEditData({ ...customerList[index], index });
  };

  const removeCustomer = index => {
    const listCopy = [...customerList];
    listCopy.splice(index, 1);
    setCustomerList(listCopy);
  };

  const finishHandler = () => {
    isSales ? saveStatusChange() : saveAllocData();
  };

  const saveAllocData = async statusData => {
    const values = await formFirstStep.validateFields();
    const firstValues = firstStepData || values;
    if (allocEditData) {
      const firstStepNewData = statusData ? { ...firstValues, ...statusData } : firstValues;
      dispatch(
        updateAllocationRequest.request({
          id: allocEditData.id,
          values: {
            ...firstStepNewData,
            Prospects: customerList.map(el => ({
              ...el,
              Contact: { ...el.Contact, Phone: el.Contact.Phone.replace(/[- )(]/g, '') },
            })),
          },
        })
      );
    } else {
      dispatch(
        addAllocationRequest.request({
          ...{ ...firstValues, Broker },
          Prospects: customerList.map(el => ({
            ...el,
            Contact: { ...el.Contact, Phone: el.Contact.Phone.replace(/[- )(]/g, '') },
          })),
        })
      );
    }
  };

  const saveStatusChange = async () => {
    const { ActualUnit = null, AllocationStatus = '' } = await statusForm.validateFields();
    saveAllocData({
      ActualUnit,
      AllocationStatus,
      ReviewDate: moment().format(),
      ApproveDate: AllocationStatus === 'approved' ? moment().format() : null,
    });
  };

  const isEditable = isSales
    ? false
    : !allocEditData || (allocEditData && allocEditData.AllocationStatus === 'pending');

  const stepsComps = {
    1: (
      <AllocAddFirstStep
        form={formFirstStep}
        goToSecStep={goToSecStep}
        firstStepData={firstStepData}
        customerList={customerList}
        addCustomer={addCustomer}
        editCustomer={editCustomer}
        removeCustomer={removeCustomer}
        allocEditData={allocEditData}
        isSales={isSales}
        isEditable={isEditable}
        statusForm={statusForm}
        setStatus={setStatus}
        status={status}
      />
    ),
    2: (
      <AllocAddSecStep
        formSecStep={formSecStep}
        saveCustomer={saveCustomer}
        editData={editData}
        isEditable={isEditable}
      />
    ),
  };

  const footerButtons = {
    1: customerList.length
      ? {
          button: (isEditable || isSales) && (
            <Button
              onClick={finishHandler}
              type='primary'
              padding='0 20px'
              loading={addLoading || updateLoading}
            >
              {allocEditData ? 'Save Allocation Request' : 'Submit Allocation Request'}
            </Button>
          ),
          justify: 'end',
        }
      : {
          button: '',
          justify: 'end',
        },
    2: {
      button: (
        <>
          <Button onClick={backToFirst} type='grey_ghost' width='100px'>
            Back
          </Button>
          {isEditable && (
            <Button type='primary' onClick={() => formSecStep.submit()} width='120px'>
              Save
            </Button>
          )}
        </>
      ),
      justify: 'space-between',
    },
  };

  const footerComp = () => {
    if (!footerButtons[step]?.button) return <></>;
    if (isEditable || isSales)
      return (
        <Row
          padding={'15px 30px'}
          align='middle'
          justify={footerButtons[step]?.justify}
          border_top='1px solid #EEEEEE'
        >
          {footerButtons[step]?.button}
        </Row>
      );

    if (!isEditable && step === 1) return <></>;
    return (
      <Row
        padding={'15px 30px'}
        align='middle'
        justify={footerButtons[step]?.justify}
        border_top='1px solid #EEEEEE'
      >
        {footerButtons[step]?.button}
      </Row>
    );
  };

  return (
    <ModalWrapper closeModal={closeModal}>
      <ModalContent
        title={allocEditData ? 'Allocation Request' : 'New Allocation'}
        closeModal={closeModal}
        customWidth='50%'
      >
        <Row>{stepsComps[step]}</Row>
        {footerComp()}
      </ModalContent>
    </ModalWrapper>
  );
};

export default AllocAddModal;
