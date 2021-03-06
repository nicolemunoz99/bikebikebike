import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../state/actions/appControls.js';
import { Row, Col } from 'react-bootstrap';
import useLockBodyScroll from '../../hooks/useLockBodyScroll.js';
import { ModalTitle } from '../bits/RandomBits.jsx';

const ModalWrapper = ({modal, children, title, minHeight="50%", cancelClose=false, closeAction=()=>{} }) => {
  useLockBodyScroll(); // prevent scrolling under modal
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [indicatorY, setIndicatorY] = useState('0px');
  const dispatch = useDispatch();

  const closeHandler = (e) => {
    if (cancelClose) return;
    closeAction();
    if (e.target === e.currentTarget) {
      dispatch(closeModal(modal));
    };
  };

  const handleScroll = (e) => {
    if (e.target === e.currentTarget){
      let el = e.target;
      if (el.scrollHeight - el.scrollTop === el.clientHeight) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
        setIndicatorY(-el.scrollTop);
      }
    }
  };

  return (

    <div className="modal-backdrop d-flex justify-content-center" onClick={closeHandler}>
      <div className="modal-body bbb-container col-sm-8 col-11" style={{ minHeight: minHeight }} onScroll={handleScroll}>

        {!cancelClose &&
          <div className="row align-items-center justify-content-end no-gutters">
            <div className="col-auto pointer">
              <span className="material-icons d-block" onClick={closeHandler}>close</span>
            </div>
          </div>
        }

        <ModalTitle>
          {title}
        </ModalTitle>

        <Row noGutters>
          <Col xs={12} className="text-center">
            {children}
          </Col>
        </Row>

        {!isAtBottom &&
          <div className="row no-gutters scroll-more" style={{ bottom: indicatorY }} />
        }

      </div>



    </div>
  )
};

export default ModalWrapper;