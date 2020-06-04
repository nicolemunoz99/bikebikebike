import React from 'react';
import xDate from 'xdate';
import { useSelector } from 'react-redux';
import { Form, Col } from 'react-bootstrap';
import { CustomFormGroup, FormHeader } from './CustomFormBits.jsx';


const PartSummary = () => {
  const {
    type, custom_type, tracking_method,
    lifespan_time, lifespan_date, lifespan_dist,
    use_metric_dist, use_metric_time, use_metric_date
  } = useSelector(state => state.form.inputs);

  const distUnit = useSelector(state => state.user.measure_pref);
  const defaultMetrics = useSelector(state => state.parts.default);

  const partToRender = custom_type || defaultMetrics[type].title


  return (

    <Form.Group as={CustomFormGroup}>
      
        
      <FormHeader 
        label={`The ${tracking_method.toUpperCase()} life/service interval for your ${partToRender}`}
      />
        

        <Col xs={{ span: 8, offset: 4 }}>
          <div className='my-2 text-left'>
            {lifespan_dist ? <li>{`${lifespan_dist} ${distUnit}`}</li> : ''}
            {lifespan_time ? <li>{`${lifespan_time} hours (ride time)`}</li> : ''}
            {lifespan_date ? <li>{`${xDate(lifespan_date).toString('MMM dd, yyyy')}`}</li> : ''}
          </div>

        </Col>
        <Col sm={12} className="ml-auto text-right">
          {use_metric_dist + use_metric_time + use_metric_date > 1 ? '...whichever expires first.' : ''}
        </Col>

    </Form.Group>

  );
};

export default PartSummary;

