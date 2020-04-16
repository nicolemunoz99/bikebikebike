import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { closeModal } from '../../state/actions.js';

const ModalWrapper = (props) => {
  const dispatch = useDispatch();

  const closeHandler = (e) => {
    if (props.cancelClose) return;
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    };
  };
  
  return (
    
    <div className="modal-backdrop d-flex justify-content-center" onClick={closeHandler}>

        <div className="modal-body col-8" style={{minHeight:props.minHeight}}>
        <div className="display-4 mb-4">
          {props.title}
        </div>
        {props. children}
      </div>
    </div>
  )
};

export default ModalWrapper;