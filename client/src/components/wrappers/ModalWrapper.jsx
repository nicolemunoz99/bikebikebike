import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../state/actions.js';

const ModalWrapper = (props) => {
  const [atBottom, updateAtBottom] = useState(false)
  const dispatch = useDispatch();

  const closeHandler = (e) => {
    if (props.cancelClose) return;
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    };
  };

  handleScroll = (e) => {
    let element = e.target
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      updateAtBottom(true);
    }
  };

  return (

    <div className="modal-backdrop d-flex justify-content-center" onClick={closeHandler}>

      <div className="modal-body col-8" style={{ minHeight: props.minHeight }} onScroll={handleScroll}>
        <div className="display-4 mb-4">
          {props.title}
        </div>
        {props.children}
      </div>

      {!atBottom &&
        <div className="scroll-more"> white </div>
      }

    </div>
  )
};

export default ModalWrapper;