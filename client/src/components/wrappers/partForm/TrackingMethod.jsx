import React, { useEffect } from 'react';
import xDate from 'xdate';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Popover } from 'react-bootstrap';
import { CustomFormGroup, FormHeader } from './CustomFormBits.jsx';
import { resetFields, formInput } from '../../../state/actions.js';

const TrackingMethod = ({ handleInput }) => {
  const { inputs } = useSelector(state => state.form);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFields(['tracking_method']));
    };
  }, []);

  useEffect(() => {
    dispatch(resetFields(['new_date']));
    if (inputs.tracking_method === 'default') {
      dispatch(formInput( [
        {new_date: xDate(false).toString('yyyy-MM-dd')}
      ]));
    }
  }, [inputs.tracking_method]);


  return (
    <Form.Group as={CustomFormGroup}>
      
      <FormHeader
        label='Default or custom tracking?'
        tooltip={trackingTooltip}
      />

      <Col sm={{ span: 8, offset: 4 }}>
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

const trackingTooltip = (
  <Popover id="tracking-method-tooltip">
    <Popover.Content>
      <div>
        <p>
          "Default" assumes this is a new part.
        </p>
        <p>
          "Custom" allows you to specify whether you
          want to track by distance, time and/or date.
        </p>

      </div>
    </Popover.Content>
  </Popover>
);

export default TrackingMethod;

