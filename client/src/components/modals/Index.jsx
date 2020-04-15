import React from 'react';
import { useSelector } from 'react-redux';
// import { NewPartForm,  EditPartForm } from './PartForms.jsx';
import PartFormWrapper from '../wrappers/partForm/Index.jsx';
import { DataWait, DataErr } from './DataStatus.jsx';

const ModalIndex = () => {
  const modal = useSelector(state => state.modal);

  // const modalTypes = {
  //   newPartForm: NewPartForm,
  //   editPartForm: EditPartForm,
  //   dataWait: DataWait,
  //   dataErr: DataErr
  // }

  const modalTypes = {
    newPartForm: PartFormWrapper,
    editPartForm: PartFormWrapper,
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
