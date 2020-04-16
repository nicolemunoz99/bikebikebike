import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import CustomInput from './CustomInput.jsx';
import { updatePartForm, resetFields } from '../../../state/actions.js';
import { errMsgs } from '../../../validation.js';

const UseMetric = ({ useOptions, handleInput }) => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log('reset use_metric fields')
      dispatch(resetFields(['use_metric_dist', 'use_metric_time', 'use_metric_dist']));
    }
  }, [])



  return (
    <Form.Group as={Row}>
      <Form.Label column sm="4">
        Use Metric
        <OverlayTrigger
          trigger="click"
          placement="right"
          overlay={useMetricTooltip}
        >
          <span className="material-icons tooltip-icon position-absolute">
            info_outline
          </span>
        </OverlayTrigger>

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

const useMetricTooltip = (
  <Popover id="use-metric-tooltip">
    <Popover.Content>
      <div>
        <p>
          Select all that apply.
        </p>
        <p>
          Notice will be given based on whichever expires first.
        </p>

      </div>
    </Popover.Content>
  </Popover>
);

export default UseMetric;
