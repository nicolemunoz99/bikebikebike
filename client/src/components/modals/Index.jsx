import React from 'react';
import { useSelector } from 'react-redux';
import { NewPartForm, EditPartForm } from './PartForms.jsx';
import { DataWait, DataErr } from './DataStatus.jsx';

const ModalIndex = () => {
  const { 
    newPartForm,  
    editPartForm,
    dataWait,
    dataErr
  } = useSelector(state => state.appControls.modal);


  return (
    <>
      { newPartForm && <NewPartForm /> }
      { editPartForm && <EditPartForm /> }
      { dataWait && <DataWait /> }
      { dataErr && <DataErr /> }
    </>
  );
};

export default ModalIndex;
