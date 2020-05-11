import React from 'react';
import { useSelector } from 'react-redux';
import { NewPartForm, EditPartForm } from './PartForms.jsx';
import { DataWait, Err } from './DataStatus.jsx';
import { ConfirmRetire, ConfirmService } from './Confirm.jsx';

const ModalIndex = () => {
  const { 
    newPartForm,  
    editPartForm,
    dataWait,
    err,
    confirmRetire,
    confirmService
  } = useSelector(state => state.appControls.modal);


  return (
    <>
      { newPartForm && <NewPartForm /> }
      { editPartForm && <EditPartForm /> }
      { dataWait && <DataWait /> }
      { err && <Err /> }
      { confirmRetire && <ConfirmRetire /> }
      { confirmService && <ConfirmService /> }
    </>
  );
};

export default ModalIndex;
