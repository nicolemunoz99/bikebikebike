import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import WearMeter from '../WearMeter.jsx';
import PartWearTable from './PartWearTable.jsx';
import { capFirst } from '../../utils.js';
import { setSelectedPart, showNewPartForm } from '../../state/actions.js';


const PartPanel = ({ partId }) => {
  const part = useSelector(state => state.parts.list[partId]);
  const distUnit = useSelector(state => state.user.measure_pref);
  const { selectedPart } = useSelector(state => state.parts);
  const dispatch = useDispatch();

  return (
  <>{part &&
    <Row noGutters className="justify-content-center">
      <Col xs={12} className="part-panel px-3 pt-3 pb-1">

        <Row noGutters>
          <Col xs={'auto'} className="panel-title">
            {part.custom_type || part.type}
          </Col>

          <Col xs={'auto'} className="pointer ml-auto" onClick={()=>dispatch(showNewPartForm(bikeId))}>
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip> edit </Tooltip>}
            >
              <span className="material-icons panel-menu-text d-block">
                edit
              </span>
            </OverlayTrigger>
          </Col>
        </Row>

        <Row noGutters>
          <Col sm={6} className="text-detail">
            <div>
              {part.p_brand} {part.p_model}
            </div>
            <div>
              {`${part.p_dist_current} ${distUnit}`}
            </div>
            <div>
              {`${part.p_time_current} hrs`}
            </div>
          </Col>

          <Col sm={6} className="align-self-end text-right">
            <WearMeter wear={0.2} />
          </Col>
        </Row>

        <Row noGutters className="mt-2 my-3 justify-content-around">
        {selectedPart === partId &&
        <>
          <Col xs={12}>
            <PartWearTable partId={partId} />
          </Col>

          <Col sm={4} className="part-detail text-detail text-center my-1">
            {capFirst(part.tracking_method)} tracking
          </Col>

          <Col sm={4} className="part-detail text-detail text-center my-1">
            {part.last_service_date ? `Last serviced ${part.last_service_date}` : `New on ${part.new_date}`}
          </Col>


        </>
        }
        </Row>

        <Row>
          <Col className="text-center">
            <OverlayTrigger
              placement='top'
              overlay={<Tooltip> {selectedPart === partId ? 'less detail' : 'details'} </Tooltip>}
            >
              <span className="material-icons md-48 pointer" onClick={() => dispatch(setSelectedPart(partId))}>
                {selectedPart === partId ? 'arrow_drop_up' : 'arrow_drop_down'}
              </span>
            </OverlayTrigger>
          </Col>
        </Row>


      </Col>
    </Row>
  }</>
  )
};

export default PartPanel;