import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import WearMeter from './buildingBlocks/WearMeter.jsx';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import CustomNavLink from './buildingBlocks/CustomNavLink.jsx';


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
    <div className="shadow p-3 mb-5 bg-white rounded panel">
      <div className="row no-gutters align-items-top">

        {/* bike summary */}
        <div className="col-6">
          <CustomNavLink to={`/bikes/${id}`}>
            <div className="row">
              <div className="col-12 panel-title">
                {bike.name}
              </div>
              <div className="col-12 text-detail">
                <div>
                  {bike.b_brand} {bike.b_model}
                </div>
                <div>
                  {`${bike.b_dist_current} ${distUnit}`}
                </div>

                <div>
                  {`${bike.b_time_current} hrs`}
                </div>
              </div>
            </div>
          </CustomNavLink>
        </div>

        {/* menu */}
        <div className="col-6">

          <div className="row no-gutters justify-content-end text-right">
            <div className="col-auto mx-1 text-sm-center pointer">
              <OverlayTrigger
                placement='top'
                overlay={<Tooltip> add part </Tooltip>}
              >
                <span className="material-icons panel-menu-text"> add </span>
              </OverlayTrigger>
            </div>

          </div>

        </div>
      </div>


      <div className="row text-detail">


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





    </div>
  )
};



export default BikePanel;



{/* <div className="row text-detail">

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
</div> */}