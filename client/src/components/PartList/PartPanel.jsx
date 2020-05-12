import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import WearMeter from '../WearMeter.jsx';
import PartDetails from './PartDetails.jsx';
import _ from 'lodash';
import { setSelectedPart } from '../../state/actions/parts.js';
import usePartTypeRender from '../../hooks/usePartTypeRender.js';


const PartPanel = ({ partId }) => {
  const part = useSelector(state => state.parts.list[partId]);
  const distUnit = useSelector(state => state.user.measure_pref);
  const { selectedPart } = useSelector(state => state.parts);
  const dispatch = useDispatch();
  const partTypeRender = usePartTypeRender(part);

  return (
  <>
    {part &&
      <Row noGutters className="justify-content-center">
        <Col xs={12} className="part-panel px-3 pt-3 pb-1">

          <Row noGutters>
            <Col xs={'auto'} className="panel-title">
              { partTypeRender }
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

          
          {selectedPart === partId && <PartDetails /> }

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
    }
  </>
  )
};

export default PartPanel;