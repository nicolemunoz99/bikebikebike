import React from 'react';
import _ from 'lodash';
import ModalWrapper from '../wrappers/ModalWrapper.jsx';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm } from '../../state/actions.js';
import { isValid } from './validation.js';

import CustomInput from './CustomInput.jsx'

const NewPartForm = () => {
  const inputs = useSelector(state => state.form.fields);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
  }

  return (
  <ModalWrapper title="New Component">
    <div className="modal-style mx-auto col-10 p-3">
      
      <Form onSubmit={handleSubmit} id="part-form" >

        <Basics />
        
        
        {inputs.type && (inputs.type !== 'custom' || inputs.custom_type) ?
          <TrackingMethod />
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

        { inputs.tracking_method === 'custom' ?
        <>
          <UsageMetric />
          {inputs.usage_metric ?
            <CurrentWear />
          :
          null
          }

          {( inputs.init_wear_method === 'est' && (inputs.p_dist_current || inputs.p_time_current) ) ||
            (inputs.init_wear_method === 'strava' && inputs.new_date) ||
            inputs.init_wear_method === 'new' ?
              <Lifespan />
            :
            null
          }

          {inputs.tracking_method === 'default' || ( inputs.lifespan_dist || inputs.lifespan_time ) ?
            <Row>
              <Col>
                <Button className="w-100" type="submit">Submit</Button>
              </Col>
            </Row>
          :
          null
        }
        </>
        :
        null
      }


      </Form>
    </div>
  </ModalWrapper>
  )
};

/*
#####################
Basics
#####################
*/

