import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import ModalWrapper from '../ModalWrapper.jsx';
import Basics from './Basics.jsx';
import TrackingMethod from './TrackingMethod.jsx';
import UseMetric from './UseMetric.jsx';
import NewDate from './NewDate.jsx';
import Lifespan from './Lifespan.jsx';
import { updatePartForm, resetForm } from '../../../state/actions.js';

const PartFormWrapper = () => {
  const { inputs, isOk, isReq, formIsValid } = useSelector(state => state.form)
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  const handleInput = (e) => {
    let value;
    if (e.target.getAttribute('data-checkbox')) {
      value = !inputs[e.target.id]
    } else {
      value = e.target.value !== undefined ? e.target.value : e.target.getAttribute('value');
    }
    dispatch(updatePartForm( [ {[e.target.id]: value } ] ));

  };

  let useOptions = {
    'Distance': {
      field: 'use_metric_dist',
      value: 'dist',
      subText: `Distance (${distUnit})`
    },
    'Ride time': {
      field: 'use_metric_time',
      value: 'time',
      subText: 'Ride time (hrs)'
    },
    'Date': {
      field: 'use_metric_date',
      value: 'date',
      subText: 'Date'
    }
  };


  return (
    <ModalWrapper title="New Component" minHeight="70%">
      
      <Form id="part-form" >
        
        <Basics handleInput={handleInput} />

        { isOk.type && (!isReq.custom_type || isOk.custom_type) && <TrackingMethod handleInput={handleInput} /> }

        { inputs.tracking_method === 'custom' && <UseMetric handleInput={handleInput} useOptions={useOptions} /> }

        { (inputs.use_metric_date || inputs.use_metric_time || inputs.use_metric_dist) && <NewDate handleInput={handleInput} /> }

        { isOk.new_date && <Lifespan handleInput={handleInput} useOptions={useOptions} /> }

        {formIsValid &&
          <Button variant="primary" type="submit" className="w-100">
            Submit
          </Button>
        }


      </Form>
    
    </ModalWrapper>
  )

};

export default PartFormWrapper;