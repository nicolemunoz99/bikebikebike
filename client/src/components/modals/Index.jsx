import React from 'react';
import { useSelector } from 'react-redux';
import PartForm from './PartForm.jsx';
import { DataWait, DataErr } from './DataStatus.jsx';

const ModalIndex = () => {
  const modal = useSelector(state => state.modal);

  const modalTypes = {
    partForm: PartForm,
    dataWait: DataWait,
    dataErr: DataErr
  }

  const ModalToRender = modalTypes[modal] || null;

  return (
    <div>
      <ModalToRender />
    </div>
  );
};

export default ModalIndex;
