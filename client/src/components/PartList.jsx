import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams} from 'react-router';
import { getUserData } from '../state/actions.js';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import PageWrapper from './wrappers/PageWrapper.jsx';
import WearMeter from './WearMeter.jsx';
import PartDetails from './PartDetails.jsx';
import { showPartForm, toggleSelectedPart }from '../state/actions.js';

const PartList = () => {
  const bikeId = useParams().bikeId;
  const bike = useSelector(state => state.bikes.list[bikeId]);
  const { id } = useSelector(state => state.user);
  const { list: allParts, selectedPart } = useSelector(state => state.parts);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  

  useEffect(() => {
    if (id) return;
    dispatch(getUserData()); // page refresh

    // return () => {
    //   dispatch(setSelectedPart(''))
    // }
  }, [id]);

  return (
    <div>
      {
        bike ?

          <PageWrapper title={bike.name}>

            <div className="row no-gutters text-detail">
              <div className="col-12">
              <div className="row no-gutters">
                <div className="col-sm-auto">{bike.b_brand}</div>
                <div className="col-sm-auto">{bike.b_model}</div>
                <div className="col-sm-auto">{bike.frame_type}</div>
              </div>
              
              <div className="row no-gutters">
                <div className="col-auto">
                  <div className="row no-gutters">
                    <div className="col-12">
                      Tracking since {bike.b_date_added}
                    </div>
                    <div className="col-12">
                      {bike.b_dist_current} {distUnit}, {bike.b_time_current} hrs
                    </div>
                  </div>
                </div>
                <div 
                  className="col-auto m-auto pointer"
                  onClick={()=>dispatch(showPartForm(bikeId))}
                >
                  <OverlayTrigger
                  placement='left'
                  overlay={<Tooltip> add part </Tooltip>}
                  >
                    <span className="material-icons panel-menu-text"> add </span>
                  </OverlayTrigger>
                </div>
              </div>
              </div>
            </div>

            <div className="w-100"></div>
            <div className="mt-4">
              {
                bike.parts.map(id => {
                  let part = allParts[id];
                  return ( part &&


// PART PANEL
<div key={id} className="row no-gutters text-detail justify-content-center">
  <div className="col-12 part-panel px-3 pt-3 pb-1">
    <div className="row no-gutters">
      
      <div className="col-6 panel-title">
        {part.type}
      </div>

      {/* edit button */}
      <div className="col-6">

        <div className="row no-gutters justify-content-end text-right">
          <div 
            className="col-auto mx-1 text-sm-center pointer" 
            onClick={()=>dispatch(showPartForm(bikeId, id))}
          >
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip> edit </Tooltip>}
            >
              <span className="material-icons panel-menu-text"> edit </span>
            </OverlayTrigger>
          </div>

        </div>
      </div>
    </div>

    <div className="row no-gutters">
      <div className="col-sm-6 text-detail">
        <div>
          {part.p_brand} {part.p_model}
        </div>
        <div>
          {`${part.p_dist_current} ${distUnit}`}
        </div>

        <div>
          {`${part.p_time_current} hrs`}
        </div>
      </div>
      <div className="col-sm-6 align-self-end">
        <div className="row no-gutters">
          <div className="col text-right">
            <WearMeter partId={id} />
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-3">

      {selectedPart === id && <PartDetails />}
      <div className="col text-center">
        <OverlayTrigger
          placement='top'
          overlay={<Tooltip> details </Tooltip>}
          >
            <span className="material-icons md-48 pointer" onClick={() => dispatch(toggleSelectedPart(id))}>
              arrow_drop_down
            </span>
        </OverlayTrigger>
      </div>

    </div>
  </div>
</div>

                  )
                })
              }
            </div>

          </PageWrapper>

          :
          null
      }
    </div>
  );
};

export default PartList;
