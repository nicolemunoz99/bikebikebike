import React from 'react';
import { useSelector } from 'react-redux';
import PartForm from './PartForm.jsx';

const ModalIndex = () => {
  const modal = useSelector(state => state.modal);

  return (
    <div>
      {  modal === 'partForm' ?
        <PartForm />
        :
        null
      }
    </div>
  )
};

export default ModalIndex;
