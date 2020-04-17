import React from 'react';
import { useSelector } from 'react-redux';
import { NewPartForm } from './PartForms.jsx';
import { DataWait, DataErr } from './DataStatus.jsx';

const ModalIndex = () => {
  const modal = useSelector(state => state.modal);

  const modalTypes = {
    newPartForm: NewPartForm,
    editPartForm: NewPartForm,
    dataWait: DataWait,
    dataErr: DataErr
  }

  const ModalToRender = modalTypes[modal] || null;

  return (
    <>
      <ModalToRender />
    </>
  );
};

export default ModalIndex;
