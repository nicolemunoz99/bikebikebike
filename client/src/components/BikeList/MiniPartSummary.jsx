import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';
import usePartTypeRender from '../../hooks/usePartTypeRender.js';
import useMetricOptions from '../../hooks/useMetricOptions.js';
import WearMeter from '../bits/WearMeter.jsx';


const MiniPartSummary = ({ partId }) => {
  const part = useSelector(state => state.parts.list)[partId];
  const partTypeRender = usePartTypeRender(part);
  
  let metrics = _.orderBy(useMetricOptions(partId), [(metric) => metric.wear], ['desc']);
  let maxWear = metrics[0] ? metrics[0].wear : 0;
  
  return (
    <Row noGutters className="align-items-center my-3 my-sm-1">
      <Col sm={6} className="text-sm-right text-detail pr-1">
        {partTypeRender}:
      </Col>

      <Col sm={6}>
        <WearMeter wear={maxWear} height="0.5rem" />
      </Col>
    </Row>
  )
};

export default MiniPartSummary;