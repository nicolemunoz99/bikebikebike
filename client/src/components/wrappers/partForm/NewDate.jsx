import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import xDate from 'xdate';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import CustomInput from './CustomInput.jsx';
import { updatePartForm, resetFields } from '../../../state/actions.js';
import { errMsgs } from '../../../validation.js';

const NewDate = ({ handleInput }) => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFields(['new_at_add', 'new_date']));
    };
  }, []);

  useEffect(() => {
    // dispatch(resetFields(['new_date']));
    if (inputs.new_at_add === 'y') {
      let year = xDate(false).getFullYear();
      let month = xDate(false).getMonth() + 1;
      let day = xDate(false).getDate();  
      let today = `${year}-${month < 10 ? '0'.concat(month) : month}-${day < 10 ? '0'.concat(day) : day}`;
      dispatch(updatePartForm([{new_date: today}]));
    }
    if (inputs.new_at_add === 'n') {
      dispatch(updatePartForm([{new_date: ''}]))
    }
  }, [inputs.new_at_add])


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


      {inputs.new_at_add &&
        <Form.Group as={Row}>
          <Form.Label column sm="4">
            New date:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              as={CustomInput}
              err={isReq.new_date && !isOk.new_date ? errMsgs.new_date : ''}
              type="date"
              id="new_date"
              onChange={handleInput}
              value={inputs.new_date}
              readOnly={inputs.new_at_add === 'y' ? true : false}
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

export default NewDate;