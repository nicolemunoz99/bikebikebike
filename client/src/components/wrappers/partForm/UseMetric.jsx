import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import CustomInput from './CustomInput.jsx';
import { updatePartForm, resetFields } from '../../../state/actions.js';
import { errMsgs } from '../../../validation.js';

const UseMetric = ({ useOptions }) => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFields(['use_metric_dist', 'use_metric_time', 'use_metric_dist']));
    }
  }, [])

  const handleInput = (e) => {
    let value
    let field =e.target.id;
    if (e.target.getAttribute('data-checkbox')) {
      value = !inputs[e.target.id]
    } else {
      value = e.target.value || e.target.getAttribute('value');
    }
    console.log(field, value);
    dispatch(updatePartForm({ field, value }));
  };

  return (
    <Form.Group as={Row}>
      <Form.Label column sm="4">
        Use Metric:
      </Form.Label>
      <Col sm="8">
        <Row>

          {
            Object.keys(useOptions).map((key) => {
              return (
                <Col sm="auto" key={key}>
                  <Form.Check
                    data-checkbox={true}
                    type="checkbox"
                    label={key}
                    id={useOptions[key].field}
                    onChange={handleInput}
                    checked={inputs[useOptions[key].field]}
                  />
                </Col>
              )
            })
          }

        </Row>

      </Col>

    </Form.Group>
  );
};

export default UseMetric;
