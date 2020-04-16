import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Popover } from 'react-bootstrap';
import { CustomFormGroup, FormHeader } from './CustomFormBits.jsx';
import { resetFields } from '../../../state/actions.js';

const UseMetric = ({ useOptions, handleInput }) => {
  const { inputs } = useSelector(state => state.form);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log('reset use_metric fields')
      dispatch(resetFields(['use_metric_dist', 'use_metric_time', 'use_metric_dist']));
    }
  }, [])



  return (
    <Form.Group as={CustomFormGroup}>
      
      <FormHeader
        label="Use Metric"
        tooltip={useMetricTooltip}
      />

      <Col sm={{span:8, offset:4}}>
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
