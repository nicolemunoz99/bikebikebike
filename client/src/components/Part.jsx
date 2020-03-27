import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WearMeter from './buildingBlocks/WearMeter.jsx';

const Part = (props) => {
  const part = useSelector(state => state.parts.list[props.id]);
  console.log('part', props.id)

  return (
    <div className="row">
      <div className="col-12">
        <div className="row align-items-center">
          <div className="col-4 text-right">

            {part.type}:

          </div>
          <div className="col-8">
          <WearMeter height="1rem" />
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default Part;