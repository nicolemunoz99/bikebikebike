import React from 'react';
import { useSelector } from 'react-redux';
import PanelWrapper from './buildingBlocks/PanelWrapper.jsx';


const PartPanel = ({ id }) => {
  const part = useSelector(state => state.parts.list[id])

  return (
    <PanelWrapper
      title={part.type}
      distCurr={part.p_dist_current}
      timeCurr={part.p_time_current}
    >
      Part
    </PanelWrapper>
  );
}
export default PartPanel;