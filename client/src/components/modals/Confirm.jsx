import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ModalWrapper from '../wrappers/ModalWrapper.jsx';
import { Row, Col, Button } from 'react-bootstrap';
import _ from 'lodash';
import { closeModal } from '../../state/actions/appControls.js';
import { submitEditedPart } from '../../state/actions/partForm.js';

export const ConfirmRetire = () => {
  const partId = useSelector(state => state.parts.selectedPart);
  const part = useSelector(state => state.parts.list)[partId];
  const bike = useSelector(state => state.bikes.list)[useSelector(state => state.bikes.selectedBike)];
  const dispatch = useDispatch();

  const bikeName = _.upperFirst(bike.name);
  const partType = part.custom_type || part.type;

  const handleRetire = () => {

  };

  return (
    <Confirm
      modal={'confirmRetire'}
      confirmAction={handleRetire}
    >
      <p className="h4">
        <strong> {_.upperFirst(partType)}</strong> on <strong>{bikeName}</strong>
      </p>
      <p>
        Remove component?
      </p>

    </Confirm>
  );
};




export const ConfirmService = () => {
  const partId = useSelector(state => state.parts.selectedPart);
  const part = useSelector(state => state.parts.list)[partId];
  const bike = useSelector(state => state.bikes.list)[useSelector(state => state.bikes.selectedBike)];
  const dispatch = useDispatch();
  
  const bikeName = _.upperFirst(bike.name);
  const partType = part.custom_type || part.type;

  const handleServicePart = () => {

  };

  return (
    <Confirm
      modal={'confirmService'}
      confirmAction={handleServicePart}
    >
      <p className="h4">
        <strong> {_.upperFirst(partType)}</strong> on <strong>{bikeName}</strong>
      </p>
      <p>
        Reset distance and ride time to zero?
      </p>

    </Confirm>
  )
};



const Confirm = ({ modal, children, confirmAction }) => {
  return (
    <ModalWrapper modal={modal} title='Confirm'>

      <Row className="align-items-center my-5">
        <Col className="text-center">
          {children}
        </Col>
      </Row>

      <Row className="justify-content-center" xs={2} sm={3} md={4}>
        <Col>
          <Button onClick={() => { dispatch(closeModal(modal)) }} className="w-100" variant="danger">
            <span className="material-icons panel-menu-text d-block">cancel</span>
          </Button>
        </Col>
        <Col>
          <Button onClick={confirmAction} className="w-100" variant="success">
            <span className="material-icons panel-menu-text d-block">check_circle</span>
          </Button>
        </Col>
      </Row>
    </ModalWrapper>
  );

};

export default Confirm;