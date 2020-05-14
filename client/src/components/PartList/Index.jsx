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
import { sortByWear } from '../../helpers/sortParts.js';

const PartList = () => {
  const [orderedParts, setOrderedParts] = useState([])
  const allParts = useSelector(state => state.parts.list);
  const bikeId = useParams().bikeId
  const bike = useSelector(state => state.bikes.list)[bikeId];
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();
  console.log('orderedParts', orderedParts);
  useEffect(() => {
    if (bike && allParts) {
      let ordered = sortByWear(_.pick(allParts, bike.parts));
      setOrderedParts(ordered);
    }
  }, [bike, allParts]);

  useEffect(() => {
  dispatch(setSelectedBike(bikeId));
    return () => {
      dispatch(resetSelectedBike());
      dispatch(resetSelectedPart());
    };
  }, []);


  return (
    <>{bike &&
      <PageWrapper title={_.upperFirst(bike.name)}>
        <Row noGutters>
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

      </PageWrapper>
    }</>
  );
};

export default withRouter(PartList);