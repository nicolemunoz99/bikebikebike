import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, showPartForm } from '../state/actions.js';
import PageWrapper from './wrappers/PageWrapper.jsx';
import WearMeter from './WearMeter.jsx';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import CustomNavLink from './wrappers/CustomNavLink.jsx';

// aws auth stuff
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import config from "../aws-exports.js";
Amplify.configure(config);

const BikeList = () => {
  const { hasStravaAccess, bikes: bikeIds } = useSelector(state => state.user);
  const distUnit = useSelector(state => state.user.measure_pref);
  const allBikes = useSelector(state => state.bikes.list);
  const allParts = useSelector(state => state.parts.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);


  if (!hasStravaAccess) {
    return <Redirect to='stravaAuth' />
  }

  return (

    <PageWrapper title="Bikes">
      
      <div className="mt-3">
      
        {
          bikeIds.map((id) => {
            let bike = allBikes[id];
            return (






// BIKE PANEL
<div key={id} className="shadow p-3 mb-5 bg-white rounded panel">
  <div className="row no-gutters align-items-top">

    {/* summary links to details page*/}
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

    {/* add part button */}
    <div className="col-6" >

      <div className="row no-gutters justify-content-end text-right">
        <div className="col-auto mx-1 text-sm-center pointer" onClick={() => dispatch(showPartForm(id))}>
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

  {/* wear meter for all parts for given bike */}
  <div className="row no-gutters justify-content-end">
    <div className="col-sm-6">

      {
        bike.parts.map(partId => {
          let part = allParts[partId]
          return (

            <div key={partId} className="row no-gutters align-items-center">
              <div className="col-4 text-right text-detail pr-1">
                {part.type}:
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
          
            })
        }
      </div>

    </PageWrapper>

  )
};

// export default withAuthenticator(Bikes, {includeGreetings: true} );

export default BikeList;