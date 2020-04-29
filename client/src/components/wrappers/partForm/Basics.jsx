import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { CustomInput, CustomFormGroup, FormHeader } from './CustomFormBits.jsx';
import { resetFields } from '../../../state/actions/partForm.js';
import { errMsgs } from '../../../validation.js';

const Basics = ({ handleInput }) => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const { editingPart, default: defaultParts } = useSelector(state => state.parts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputs.type === 'default'){
      dispatch(resetFields(['custom_type']));}
  }, [inputs.type]);


  return (
    <Form.Group as={CustomFormGroup}>

      <FormHeader
        label='Basics'
      />

      <Col sm={{ span: 8, offset: 4 }}>
        <Row>
          <Col xs="12" className="mb-1">
            <DropdownButton
              size="sm"
              variant="info"
              title={inputs.type ? defaultParts[inputs.type].title : 'Type'}
              disabled={!!editingPart}
            >
              {Object.keys(defaultParts).map(key => {
                return (
                  <Dropdown.Item
                    key={key}
                    onClick={handleInput}
                    id="type"
                    value={key}
                  >
                    {defaultParts[key].title}
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

          <Col sm="6" className="mb-xs-1 mb-sm-0">
            <Form.Control
              as={CustomInput}
              subText="Brand (Optional)"
              type="text"
              placeholder=""
              id="p_brand"
              onChange={handleInput}
              value={inputs.p_brand}
            />
          </Col>
          <Col sm="6" className="mb-xs-1 mb-sm-0">
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