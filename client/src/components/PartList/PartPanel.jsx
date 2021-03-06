import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import WearMeter from '../bits/WearMeter.jsx';
import PartDetails from './PartDetails.jsx';
import _ from 'lodash';
import { setSelectedPart } from '../../state/actions/parts.js';
import usePartTypeRender from '../../hooks/usePartTypeRender.js';
import { sortMetrics } from '../../helpers/sortParts.js';


const PartPanel = ({ partId }) => {
  const part = useSelector(state => state.parts.list[partId]);
  const distUnit = useSelector(state => state.user.measure_pref);
  const { selectedPart } = useSelector(state => state.parts);
  const dispatch = useDispatch();
  const partTypeRender = usePartTypeRender(part);

  const maxWear = sortMetrics(part)[0].wear;

  return (
  <>
    {part &&
      <Row noGutters className="justify-content-center">
        <Col xs={12} className={`part-panel ${partId===selectedPart ? 'active' : ''} px-3`}>

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

            {selectedPart !== partId &&
              <Col sm={6} className="align-self-end text-right">
              <WearMeter wear={maxWear} />
            </Col>
            }

          </Row>

          
          { selectedPart === partId && <PartDetails /> }

          <Row className="mt-3">
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