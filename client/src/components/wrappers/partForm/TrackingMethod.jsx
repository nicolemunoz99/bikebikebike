import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import CustomInput from './CustomInput.jsx';
import { updatePartForm, resetFields } from '../../../state/actions.js';
import { errMsgs } from '../../../validation.js';

const TrackingMethod = ({ handleInput }) => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFields(['tracking_method', 'new_at_add']));
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetFields(['use_metric_dist', 'use_metric_time', 'use_metric_dist']));
    };
  }, [inputs.tracking_method]);


  return (
    <Form.Group as={Row}>
      <Form.Label column sm="4">
        Default or custom tracking

      <OverlayTrigger
          trigger="click"
          placement="right"
          overlay={
            <Popover id="tracking">
              <Popover.Content>
                <div>
                  <p>
                    "Default" assumes this is a new part.
                </p>
                  <p>
                    "Custom" allows you to specify a current wear, and whether you
                    want to track usage by distance and/or time.
                </p>

                </div>
              </Popover.Content>
            </Popover>
          }
        >
          <span className="material-icons">info</span>
        </OverlayTrigger>

      </Form.Label>
      <Col sm="8">
        <Row>
          <Col sm="4">
            <Form.Check
              type="radio"
              label="Default"
              id="tracking_method"
              value="default"
              checked={inputs.tracking_method === 'default' ? true : false}
              onChange={handleInput}
              disabled={inputs.type == 'custom' ? true : false}
            />
          </Col>
          <Col sm="4">
            <Form.Check
              type="radio"
              label="Custom"
              id="tracking_method"
              value="custom"
              checked={inputs.tracking_method === 'custom' ? true : false}
              onChange={handleInput}
            />
          </Col>
        </Row>
      </Col>

    </Form.Group>
  )
};

export default TrackingMethod;