import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import ModalWrapper from '../ModalWrapper.jsx';
import Basics from './Basics.jsx';
import TrackingMethod from './TrackingMethod.jsx';
import UseMetric from './UseMetric.jsx';
import CurrentWear from './CurrentWear.jsx';
import Lifespan from './Lifespan.jsx';
import { updatePartForm, resetForm } from '../../../state/actions.js';

const PartFormWrapper = () => {
  const { inputs } = useSelector(state => state.form)
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

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

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);


  return (
    <ModalWrapper title="New Component" minHeight="70%">
      <Form id="part-form" >
        
        <Basics />

        <TrackingMethod />

        {inputs.tracking_method === 'custom' &&
        <>
          <UseMetric useOptions={useOptions} />

          <CurrentWear />

          <Lifespan useOptions={useOptions} />
        </>
        }

      </Form>
    </ModalWrapper>
  )

};

export default PartFormWrapper;