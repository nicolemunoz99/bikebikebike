import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Row, Col, Popover } from 'react-bootstrap';
import { CustomInput, CustomFormGroup, FormHeader } from './CustomFormBits.jsx';
import { errMsgs } from '../../../validation.js';

const Lifespan = ({ useOptions, handleInput }) => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);


  return (
    <Form.Group as={CustomFormGroup}>

      <FormHeader
        label="Lifespan or service interval"
        tooltip={lifespanTooltip}
      />

      {
        Object.keys(useOptions).map((useKey) => {
          let metric = useOptions[useKey].value
          return (
            <React.Fragment key={useKey}>
              {inputs[`use_metric_${metric}`] &&
                <Col sm={{ span: 8, offset: 4 }}>
                  <Row>
                    <Col
                      sm="12"
                      className="mb-3"
                    >
                      <Form.Control
                        as={CustomInput}
                        err={isReq[`lifespan_${metric}`] && !isOk[`lifespan_${metric}`] ? errMsgs[`lifespan_${metric}`] : ''}
                        subText={useOptions[useKey].subText}
                        type={metric === "date" ? "date" : "number"}
                        placeholder=''
                        id={`lifespan_${metric}`}
                        onChange={handleInput}
                        value={inputs[`lifespan_${metric}`]}
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