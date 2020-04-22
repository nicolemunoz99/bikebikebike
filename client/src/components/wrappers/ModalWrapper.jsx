import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../state/actions.js';

const ModalWrapper = ({ children, title, minHeight = "50%", cancelClose = false }) => {
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [indicatorY, setIndicatorY] = useState('0px');
  const dispatch = useDispatch();

  const closeHandler = (e) => {
    if (cancelClose) return;
    if (e.target === e.currentTarget) {
      dispatch(closeModal());
    };
  };

  const handleScroll = (e) => {
    let el = e.target;
    if (el.scrollHeight - el.scrollTop === el.clientHeight) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
      setIndicatorY(-el.scrollTop);
    }
  };

  return (

    <div className="modal-backdrop d-flex justify-content-center" onClick={closeHandler}>
      <div className="modal-body col-sm-8 col-11" style={{ minHeight: minHeight }} onScroll={handleScroll}>

        {!cancelClose &&
          <div className="row align-items-center justify-content-end no-gutters">
            <div className="col-auto pointer">
              <span className="material-icons d-block" onClick={closeHandler}>close</span>
            </div>
          </div>
        }

        <div className="display-4 mb-4">
          {title}
        </div>

        {children}

        {!isAtBottom &&
          <div className="row no-gutters scroll-more-wrapper" style={{ bottom: indicatorY }}>
          </div>
        }

      </div>



    </div>
  )
};

export default ModalWrapper;