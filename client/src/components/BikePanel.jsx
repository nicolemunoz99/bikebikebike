import React from 'react';
import { useSelector } from 'react-redux';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import WearMeter from './buildingBlocks/WearMeter.jsx';

import PanelWrapper from './buildingBlocks/PanelWrapper.jsx'


const BikePanel = ({ id }) => {
  const distUnit = useSelector(state => state.user.measure_pref);
  const bike = useSelector(state => state.bikes.list[id]);
  const parts = useSelector(state => state.parts.list);

  const menu = [
    { tooltip: 'edit bike', icon: 'edit', link: '/' },
    { tooltip: 'details', icon: 'description', link: `/bikes/${id}` },
    { tooltip: 'add component', icon: 'add', link: '/' }
  ];


  return (
    <PanelWrapper 
      title={bike.name}
      distCurr={bike.b_dist_current}
      timeCurr={bike.b_time_current}
      menu={menu}
    >

{/* parts summary */}
      <div className="row no-gutters justify-content-end">
        <div className="col-sm-6">

          {
            bike.parts.map(partId => {
              return (

                <div key={partId} className="row no-gutters align-items-center">

                  <div className="col-4 text-right text-detail pr-1">
                    {parts[partId].type}:
                  </div>

                  <div className="col-8">
                    <WearMeter partId={partId} height="0.5rem" />
                  </div>

                </div>

              )

            })

          }

        </div>
      </div>

    </PanelWrapper>
  )
};



export default BikePanel;