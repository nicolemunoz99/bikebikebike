import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import CustomInput from './CustomInput.jsx';
import { resetFields, updatePartForm } from '../../../state/actions.js';
import { errMsgs } from '../../../validation.js';

const Basics = ({ handleInput }) => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFields(['tracking_method']));
      dispatch(updatePartForm([{custom_type: ''}]))
    };
  }, [inputs.type])

  const partList = {
    chain: {title: 'Chain'},
    freehub: {title: 'Freehub'},
    fork: {title: 'Suspension fork'},
    cassette: {title: 'Cassette'},
    custom: {title: '-- Custom --'}
  };



  return (
    <Form.Group as={Row}>
      <Form.Label column sm="4">
        Basics:
    </Form.Label>

      <Col sm="8">
        <Row>
          <Col xs="12" className="mb-1">
            <DropdownButton
              size="sm"
              variant="info"
              title={inputs.type ? partList[inputs.type].title : 'Type'}

            >
              {Object.keys(partList).map(partKey => {
                return (
                  <Dropdown.Item 
                    key={partKey} 
                    onClick={handleInput} 
                    id="type" 
                    value={partKey}
                  >
                    {partList[partKey].title}
                  </Dropdown.Item>
                )
              })}
            </DropdownButton>
          </Col>
          {inputs.type === 'custom' ?
            <Col sm="12" className="mb-1">
              <Form.Control
                as={CustomInput}
                err={isReq.custom_type && !isOk.custom_type ? errMsgs.custom_type : ''}
                type="text"
                placeholder="Your custom part"
                id="custom_type"
                onChange={handleInput}
                value={inputs.custom_type}
              />
            </Col>
            :
            null
          }

          <Col sm="6" className="mb-1">
            <Form.Control
              as={CustomInput}
              subText="Brand (Optional)"
              type="email"
              placeholder=""
              id="p_brand"
              onChange={handleInput}
              value={inputs.p_brand}
            />
          </Col>
          <Col sm="6" className="mb-1">
            <Form.Control
              as={CustomInput}
              subText="Model (Optional)"
              type="text"
              placeholder=""
              id="p_model"
              onChange={handleInput}
              value={inputs.p_model}
            />
          </Col>

        </Row>
      </Col>
    </Form.Group>
  )
};

export default Basics;