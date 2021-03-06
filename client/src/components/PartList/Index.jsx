import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, withRouter } from 'react-router';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import PageWrapper from '../wrappers/PageWrapper.jsx';
import PartPanel from './PartPanel.jsx'
import _ from 'lodash';
import { setSelectedBike, resetSelectedBike } from '../../state/actions/bikes.js';
import { resetSelectedPart } from '../../state/actions/parts.js';
import { showNewPartForm } from '../../state/actions/partForm.js';
import { usePartSort } from '../../hooks/wearHooks.js';
import { NoParts } from '../noDataToRender/Index.jsx';

const PartList = () => {
  const bikeId = useParams().bikeId
  const bike = useSelector(state => state.bikes.list)[bikeId];
  const distUnit = useSelector(state => state.user.measure_pref);
  const orderedParts = usePartSort(bike);
  const dispatch = useDispatch();


  useEffect(() => {
    return () => {
      dispatch(resetSelectedBike());
      dispatch(resetSelectedPart());
    };
  }, []);

  useEffect(() => {
    dispatch(setSelectedBike(bikeId));
  }, [bikeId]);


  return (
    <>{bike &&
      <PageWrapper title={_.upperFirst(bike.name)}>
        <Row noGutters className="part-list-header">
          <Col sm={10}>
            <div>
              Tracking bike since {bike.b_date_added}
            </div>
            <div>
              {bike.b_dist_current} {distUnit}, {bike.b_time_current} hrs
          </div>
          </Col>

          <Col sm={2} className="m-auto pointer" onClick={() => dispatch(showNewPartForm(bikeId))}>
              <OverlayTrigger
                placement='left'
                overlay={<Tooltip> {`add part to ${_.upperFirst(bike.name)}`} </Tooltip>}
              >
                <span className="material-icons panel-menu-text"> add </span>
              </OverlayTrigger>
          </Col>
        </Row>

        <div className="w-100" />

        <div className='mt-4'>
          {orderedParts.map( (id) => <PartPanel key={id} partId={id} />)}
        </div>
      
        { orderedParts.length === 0 && <NoParts /> }

      </PageWrapper>
    }</>
  );
};

export default withRouter(PartList);