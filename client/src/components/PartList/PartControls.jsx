import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { showEditPartForm } from '../../state/actions/partForm.js';
// import { confirmRetired, confirmServiced } from '../../state/actions.parts.js';

const PartControls = () => {
  const partId = useSelector(state => state.parts.selectedPart)
  const dispatch = useDispatch();

  const controlMap = [
    {
      action: () => dispatch(showEditPartForm(partId)),
      icon: 'edit',
      tooltip: 'Edit'
    },
    {
      action: () => dispatch(setModal('confirm', `Retire???`, () => { })),
      icon: 'build',
      tooltip: 'Service'
    },
    {
      action: () => dispatch(setModal('confirm', `Serviced???`, () => { })),
      icon: 'delete',
      tooltip: 'Retire'
    }
  ];

  return (
    <Row sm={3} className="mb-3">

      {controlMap.map(control => {
        return (
          <Col key={control.icon} className="pointer text-center" onClick={control.action}>
            <Button 
              bsPrefix="bbb-button"
            >
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip> {control.tooltip} </Tooltip>}
            >
              <span className="material-icons panel-menu-text d-block">
                {control.icon}
              </span>
            </OverlayTrigger>
            </Button>
          </Col>
        )
      })}

    </Row>
  )
};

export default PartControls