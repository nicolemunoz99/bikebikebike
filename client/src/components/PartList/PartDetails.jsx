import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Row, Col } from 'react-bootstrap';
import { useMetricOptions } from '../../hooks/wearHooks.js';
import _ from 'lodash';
import WearMeter from '../bits/WearMeter.jsx';
import PartControls from './PartControls.jsx';



const PartDetails = () => {
  const partId = useSelector(state => state.parts.selectedPart);
  const part = useSelector(state => state.parts.list)[partId]
  let metrics = useMetricOptions(partId);


  let tableHeaders = ['metric', 'lifespan', 'current', 'wear'];
  let keys = ['optionLabel', 'lifespan', 'current', 'wear'];

  return (
    <Row noGutters className="mt-2 my-3">
      <Col xs={12}>
        <Table striped bordered hover size="sm" className="text-detail m-0">

          <thead>
            <tr>
              {tableHeaders.map(header => <th key={header}>{_.upperFirst(header)}</th>)}
            </tr>
          </thead>

          <tbody>

            {metrics.map((metric) => {
              metric.wear = <WearMeter wear={metric.wear} />

              return (
                <tr key={metric.value}>

                  {keys.map((key) => {

                    return (
                      <td key={key}>{metric[key]}</td>
                    )

                  })}

                </tr>
              )

            })}

          </tbody>

        </Table>

        <Row className='justify-content-around my-4'>
          <Col sm={4} md={5} className="part-detail text-detail text-center my-1">
            {_.upperFirst(part.tracking_method)} tracking
          </Col>

          <Col sm={4} md={5} className="part-detail text-detail text-center my-1">
            {part.last_date_serviced ? `Last serviced ${part.last_date_serviced}` : `New on ${part.new_date}`}
          </Col>
        </Row>

        <PartControls />

      </Col>
    </Row>
  )
};

export default PartDetails;