import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { closeModal, resetForm } from '../../state/actions.js';

const ModalWrapper = ({ children }) => {
  const dispatch = useDispatch();
  
  const closeHandler = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
      dispatch(resetForm());
    };
  }
  
  return (
    <div className="modal-wrapper" onClick={closeHandler}>

      <div className="modal-body row">
        
            {children}
      </div>

    </div>
  )
};

export default ModalWrapper;