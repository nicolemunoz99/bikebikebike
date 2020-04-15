import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import CustomInput from './CustomInput.jsx';
import { updatePartForm, resetForm } from '../../../state/actions.js';
import { errMsgs } from '../../../validation.js';

const Lifespan = ({ useOptions }) => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    let value = e.target.value || e.target.getAttribute('value');
    let field = e.target.id;
    dispatch(updatePartForm({ field, value }));
  };

  return(
    <Form.Group as={Row}>
        <Form.Label column sm="4">
          Life/service interval:
        </Form.Label>

        {
          Object.keys(useOptions).map((useKey) => {
            let metric = useOptions[useKey].value
            return (
              <React.Fragment key={useKey}>
              {inputs[`use_metric_${metric}`] &&
                <Col sm={{span:8, offset:4}}>
                  <Row>
                    <Col 
                      sm="10"
                      
                      className="mb-3"
                    >
                      <Form.Control
                        as={CustomInput}
                        // err={isReq.lifespan_time && !isOk.lifespan_time ? errMsgs.lifespan_time : ''}  
                        subText={useOptions[useKey].subText}
                        type={metric==="date" ? "date" : "number"} 
                        placeholder=''
                        id={`lifespan_${metric}`}
                        onChange={handleInput} 
                        value={inputs[`lifespan_${metric}`]}
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

export default Lifespan;