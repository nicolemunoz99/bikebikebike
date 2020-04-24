import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Row, Col } from 'react-bootstrap';
import ModalWrapper from '../ModalWrapper.jsx';
import Basics from './Basics.jsx';
import TrackingMethod from './TrackingMethod.jsx';
import WearMetric from './WearMetric.jsx';
import NewDate from './NewDate.jsx';
import Lifespan from './Lifespan.jsx';
import PartSummary from './PartSummary.jsx';
import { resetForm } from '../../../state/actions.js';

export const PartFormWrapper = ({ handleSubmit, updatePartForm, title, reset, submitLabel='Submit' }) => {
  const { inputs, isOk, isReq, formIsValid } = useSelector(state => state.form)
  const distUnit = useSelector(state => state.user.measure_pref);
  const { editingPart } = useSelector(state => state.parts)
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  let partList = {
    chain: { title: 'Chain' },
    freehub: { title: 'Freehub' },
    fork: { title: 'Suspension fork' },
    cassette: { title: 'Cassette' },
    custom: { title: '-- Custom --' }
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
  }

  const handleInput = (e) => {
    let value;
    if (e.target.getAttribute('data-checkbox')) {
      value = !inputs[e.target.id]
    } else {
      value = e.target.value !== undefined ? e.target.value : e.target.getAttribute('value');
    }
    if (value.length > 20) return;
    dispatch(updatePartForm([{ [e.target.id]: value }]));
  };



  return (
    <ModalWrapper title={title} minHeight="70%">
      
      <Row 
        className='justify-content-center align-items-center no-gutters my-3 pointer text-muted'
        onClick={()=>reset()}
      >
        <Col xs='auto' className='align-self-center'>
          <span className="material-icons d-block mr-2">autorenew</span>
        </Col>

        <Col xs='auto'>
          Start over
        </Col>
      </Row>


      <Form onSubmit={handleSubmit} id="part-form" >

        {editingPart === '' ?
          <>
            <Basics handleInput={handleInput} partList={partList} />

            {isOk.type && (!isReq.custom_type || isOk.custom_type) && <TrackingMethod handleInput={handleInput} />}

            {(inputs.tracking_method === 'custom') &&
              <>
                <WearMetric handleInput={handleInput} useOptions={useOptions} />
                {(inputs.use_metric_date || inputs.use_metric_time || inputs.use_metric_dist) &&
                  <>
                    <NewDate handleInput={handleInput} />
                    {isOk.new_date && <Lifespan handleInput={handleInput} useOptions={useOptions} />}
                  </>
                }

              </>
            }
          </>
          :
          <>
            <Basics handleInput={handleInput} partList={partList} />
            <TrackingMethod handleInput={handleInput} />
            <WearMetric handleInput={handleInput} useOptions={useOptions} />
            {(inputs.use_metric_dist || inputs.use_metric_time || inputs.use_metric_date) &&
              <Lifespan handleInput={handleInput} useOptions={useOptions} />
            }
          </>

        }

        {formIsValid && <PartSummary />}

        <Button variant="primary" type="submit" className="w-100" disabled={!formIsValid}>
          {submitLabel}
        </Button>

      </Form>
    </ModalWrapper>
  );

};