const Basics = () => {
  const inputs = useSelector(state => state.form.fields);
  const errs = useSelector(state => state.form.errs);
  const dispatch = useDispatch();

  const partList = {
    chain: {title: 'Chain'},
    freehub: {title: 'Freehub'},
    fork: {title: 'Suspension fork'},
    cassette: {title: 'Cassette'},
    custom: {title: '-- Custom --'}
  };

  const recordInput = (e) => {
    let payload = {
      dropdown: e.target.getAttribute('data-dropdown'),
      id: e.target.id,
      value: e.target.value
    };
    dispatch(updateForm(payload));
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
            id="part-type"
            size="sm"
            variant="info"
            title={inputs.type ? partList[inputs.type].title : 'Type'}
            
          >
            {Object.keys(partList).map(partKey => {
              return (
                <Dropdown.Item  data-dropdown="type" key={partKey} id={partKey} 
                  onClick={recordInput}
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
            err={errs.custom_type && !isValid.custom_type(inputs.custom_type) ? errs.custom_type : ''}
            type="text" 
            placeholder="Your custom part" 
            id="custom_type" 
            onChange={recordInput}
            value={inputs.custom_type}
          />
        </Col>
        :
        null
        }

        <Col sm="6" className="mb-1">
          <Form.Control 
            type="text" 
            placeholder="Brand (optional)"
            id="p_brand"
            onChange={recordInput}
            value={inputs.p_model}
          />
        </Col>
        <Col sm="6" className="mb-1">
          <Form.Control 
            type="text" 
            placeholder="Model (optional)" 
            id="p_model" 
            onChange={recordInput} 
            value={inputs.p_model}
          />
        </Col>

      </Row>
    </Col>
  </Form.Group>


  );
}

/*
#####################
TrackingMethod
#####################
*/

const TrackingMethod = () => {
  const inputs = useSelector(state => state.form.fields);
  const dispatch = useDispatch();

  const recordInput = (e) => {
    let payload = {
      dropdown: e.target.getAttribute('data-dropdown'),
      id: e.target.id,
      value: e.target.value
    };
    dispatch(updateForm(payload));
  }

  return(
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
        <Col sm="4">
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
        <Col sm="4">
          <Form.Check
            type="radio"
            label="Custom"
            name="tracking_method"
            id="tracking_method"
            value="custom"
            checked={inputs.tracking_method==='custom' ? true : false}
            onChange={recordInput}
          />
      </Col>
      </Row>
    </Col>
    
  </Form.Group>
  )
};



/*
#####################
UsageMetric
#####################
*/

const UsageMetric = () => {
  const inputs = useSelector(state => state.form.fields);
  const dispatch = useDispatch();

  const recordInput = (e) => {
    let payload = {
      dropdown: e.target.getAttribute('data-dropdown'),
      id: e.target.id,
      value: e.target.value
    };
    dispatch(updateForm(payload));
  };

  return(
<Form.Group as={Row}>
      <Form.Label column sm="4">
        Usage Metric:
      </Form.Label>
      <Col sm="8">
        <Row>
          <Col sm="4">
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
          <Col sm="auto">
            <Form.Check
              type="radio"
              label="Whichever comes first"
              name="usage_metric"
              id="usage_metric"
              value="both"
              checked={inputs.usage_metric==='both' ? true : false}
              onChange={recordInput}
            />
          </Col>
        </Row>
    </Col>
    </Form.Group> 
  );
};


/*
#####################
CurrentWear
#####################
*/

const CurrentWear = () => {
  const inputs = useSelector(state => state.form.fields);
  const errs = useSelector(state => state.form.errs);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  const wearMethods = {
    strava: {title: 'Calculate from Strava'},
    est: {title: 'Estimate'},
    new: {title: 'New'}
  };

  const recordInput = (e) => {
    let payload = {
      dropdown: e.target.getAttribute('data-dropdown'),
      id: e.target.id,
      value: e.target.value
    };
    dispatch(updateForm(payload));
  };

  return(
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
                <Dropdown.Item onClick={recordInput} data-dropdown="init_wear_method" key={methodKey} id={methodKey}>
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
              className="mb-3"
            >
            <Form.Control
              as={CustomInput}
              err={errs.p_time_current && !isValid.p_time_current(inputs.p_time_current) ? errs.p_time_current : ''} 
              type="number" 
              placeholder='' 
              id={`p_time_current`} 
              onChange={recordInput} 
              value={inputs.p_time_current}
            />
            <Form.Text className="text-muted">
              {`hours ${inputs.usage_metric==='dist' ? '(Optional)' : '(Required)'}`}
            </Form.Text>
            </Col>

            <Col sm="6" className="mb-3">
            <Form.Control
              as={CustomInput}
              err={errs.p_dist_current && !isValid.p_dist_current(inputs.p_dist_current) ? errs.p_dist_current : '' }  
              type="number" 
              placeholder=''
              id={'p_dist_current'} 
              onChange={recordInput} 
              value={inputs.p_dist_current} 
            />
            <Form.Text className="text-muted">
              {`${distUnit} ${inputs.usage_metric==='time' ? '(Optional)' : '(Required)'}`}
            </Form.Text>
            </Col>

          </Row>
        :
        null
        }

        {inputs.init_wear_method === 'strava' ?
        <>
          <Form.Control 
            as={CustomInput}
            err={errs.new_date && !isValid.new_date(inputs.new_date) ? errs.new_date : ''} 
            type="date" 
            id={`new_date`} 
            onChange={recordInput}
            value={inputs.new_date} 
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
  );
};

/*
#####################
Lifespan
#####################
*/

const Lifespan = () => {
  const inputs = useSelector(state => state.form.fields);
  const errs = useSelector(state => state.form.errs);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  const recordInput = (e) => {
    let payload = {
      dropdown: e.target.getAttribute('data-dropdown'),
      id: e.target.id,
      value: e.target.value
    };
    dispatch(updateForm(payload));
  };

  return(
    <Form.Group as={Row}>
        <Form.Label column sm="4">
          Life/service interval:
        </Form.Label>
        <Col sm="8">
          <Row>
            <Col 
              sm="6"
              xs={12, {order: inputs.usage_metric==='time' ? 'first' : 'last'}} 
              className="mb-3"
            >
              <Form.Control
                as={CustomInput}
                err={errs.lifespan_time && !isValid.lifespan_time(inputs.lifespan_time) ? errs.lifespan_time : ''}  
                type="number" 
                placeholder=''
                id='lifespan_time'
                onChange={recordInput} 
                value={inputs.lifespan_time}
              />
              <Form.Text className="text-muted">
                {`hours ${inputs.usage_metric === 'dist' ? '(Optional)' : '(Required)'}` }
              </Form.Text>
            </Col>
            <Col 
              sm="6"
              className="mb-3"
            >
              <Form.Control
                as={CustomInput}
                err={errs.lifespan_dist && !isValid.lifespan_dist(inputs.lifespan_dist) ? errs.lifespan_dist : ''}   
                required
                type="number" 
                placeholder=''
                id='lifespan_dist'
                onChange={recordInput}
                value={inputs.lifespan_dist}
              />
              <Form.Text className="text-muted">
                {`${distUnit} ${inputs.usage_metric === 'time' ? '(Optional)' : '(Required)'}` }
              </Form.Text>
              
            </Col>
          </Row>
        </Col> 
      </Form.Group>
  );
};










export default NewPartForm;