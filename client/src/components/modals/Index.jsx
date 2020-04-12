import React from 'react';
import { useSelector } from 'react-redux';
import PartForm from './PartForm.jsx';
import { DataWait, DataErr } from './DataStatus.jsx';

const ModalIndex = () => {
  const modal = useSelector(state => state.modal);

  return (
    <div>
      { modal === 'partForm'  && <PartForm /> }
      { modal === 'dataWait'  && <DataWait /> }
      { modal === 'dataErr'   && <DataErr /> }
    </div>
  );
};

export default ModalIndex;
