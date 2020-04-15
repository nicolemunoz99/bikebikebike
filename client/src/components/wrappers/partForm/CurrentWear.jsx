import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import CustomInput from './CustomInput.jsx';
import { updatePartForm, resetForm } from '../../../state/actions.js';
import { errMsgs } from '../../../validation.js';

const CurrentWear = () => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    let value = e.target.value || e.target.getAttribute('value');
    let field = e.target.id;
    dispatch(updatePartForm({ field, value }));
  };

  return (
    <>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Is this a new part?
        </Form.Label>

        <Col sm="8">
          <Row>
            <Col sm="4">
              <Form.Check
                type="radio"
                label="Yes"
                id="new_at_add"
                value="y"
                checked={inputs.new_at_add === 'y' ? true : false}
                onChange={handleInput}
              />
            </Col>
            <Col sm="4">
              <Form.Check
                type="radio"
                label="No"
                id="new_at_add"
                value="n"
                checked={inputs.new_at_add === 'n' ? true : false}
                onChange={handleInput}
              />
            </Col>
          </Row>
        </Col>
      </Form.Group>


      {inputs.new_at_add === 'n' &&
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            New date:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              as={CustomInput}
              // err={isReq.new_date && !isOk.new_date ? errMsgs.new_date : ''}
              type="date"
              id="new_date"
              onChange={handleInput}
              value={inputs.new_date}
            />
            <div>
              When was this part new/last serviced? This component's useage as of now will be calculated from your Strava activities
              and assuming the component was new on the date you enter above. Your first activity will be
              used if the date you enter precedes your first Strava activity.
            </div>
          </Col>
        </Form.Group>
      }

    </>
  );
};

export default CurrentWear;