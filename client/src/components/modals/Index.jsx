import React from 'react';
import { useSelector } from 'react-redux';
import NewPartForm from './NewPartForm.jsx';

const ModalIndex = () => {
  const modal = useSelector(state => state.modal);

  return (
    <div>
      {  modal === 'newPartForm' ?
        <NewPartForm />
        :
        null
      }
    </div>
  )
};

export default ModalIndex;

// modal === 'newPartForm'