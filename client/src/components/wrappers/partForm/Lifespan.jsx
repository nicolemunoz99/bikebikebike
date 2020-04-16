import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import CustomInput from './CustomInput.jsx';
import { updatePartForm, resetFields} from '../../../state/actions.js';
import { errMsgs } from '../../../validation.js';

const Lifespan = ({ useOptions, handleInput }) => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      console.log('resetting lifespan fields...')
      dispatch(resetFields(['lifespan_dist', 'lifespan_time', 'lifespan_date']));
    };
  }, []);


  return(
    <Form.Group as={Row}>
        <Form.Label column sm="4">
          Lifespan or service interval:
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
                      sm="12"
                      className="mb-3"
                    >
                      <Form.Control
                        as={CustomInput}
                        err={isReq[`lifespan_${metric}`] && !isOk[`lifespan_${metric}`] ? errMsgs[`lifespan_${metric}`] : ''}  
                        subText={useOptions[useKey].subText}
                        type={metric==="date" ? "date" : "number"} 
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

export default Lifespan;