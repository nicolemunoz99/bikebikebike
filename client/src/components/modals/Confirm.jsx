import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalWrapper from '../wrappers/ModalWrapper.jsx';
import { Row, Col, Button } from 'react-bootstrap';
import _ from 'lodash';
import { closeModal } from '../../state/actions/appControls.js';
import { retirePart, servicePart } from '../../state/actions/parts.js';
import usePartTypeRender from '../../hooks/usePartTypeRender.js';

export const ConfirmRetire = () => {
  const partId = useSelector(state => state.parts.selectedPart);
  const part = useSelector(state => state.parts.list)[partId];
  const bike = useSelector(state => state.bikes.list)[useSelector(state => state.bikes.selectedBike)];
  const dispatch = useDispatch();

  const bikeName = _.upperFirst(bike.name);
  const partTypeRender = usePartTypeRender(part);

  return (
    <Confirm
      modal={'confirmRetire'}
      confirmAction={() => dispatch(retirePart(partId))}
    >
      <p className="h4">
        <strong> {_.upperFirst(partTypeRender)}</strong> on <strong>{bikeName}</strong>
      </p>
      <p>
        Retire component?
      </p>

    </Confirm>
  );
};




export const ConfirmService = () => {
  const partId = useSelector(state => state.parts.selectedPart);
  const part = useSelector(state => state.parts.list)[partId];
  const bike = useSelector(state => state.bikes.list)[useSelector(state => state.bikes.selectedBike)];
  const partTypeRender = usePartTypeRender(part);
  const dispatch = useDispatch();
  
  const bikeName = _.upperFirst(bike.name);

  return (
    <Confirm
      modal={'confirmService'}
      confirmAction={() => dispatch(servicePart(partId))}
    >
      <p className="h4">
        <strong> {partTypeRender} </strong> on <strong>{bikeName}</strong>
      </p>
      <p>
        Reset distance and ride time to zero?
      </p>

    </Confirm>
  )
};



const Confirm = ({ modal, children, confirmAction }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal(modal));
    confirmAction();
  }
  
  return (
    <ModalWrapper modal={modal} title='Confirm'>

      { children }

      <Row className="justify-content-center" xs={2} sm={3} md={4}>
        <Col>
          <Button onClick={() => { dispatch(closeModal(modal)) }} className="w-100" variant="danger">
            <span className="material-icons panel-menu-text d-block">cancel</span>
          </Button>
        </Col>
        <Col>
          <Button onClick={handleClose} className="w-100" variant="success">
            <span className="material-icons panel-menu-text d-block">check_circle</span>
          </Button>
        </Col>
      </Row>
    </ModalWrapper>
  );

};

export default Confirm;