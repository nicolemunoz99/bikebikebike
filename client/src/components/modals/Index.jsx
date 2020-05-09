import React from 'react';
import { useSelector } from 'react-redux';
import { NewPartForm, EditPartForm } from './PartForms.jsx';
import { DataWait, Err } from './DataStatus.jsx';

const ModalIndex = () => {
  const { 
    newPartForm,  
    editPartForm,
    dataWait,
    err
  } = useSelector(state => state.appControls.modal);


  return (
    <>
      { newPartForm && <NewPartForm /> }
      { editPartForm && <EditPartForm /> }
      { dataWait && <DataWait /> }
      { err && <Err /> }
    </>
  );
};

export default ModalIndex;
