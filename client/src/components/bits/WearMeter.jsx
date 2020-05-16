import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const WearMeter = ({ height='1rem', partId, wear }) => {
  const part = useSelector(state => state.parts.list[partId]);

  useEffect(() => {
    wear = !isNaN(Number(wear)) ? wear : 0;
  }, [wear])


  return (
    <div className="row no-gutters">
    <div className="col-12 wm-wrapper border">
      <div className="meter" style={{height:height}}>
        <div className="meter-mask" style={{width:(1-wear)*100+'%'}} />
      </div>
    </div>
    </div>
  )
};

export default WearMeter;