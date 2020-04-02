import React from 'react';
import { useSelector } from 'react-redux';
import NewPartForm from './modals/NewPartForm.jsx';

const ModalIndex = () => {
  const modal = useSelector(state => state.modal);
  console.log('modal in Index', modal)

  return (
    <div>
      { true ?
        <NewPartForm />
        :
        null
      }
    </div>
  )
};

export default ModalIndex;