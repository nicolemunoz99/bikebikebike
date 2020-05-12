import React from 'react';
import { useSelector } from 'react-redux';
import usePartTypeRender from '../../hooks/usePartTypeRender.js';
import WearMeter from '../WearMeter.jsx';
import { Row, Col } from 'react-bootstrap';

const MiniPartSummary = ({ partId }) => {
  const part = useSelector(state => state.parts.list)[partId];
  const partTypeRender = usePartTypeRender(part);

  return (
    <Row noGutters className="align-items-center my-3 my-sm-1">
      <Col sm={6} className="text-sm-right text-detail pr-1">
        {partTypeRender}:
      </Col>

      <Col sm={6}>
        <WearMeter partId={partId} height="0.5rem" />
      </Col>
    </Row>
  )
};

export default MiniPartSummary;