import React, { useState } from 'react';
import ModalWrapper from '../wrappers/ModalWrapper.jsx';
import { Form, Row, Col, Dropdown, DropdownButton } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm } from '../../state/actions.js';

const NewPartForm = () => {
  // const [inputs, setInputs] = useState(initForm);
  // const [errorList, setErrors] = useState([]);
  const inputs = useSelector(state => state.form);
  const dispatch = useDispatch();


  const selectPart = (e) => {
    dispatch(updateForm({type: e.target.id}))
  }

  const recordInput = (e) => {
    console.log(e.target.id, e.target.value)
    dispatch(updateForm({[e.target.id]: e.target.value}))
  }

  return (
    <ModalWrapper title="New Component">
      <div className="modal-style mx-auto col-10 p-3">
<Form>

  <Form.Group as={Row}>
    <Form.Label column sm="4">
      Basics
    </Form.Label>

    <Col sm="8">
      <Row>
        <Col xs="12" className="mb-1">
          <DropdownButton
            id="part-type"
            size="sm"
            variant="info"
            title={inputs.type ? inputs.type : 'Type'}
          >
            {partList.map(part => {
              return (
                <Dropdown.Item onClick={selectPart} key={part} id={part.toLowerCase()}>
                  {part}
                </Dropdown.Item> 
              )
            })}
          </DropdownButton>
        </Col>
        {inputs.type === 'custom' ?
        <Col sm="12" className="mb-1">
          <Form.Control type="text" placeholder="Specify type" id="custom_type" onChange={recordInput} />
        </Col>
        :
        null
        }
        <Col sm="6" className="mb-1">
          <Form.Control type="text" placeholder="Brand" id="p_brand" onChange={recordInput} />
        </Col>
        <Col sm="6" className="mb-1">
          <Form.Control type="text" placeholder="Model" id="p_model" onChange={recordInput} />
        </Col>

      </Row>
    </Col>
  </Form.Group>
  {inputs.type ?
  <Form.Group as={Row}>
    <Form.Label column sm="4">
      Default tracking or customize?
    </Form.Label>
    <Col sm="8">
      <Row>
        <Col sm="auto">
          <Form.Check
            type="radio"
            label="Default"
            name="tracking-spec"
            id="default"
          />
        </Col>
        <Col sm="auto">
          <Form.Check
            type="radio"
            label="Custom"
            name="tracking-spec"
            id="custom"
          />
      </Col>
      </Row>

    </Col>
    
  </Form.Group>
  :
  null
  }

</Form>
      </div>
    </ModalWrapper>
  )
};

const partList = ['Chain', 'Freehub', 'Suspension Fork', 'Cassette', 'CUSTOM'];

// const initForm = {
//   type: '', custom_type: '', p_brand: '', p_model: '',
//   p_dist_at_add: '', p_time_at_add: '', 
//   lifespan_dist: '', lifespan_time: '',
//   tracking_method: null, useage_metric: null,
//   initial_wear_method: '', p_dist_current: '', p_time_current: '', 
//   new_date: '', p_date_added: ''
// };

const wearMethods = [
  {title: 'Calculate from Strava', id: 'strava'},
  {title: 'Estimate', id: 'estimate'},
  {title: 'New Part', id: 'new'}
];


export default NewPartForm