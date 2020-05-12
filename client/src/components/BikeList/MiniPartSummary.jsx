import React from 'react';
import { useSelector } from 'react-redux';
import usePartTypeRender from '../../hooks/usePartTypeRender.js';
import WearMeter from '../WearMeter.jsx';

const MiniPartSummary = ({ partId }) => {
  const part = useSelector(state => state.parts.list)[partId];
  const partTypeRender = usePartTypeRender(part);

  return (
    <div className="row no-gutters align-items-center">
      <div className="col-4 text-right text-detail pr-1">
        {partTypeRender}:
      </div>

      <div className="col-8">
        <WearMeter partId={partId} height="0.5rem" />
      </div>
    </div>
  )
};

export default MiniPartSummary;