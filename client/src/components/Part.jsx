import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WearMeter from './buildingBlocks/WearMeter.jsx';

const Part = ({ id, children }) => {
  const part = useSelector(state => state.parts.list[id]);

  return (

    <div className="row no-gutters align-items-center">

      <div className="col-4 text-right text-detail pr-1">
        {part.type}:
          </div>

      <div className="col-8">
        <WearMeter partId={part.part_id} height="0.5rem" />
      </div>

      <div className="row">
        {children}
      </div>
    </div>

  );
};

export default Part;