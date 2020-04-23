import React from 'react';
import { useSelector } from 'react-redux';

const WearMeter = ({ height='1rem', partId, wear }) => {
  const part = useSelector(state => state.parts.list[partId]);

  wear = !isNaN(Number(wear)) ? wear : 0.5;


  return (
    <div className="row no-gutters">
    <div className="col-12 wm-wrapper outline-grey">
      <div className="meter" style={{height:height}}>
        <div className="meter-mask" style={{width:(1-wear)*100+'%'}}>

        </div>
      </div>
    </div>
    </div>
  )
};

export default WearMeter;