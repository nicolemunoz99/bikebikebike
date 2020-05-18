import React from 'react';
import { useSelector } from 'react-redux';
import { NewPartForm, EditPartForm } from './PartForms.jsx';
import { DataWait, Err, LimitedAccess } from './DataStatus.jsx';
import { ConfirmRetire, ConfirmService } from './Confirm.jsx';

const ModalIndex = () => {
  const { 
    newPartForm,  
    editPartForm,
    dataWait,
    err,
    confirmRetire,
    confirmService,
    limitedAccess
  } = useSelector(state => state.appControls.modal);


  return (
    <>
      { newPartForm && <NewPartForm /> }
      { editPartForm && <EditPartForm /> }
      { dataWait && <DataWait /> }
      { err && <Err /> }
      { confirmRetire && <ConfirmRetire /> }
      { confirmService && <ConfirmService /> }
      { limitedAccess && <LimitedAccess /> }
    </>
  );
};

export default ModalIndex;
