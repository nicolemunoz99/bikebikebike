import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Row, Col, Popover } from 'react-bootstrap';
import { CustomFormGroup, FormHeader } from './CustomFormBits.jsx';
import useMetricOptions from '../../../hooks/useMetricOptions.js';

const WearMetric = ({ handleInput }) => {
  const { inputs } = useSelector(state => state.form);
  const metrics = useMetricOptions();

  console.log('re-render', metrics)
  return (
    <Form.Group as={CustomFormGroup}>
      
      <FormHeader
        label="Use Metric"
        tooltip={wearMetricTooltip}
      />

      <Col sm={{span:8, offset:4}}>
        <Row>

          {
            metrics.map((metric) => {
              return (
                <Col sm="auto" key={metric.value}>
                  <Form.Check
                    data-checkbox={true}
                    type="checkbox"
                    label={metric.optionLabel}
                    id={`use_metric_${metric.value}`}
                    onChange={handleInput}
                    checked={inputs[`use_metric_${metric.value}`]}
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

const wearMetricTooltip = (
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

export default WearMetric;
