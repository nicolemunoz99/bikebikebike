import React from 'react';
import ModalWrapper from '../wrappers/ModalWrapper.jsx';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm, resetFields } from '../../state/actions.js';

const NewPartForm = () => {
  const inputs = useSelector(state => state.form);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();


  const selectDropdown = (e) => {
    console.log(e.target.id, e.target.getAttribute('data-name'))
    dispatch(updateForm({[e.target.getAttribute('data-name')]: e.target.id}))
    if (e.target.getAttribute('data-name') === 'init_wear_method') {
      dispatch(resetFields(['p_dist_current', 'p_time_current', 'new_date']))
    }
  }

  const recordInput = (e) => {
    if (e.target.value.length > 20) return;
    console.log(e.target.id, e.target.value, e.target.type)
    if (e.target.id === 'tracking_method') dispatch(resetFields(['init_wear_method', 'usage_metric']))
    dispatch(updateForm({[e.target.id]: e.target.value}))
  }

  return (
    <ModalWrapper title="New Component">
      <div className="modal-style mx-auto col-10 p-3">
<Form id="part-form">

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
      Default or custom tracking

      <OverlayTrigger
        trigger="click"
        placement="right"
        overlay={
          <Popover id="tracking">
            <Popover.Content>
              <div>
                <p>
                "Default" assumes this is a new part.
                </p>
                <p>
                  "Custom" allows you to specify a current wear, and whether you 
                  want to track usage by distance and/or time.
                </p>

              </div>
            </Popover.Content>
          </Popover>
        }
      >
        <span className="material-icons">info</span>
      </OverlayTrigger>



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
            checked={inputs.tracking_method==='default' ? true : false}
            onChange={recordInput}
            disabled={inputs.type !== 'custom' ? false : true}
          />
        </Col>
        <Col sm="auto">
          <Form.Check
            type="radio"
            label="Custom"
            name="tracking_method"
            id="tracking_method"
            value="custom"
            checked={inputs.type == 'custom' || inputs.tracking_method==='custom' ? true : false}
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
        The default lifespan for a {inputs.type} is: [TODO]
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

      <Row>
        <Col xs="12" className="mb-1">

        {inputs.init_wear_method === 'est' ?
          <Row>
            <Col 
              sm="6"
              xs={12, {order: inputs.usage_metric==='time' ? 'first' : 'last'}} 
              className="mb-1"
            >
            <Form.Control 
              type="number" 
              placeholder={`hrs ${inputs.usage_metric==='dist' ? '(optional)' : ''}`} 
              id={`p_time_current`} 
              onChange={recordInput} 
              value={inputs.p_time_current}
            />
            </Col>
            <Col sm="6" className="mb-1">
            <Form.Control 
              type="number" 
              placeholder={`${distUnit} ${inputs.usage_metric==='time' ? '(optional)' : ''}`}
              id={'p_dist_current'} 
              onChange={recordInput} 
              value={inputs.p_dist_current} 
            />
            </Col>
          </Row>
        :
        null
        }

        {inputs.init_wear_method === 'strava' ?
        <>
          <Form.Control 
            type="date" 
            id={`new_date`} 
            onChange={recordInput} 
          />
            <div>
              When was this part new/last serviced? This component's useage as of now will be calculated from your Strava activities 
              and assuming the component was new on the date you enter above. Your first activity will be 
              used if the date you enter precedes your first Strava activity.
            </div>
          </>
        :
        null
        }

        {inputs.init_wear_method === 'new' ?
          <div>Distance/time will be calculated starting with your next activity.</div>
        :
        null
        }
        </Col>
      </Row>

    </Col>
  </Form.Group> 
  :
  null
  }

  {( inputs.init_wear_method === 'est' && (inputs.p_dist_current || inputs.p_time_current) ) ||
    (inputs.init_wear_method === 'strava' && inputs.new_date) ||
    inputs.init_wear_method === 'new' ?
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          Life/service interval:
        </Form.Label>
        <Col sm="8">
          <Row>
            <Col 
              sm="6"
              xs={12, {order: inputs.usage_metric==='time' ? 'first' : 'last'}} 
              className="mb-1"
            >
              <Form.Control 
                type="number" 
                placeholder={`hrs ${inputs.usage_metric === 'dist' ? '(optional)' : ''}` }
                id='lifespan_time'
                onChange={recordInput} 
              />
            </Col>
            <Col 
              sm="6"
              className="mb-1"
            >
              <Form.Control 
                type="number" 
                placeholder={`${distUnit} ${inputs.usage_metric === 'time' ? '(optional)' : ''}` }
                id='lifespan_dist'
                onChange={recordInput}
              />
            </Col>
          </Row>
        </Col> 
      </Form.Group>
    :
    null
  }

  {inputs.lifespan_dist || inputs.lifespan_time ?
  <Row>
    <Col>
      <button className="w-100">Submit</button>
    </Col>
  </Row>
  :
  null
  }


</Form>
      </div>
    </ModalWrapper>
  )
};

// const initialFormState = {
//   type: '', custom_type: '', p_brand: '', p_model: '',
//   p_dist_at_add: '', p_time_at_add: '', 
//   lifespan_dist: '', lifespan_time: '',
//   tracking_method: null, usage_metric: null,
//   init_wear_method: '', p_dist_current: '', p_time_current: '', 
//   new_date: '', p_date_added: ''
// };

const partList = {
  chain: {title: 'Chain'},
  freehub: {title: 'Freehub'},
  fork: {title: 'Suspension fork'},
  cassette: {title: 'Cassette'},
  custom: {title: '-- Custom --'}
};


const wearMethods = {
  strava: {title: 'Calculate from Strava'},
  est: {title: 'Estimate'},
  new: {title: 'New'}
};




export default NewPartForm