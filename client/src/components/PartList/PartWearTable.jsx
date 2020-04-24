import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import useMetricOptions from '../../hooks/useMetricOptions.js';
import { capFirst } from '../../utils.js';
import WearMeter from '../WearMeter.jsx';

const PartWearTable = ({ partId }) => {
  partId = partId || useSelector(state => state.parts.selectedPart);
  let metrics = useMetricOptions(partId);


  let tableHeaders = ['metric', 'lifespan', 'current', 'wear'];

  return (
    <Table striped bordered hover size="sm" className="text-detail">

      <thead>
        <tr>
          { tableHeaders.map(header => <th key={header}>{capFirst(header)}</th>) }
        </tr>
      </thead>

      <tbody>

        {metrics.map(metric => {
          metric.wear = <WearMeter wear={metric.wear} />
          
          return (
            <tr key={metric.value}>
              
              {tableHeaders.map((header, i) => {
                
                return (
                  <td key={i}>{metric[header]}</td>
                )

              })}

            </tr>
          )

        })}

      </tbody>

    </Table>
  )
};

export default PartWearTable;