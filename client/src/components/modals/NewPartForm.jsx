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


  const selectDropdown = (e) => {
    console.log(e.target.id, e.target.getAttribute('data-name'))
    dispatch(updateForm({[e.target.getAttribute('data-name')]: e.target.id}))
  }

  const recordInput = (e) => {
    console.log(e.target.id, e.target.value, e.target.type)
    dispatch(updateForm({[e.target.id]: e.target.value}))
  }

  return (
    <ModalWrapper title="New Component">
      <div className="modal-style mx-auto col-10 p-3">
<Form>

  <Form.Group as={Row}>
    <Form.Label column sm="4">
      Basics:
    </Form.Label>

    <Col sm="8">
      <Row>
        <Col xs="12" className="mb-1">
          <DropdownButton
            id="part-type"
            size="sm"
            variant="info"
            title={inputs.type ? partList[inputs.type].title : 'Type'}
          >
            {Object.keys(partList).map(partKey => {
              console.log('partKey', partKey)
              return (
                <Dropdown.Item onClick={selectDropdown} data-name="type" key={partKey} id={partKey}>
                  {partList[partKey].title}
                </Dropdown.Item> 
              )
            })}
          </DropdownButton>
        </Col>
        {inputs.type === 'custom' ?
        <Col sm="12" className="mb-1">
          <Form.Control type="text" placeholder="Your custom part" id="custom_type" onChange={recordInput} />
        </Col>
        :
        null
        }
        <Col sm="6" className="mb-1">
          <Form.Control type="text" placeholder="Brand" id="p_brand" onChange={recordInput} value={inputs.p_brand} />
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
      Default or custom tracking?
    </Form.Label>
    <Col sm="8">
      <Row>
        <Col sm="auto">
          <Form.Check
            type="radio"
            label="Default"
            name="tracking_method"
            id="tracking_method"
            value="default"
            checked={inputs.tracking_method==="default" ? true : false}
            onChange={recordInput}
          />
        </Col>
        <Col sm="auto">
          <Form.Check
            type="radio"
            label="Custom"
            name="tracking_method"
            id="tracking_method"
            value="custom"
            checked={inputs.tracking_method==="custom" ? true : false}
            onChange={recordInput}
          />
      </Col>
      </Row>
    </Col>
    
  </Form.Group>
  :
  null
  }

  {inputs.tracking_method === 'default' ?
    <Row>
      <Col sm="12">
        <p>
        "Default" tacking assumes this component is new. If you would like
        to specify the current wear, select "custom" tracking above.
        </p>
        <p>
        The default service/replacement intervale for a {inputs.type} is [TODO]
        </p>

      </Col>
    </Row>
  :
  null
  }

  {inputs .tracking_method === 'custom' ?
    <Form.Group as={Row}>
      <Form.Label column sm="4">
        Usage Metric:
      </Form.Label>
      <Col sm="8">
        <Row>
          <Col sm="auto">
            <Form.Check
              type="radio"
              label="Distance"
              name="usage_metric"
              id="usage_metric"
              value="dist"
              checked={inputs.usage_metric==='dist' ? true : false}
              onChange={recordInput}
            />
          </Col>
          <Col sm="auto">
            <Form.Check
              type="radio"
              label="Time"
              name="usage_metric"
              id="usage_metric"
              value="time"
              checked={inputs.usage_metric==='time' ? true : false}
              onChange={recordInput}
            />
          </Col>
        </Row>
    </Col>
    </Form.Group> 
  :
  null
  }

  {inputs.usage_metric ?
  <Form.Group as={Row}>
    <Form.Label column sm="4">
      Current wear:
    </Form.Label>
    <Col sm="8">
    <Row>
      <Col xs="12" className="mb-1">
        <DropdownButton
          id="init_wear_method"
          size="sm"
          variant="info"
          title={inputs.init_wear_method ? wearMethods[inputs.init_wear_method].title : 'Select'}
        >
          {Object.keys(wearMethods).map(methodKey => {
            return (
              <Dropdown.Item onClick={selectDropdown} data-name="init_wear_method" key={methodKey} id={methodKey}>
                {wearMethods[methodKey].title}
              </Dropdown.Item> 
            )
          })}
        </DropdownButton>
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

const partList = {
  chain: {title: 'Chain'},
  freehub: {title: 'Freehub'},
  fork: {title: 'Suspension fork'},
  cassette: {title: 'Cassette'},
  custom: {title: '-- Custom --'}
};

// const initForm = {
//   type: '', custom_type: '', p_brand: '', p_model: '',
//   p_dist_at_add: '', p_time_at_add: '', 
//   lifespan_dist: '', lifespan_time: '',
//   tracking_method: null, useage_metric: null,
//   init_wear_method: '', p_dist_current: '', p_time_current: '', 
//   new_date: '', p_date_added: ''
// };

const wearMethods = {
  strava: {title: 'Calculate from Strava'},
  est: {title: 'Estimate'},
  new: {title: 'New'}
};




export default NewPartForm