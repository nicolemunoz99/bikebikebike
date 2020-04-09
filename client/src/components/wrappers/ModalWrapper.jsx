import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { closeModal, resetForm } from '../../state/actions.js';

const ModalWrapper = (props) => {
  const dispatch = useDispatch();
  
  const closeHandler = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
      dispatch(resetForm());
    };
  }
  
  return (
    <div className="modal-backdrop d-flex justify-content-center" onClick={closeHandler}>

        <div className="modal-body col-8">
        <div className="display-4">
          {props.title}
        </div>
        {props. children}
      </div>
    </div>
  )
};

export default ModalWrapper;