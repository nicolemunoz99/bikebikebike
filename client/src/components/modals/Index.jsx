import React from 'react';
import { useSelector } from 'react-redux';
import { NewPartForm, EditPartForm } from './PartForms.jsx';
import { DataWait, Err, LimitedAccess, Success } from './DataStatus.jsx';
import { ConfirmRetire, ConfirmService } from './Confirm.jsx';

const ModalIndex = () => {
  const { 
    newPartForm,  
    editPartForm,
    dataWait,
    success,
    confirmRetire,
    confirmService,
    limitedAccess,
  } = useSelector(state => state.appControls.modal);

  const { err } = useSelector(state => state.appControls);

  return (
    <>
      { newPartForm && <NewPartForm /> }
      { editPartForm && <EditPartForm /> }

      {/* { actionRequired && <ActionRequired /> } */}
      { limitedAccess && <LimitedAccess /> }
      { confirmRetire && <ConfirmRetire /> }
      { confirmService && <ConfirmService /> }

      { dataWait && <DataWait /> }
      { success && <Success /> }
      { err && <Err /> }
    </>
  );
};

export default ModalIndex;
