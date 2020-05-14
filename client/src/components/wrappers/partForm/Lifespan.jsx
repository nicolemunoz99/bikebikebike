import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Row, Col, Popover } from 'react-bootstrap';
import { CustomInput, CustomFormGroup, FormHeader } from './CustomFormBits.jsx';
import { errMsgs } from '../../../validation.js';
import { wearOptions } from '../../../helpers/staticData.js';

const Lifespan = ({ handleInput }) => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const metrics = wearOptions(useSelector(state => state.user.measure_pref));

  return (
    <Form.Group as={CustomFormGroup}>

      <FormHeader
        label="Lifespan or service interval"
        tooltip={lifespanTooltip}
      />

      {
        metrics.map((metric) => {
          return (
            <React.Fragment key={metric.value}>
              {inputs[`use_metric_${metric.value}`] &&
                <Col sm={{ span: 8, offset: 4 }}>
                  <Row>
                    <Col
                      sm="12"
                      className="mb-3"
                    >
                      <Form.Control
                        as={CustomInput}
                        err={isReq[`lifespan_${metric.value}`] && !isOk[`lifespan_${metric.value}`] ? errMsgs[`lifespan_${metric.value}`] : ''}
                        subText={metric.text}
                        type={metric.fieldType}
                        placeholder=''
                        id={`lifespan_${metric.value}`}
                        onChange={handleInput}
                        value={inputs[`lifespan_${metric.value}`]}
                        className="w-100"
                      />
                    </Col>
                  </Row>
                </Col>
              }
            </React.Fragment>
          )
        })
      }
    </Form.Group>
  );

};

const lifespanTooltip = (
  <Popover id="lifespan-tooltip">
    <Popover.Content>
      <div>
        <p>
          Values must be entered for each tracking metric specified above. You can specify 
          unselected metrics by editing the part after submission.
        </p>
      </div>
    </Popover.Content>
  </Popover>
);

export default Lifespan;