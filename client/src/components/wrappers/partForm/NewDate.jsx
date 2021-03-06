import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Row, Col, Popover } from 'react-bootstrap';
import { CustomInput, CustomFormGroup, FormHeader } from './CustomFormBits.jsx';
import { errMsgs } from '../../../validation.js';

const NewDate = ({ handleInput }) => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);


  return (
    <>
      <Form.Group as={CustomFormGroup}>
        
        <FormHeader
          label="Is this a new part?"
        />

        <Col sm={{span:8, offset:4}}>
          <Row>
            <Col sm="4">
              <Form.Check
                type="radio"
                label="Yes"
                id="new_at_add"
                value="y"
                checked={inputs.new_at_add === 'y' ? true : false}
                onChange={handleInput}
              />
            </Col>
            <Col sm="4">
              <Form.Check
                type="radio"
                label="No"
                id="new_at_add"
                value="n"
                checked={inputs.new_at_add === 'n' ? true : false}
                onChange={handleInput}
              />
            </Col>
          </Row>
        </Col>
      </Form.Group>


      {inputs.new_at_add &&
        <Form.Group as={CustomFormGroup}>

          <FormHeader
            label="New date"
            tooltip={newDateTooltip}
          />

          <Col sm={{span:8, offset:4}}>

            <Form.Control
              as={CustomInput}
              err={isReq.new_date && !isOk.new_date ? errMsgs.new_date : ''}
              type="date"
              id="new_date"
              onChange={handleInput}
              value={inputs.new_date}
              readOnly={inputs.new_at_add === 'y' ? true : false}
            />
          </Col>
        </Form.Group>
      }

    </>
  );
};

const newDateTooltip = (
  <Popover id="new-date-tooltip">
    <Popover.Content>
      <div>
        <p>
          Distance- and ride time-based wear will be calculated from your Strava feed, 
          starting with the first activity on the date you enter. 
        </p>
      </div>
    </Popover.Content>
  </Popover>
);

export default NewDate;