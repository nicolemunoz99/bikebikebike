import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, withRouter, useRouteMatch } from 'react-router';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import PageWrapper from '../wrappers/PageWrapper.jsx';
import PartPanel from './PartPanel.jsx'
import _ from 'lodash';
import { getUserData } from '../../state/actions/user.js';
import { setSelectedBike, resetSelectedBike } from '../../state/actions/bikes.js';
import { resetSelectedPart } from '../../state/actions/parts.js';
import { showNewPartForm } from '../../state/actions/partForm.js';


const PartList = ({ paramsProps }) => {
  const bikeId = useParams().bikeId;
  const bike = useSelector(state => state.bikes.list[bikeId]);
  const { id } = useSelector(state => state.user);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedBike(bikeId));
    if (!id) dispatch(getUserData());
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
          {bike.parts.map((partId) => <PartPanel key={partId} partId={partId} />)}
        </div>

      </PageWrapper>
    }</>
  );
};

export default withRouter(PartList);