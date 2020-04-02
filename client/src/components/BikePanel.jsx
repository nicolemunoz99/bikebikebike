import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import WearMeter from './buildingBlocks/WearMeter.jsx';
import PanelWrapper from './buildingBlocks/PanelWrapper.jsx'


const BikePanel = ({ id }) => {
  const distUnit = useSelector(state => state.user.measure_pref);
  const bike = useSelector(state => state.bikes.list[id]);
  const parts = useSelector(state => state.parts.list);

  const menu = [
    { tooltip: 'edit bike', icon: 'edit', link: '.' },
    { tooltip: 'details', icon: 'description', link: `/bikes/${id}` },
    { tooltip: 'add component', icon: 'add', link: `${useLocation().pathname}/new` }
  ];


  return (
    <PanelWrapper 
      title={bike.name}
      subTitle={`${bike.b_brand ? bike.b_brand : 'brand'} ${bike.b_model ? bike.b_model : 'model'}`}
      menu={menu}
    >

{/* parts summary */}

      <div className="row text-detail">

        <div className="col-12">
          <div>
            {`${bike.b_dist_current} ${distUnit}`}
          </div>
          <div>
            {`${bike.b_time_current} hrs`}
          </div>
        </div>

      </div>
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