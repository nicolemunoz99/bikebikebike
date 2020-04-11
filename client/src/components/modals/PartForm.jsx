import React, { useEffect } from 'react';
import _ from 'lodash';
import ModalWrapper from '../wrappers/ModalWrapper.jsx';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm, resetForm, submitNewPart } from '../../state/actions.js';
import { errMsgs } from './validation.js';

import CustomInput from './CustomInput.jsx';

const PartForm = () => {
  const { inputs, isReq, isOk, formIsValid } = useSelector(state => state.form);
  const { distUnit } = useSelector(state => state.user.measure_pref)
  const { bikeId } = useSelector(state => state.bikes.bikeMod);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    inputs.p_bike_id = bikeId;
    dispatch(submitNewPart(inputs, distUnit));
  };

  return (
  <ModalWrapper title="New Component">

      
      <Form onSubmit={handleSubmit} id="part-form" >

        <Basics />
        
        {isOk.type && (!isReq.custom_type || isOk.custom_type) &&
          <TrackingMethod />
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

        {isReq.usage_metric && isOk.tracking_method && <UsageMetric /> }
        
        {isReq.init_wear_method && isOk.usage_metric && <CurrentWear />}
        
        { 
          (
            (inputs.init_wear_method === 'new') ||
            (inputs.init_wear_method === 'strava' && isOk.new_date) ||
            (inputs.init_wear_method === 'est' && (
              (inputs.usage_metric === 'both' && isOk.p_dist_current && isOk.p_time_current) ||
              (inputs.usage_metric === 'dist' && isOk.p_dist_current) ||
              (inputs.usage_metric === 'time' && isOk.p_time_current)
            ))
          ) 
           &&
          <Lifespan />

        }
  
        { formIsValid &&
          <Row>
            <Col>
              <Button className="w-100" type="submit">Submit</Button>
            </Col>
          </Row>
        }

      </Form>

  </ModalWrapper>
  )
};

/*
##########################################
##########################################
Basics
##########################################
##########################################
*/

const Basics = () => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const dispatch = useDispatch();

  const partList = {
    chain: {title: 'Chain'},
    freehub: {title: 'Freehub'},
    fork: {title: 'Suspension fork'},
    cassette: {title: 'Cassette'},
    custom: {title: '-- Custom --'}
  };

  const handleInput = (e) => {
    let payload = {
      dropdown: e.target.getAttribute('data-dropdown'),
      radio: e.target.getAttribute('data-radio'),
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
                  onClick={handleInput}
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
            type="text" 
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


  );
}

/*
##########################################
##########################################
TrackingMethod
##########################################
##########################################
*/

const TrackingMethod = () => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    let payload = {
      dropdown: e.target.getAttribute('data-dropdown'),
      radio: e.target.getAttribute('data-radio'),
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
            data-radio="tracking_method"
            type="radio"
            label="Default"
            name="tracking_method"
            id="tracking_method"
            value="default"
            checked={inputs.tracking_method==='default' ? true : false}
            onChange={handleInput}
            disabled={inputs.type == 'custom' ? true : false}
          />
        </Col>
        <Col sm="4">
          <Form.Check
            data-radio="tracking_method"
            type="radio"
            label="Custom"
            name="tracking_method"
            id="tracking_method"
            value="custom"
            checked={inputs.tracking_method==='custom' ? true : false}
            onChange={handleInput}
          />
      </Col>
      </Row>
    </Col>
    
  </Form.Group>
  )
};



/*
##########################################
##########################################
UsageMetric
##########################################
##########################################
*/

const UsageMetric = () => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    let payload = {
      dropdown: e.target.getAttribute('data-dropdown'),
      radio: e.target.getAttribute('data-radio'),
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
              data-radio="usage_metric"
              label="Distance"
              name="usage_metric"
              id="usage_metric"
              value="dist"
              checked={inputs.usage_metric==='dist' ? true : false}
              onChange={handleInput}
            />
          </Col>
          <Col sm="auto">
            <Form.Check
              data-radio="usage_metric"
              type="radio"
              label="Time"
              name="usage_metric"
              id="usage_metric"
              value="time"
              checked={inputs.usage_metric==='time' ? true : false}
              onChange={handleInput}
            />
          </Col>
          <Col sm="auto">
            <Form.Check
              data-radio="usage_metric"
              type="radio"
              label="Whichever comes first"
              name="usage_metric"
              id="usage_metric"
              value="both"
              checked={inputs.usage_metric==='both' ? true : false}
              onChange={handleInput}
            />
          </Col>
        </Row>
    </Col>
    </Form.Group> 
  );
};


/*
##########################################
##########################################
CurrentWear
##########################################
##########################################
*/

const CurrentWear = () => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  const wearMethods = {
    strava: {title: 'Calculate from Strava'},
    est: {title: 'Estimate'},
    new: {title: 'New'}
  };

  const handleInput = (e) => {
    let payload = {
      dropdown: e.target.getAttribute('data-dropdown'),
      radio: e.target.getAttribute('data-radio'),
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
                <Dropdown.Item onClick={handleInput} data-dropdown="init_wear_method" key={methodKey} id={methodKey}>
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
              err={isReq.p_time_current && !isOk.p_time_current ? errMsgs.p_time_current : ''}
              subText={`hours ${isReq.p_time_current ? '' : '(Optional)'}`} 
              type="number" 
              placeholder='' 
              id={`p_time_current`} 
              onChange={handleInput} 
              value={inputs.p_time_current}
            />

            </Col>

            <Col sm="6" className="mb-3">
            <Form.Control
              as={CustomInput}
              err={isReq.p_dist_current && !isOk.p_dist_current ? errMsgs.p_dist_current : ''}  
              subText={`${distUnit} ${isReq.p_dist_current ? '' : '(Optional)'}`}
              type="number" 
              placeholder=''
              id={'p_dist_current'} 
              onChange={handleInput} 
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
            as={CustomInput}
            err={isReq.new_date && !isOk.new_date ? errMsgs.new_date : ''} 
            type="date" 
            id={`new_date`} 
            onChange={handleInput}
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
##########################################
##########################################
Lifespan
##########################################
##########################################
*/

const Lifespan = () => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    let payload = {
      dropdown: e.target.getAttribute('data-dropdown'),
      radio: e.target.getAttribute('data-radio'),
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
                err={isReq.lifespan_time && !isOk.lifespan_time ? errMsgs.lifespan_time : ''}  
                subText={`hours ${isReq.lifespan_time ? '' : '(Optional)'}` }
                type="number" 
                placeholder=''
                id='lifespan_time'
                onChange={handleInput} 
                value={inputs.lifespan_time}
              />
            </Col>
            <Col 
              sm="6"
              className="mb-3"
            >
              <Form.Control
                as={CustomInput}
                err={isReq.lifespan_dist && !isOk.lifespan_dist ? errMsgs.lifespan_dist : ''}   
                subText={`${distUnit} ${isReq.lifespan_dist ? '' : '(Optional)'}` }
                type="number" 
                placeholder=''
                id='lifespan_dist'
                onChange={handleInput}
                value={inputs.lifespan_dist}
              />              
            </Col>
          </Row>
        </Col> 
      </Form.Group>
  );
};



export default PartForm;