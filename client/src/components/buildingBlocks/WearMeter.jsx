import React from 'react';
import { useSelector } from 'react-redux';

const WearMeter = ({ height='1rem', partId }) => {
  const part = useSelector(state => state.parts.list[partId]);


  const usage = part.usage_metric === 'dist' ? part.p_dist_current / part.lifespan_dist : part.p_time_current / part.lifespan_time;
  console.log('usage', usage)
  return (
    <div className="row no-gutters">
    <div className="col-12 wm-wrapper outline-grey">
      <div className="meter" style={{height:height}}>
        <div className="meter-mask" style={{width:(1-usage)*100+'%'}}>

        </div>
      </div>
    </div>
    </div>
  )
};

export default WearMeter;