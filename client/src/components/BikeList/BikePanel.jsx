import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MiniPartSummary from './MiniPartSummary.jsx';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { showNewPartForm } from '../../state/actions/partForm.js';
import CustomNavLink from '../bits/CustomNavLink.jsx';
import _ from 'lodash';
import { setSelectedBike } from '../../state/actions/bikes.js';
import { usePartSort } from '../../hooks/wearHooks.js';

const BikePanel = ({ bikeId }) => {
  const bike = useSelector(state => state.bikes.list)[bikeId];
  const { measure_pref: distUnit } = useSelector(state => state.user);
  const orderedParts = usePartSort(bike);
  const dispatch = useDispatch();

  
  return (

    <div className="shadow p-3 mb-5 bg-white rounded panel">
      <div className="row no-gutters align-items-top">

        {/* summary links to details page*/}
        <div className="col-6">
          <CustomNavLink 
            onClick={() => dispatch(setSelectedBike(bikeId))}
            to={`/bikes/${bikeId}`}
          >
            <div className="row">
              <div className="col-12 panel-title">
                {_.upperFirst(bike.name)}
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
            <div className="col-auto mx-1 text-sm-center pointer" onClick={() => dispatch(showNewPartForm(bikeId))}>
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

      {/* wear meters */}
      <div className="row no-gutters justify-content-end">
        <div className="col-sm-10">

          {orderedParts.map(partId => {
            return <MiniPartSummary key={partId} partId={partId} />
          })}

        </div>
      </div>

    </div>
  );
};

export default BikePanel;