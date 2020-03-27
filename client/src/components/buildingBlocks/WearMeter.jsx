import React from 'react';

const WearMeter = (props) => {

  return (
    <div className="row">
    <div className="col wm-wrapper">
      <div className="meter" style={{height:props.height}}>
        <div className="meter-mask" style={{width:20+'%'}}>

        </div>
      </div>
    </div>
    </div>
  )
};

export default WearMeter;