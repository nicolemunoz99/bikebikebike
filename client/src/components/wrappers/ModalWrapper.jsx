import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { closeModal } from '../../state/actions.js';

const ModalWrapper = ({ children }) => {
  const dispatch = useDispatch();
  
  const closeHandler = (e) => {
    if (e.target === e.currentTarget) closeModal();
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