import React from 'react';
import { useSelector } from 'react-redux';

const BikeSpec = (props) => {
  console.log('props', props)
  return (
    <div>{props.match.params.bikeId}</div>
  )
};

export default BikeSpec;
