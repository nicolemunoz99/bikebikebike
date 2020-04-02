import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PanelWrapper from './buildingBlocks/PanelWrapper.jsx';
import WearMeter from './buildingBlocks/WearMeter.jsx';


const PartPanel = ({ id }) => {
  const part = useSelector(state => state.parts.list[id])
  const distUnit = useSelector(state => state.user.measure_pref);
  const location = useLocation();

  const menu = [
    { tooltip: 'edit', icon: 'edit', link: `${location.pathname}`, modal: 'NewPartForm' }
  ]


  return (
    <div className="row no-gutters text-detail justify-content-center">
      <div className="col-12 part-panel">
        hi
      </div>
    </div>

  );
}
export default PartPanel;


// <PanelWrapper
// title={part.type}
// subTitle={`${part.p_brand}${part.p_model ? ` - ${part.p_model}` : ''}`}
// menu={menu}
// >
// <div className="row no-gutters text-detail">
//   <div className="col-sm-6 ">
//     <div>{`${part.p_dist_current} ${distUnit}`}</div>
//     <div>{`${part.p_time_current} hrs`}</div>
//   </div>
//   <div className="col-sm-6">
//     <WearMeter partId={part.part_id}/>
//   </div>
  
// </div>
// <div className="row no-gutters">
//   <div className="col-12">

//   </div>
// </div>
// </PanelWrapper>