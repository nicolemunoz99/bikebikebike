import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Form, Row, Col, Popover } from 'react-bootstrap';
import xDate from 'xdate';
import _ from 'lodash';
import { capFirst } from '../utils.js';

const PartDetails = () => {
  const distUnit = useSelector(state => state.user.measure_pref);
  const id = useSelector(state => state.parts.selectedPart);
  const part = useSelector(state => state.parts.list[id]);

  let serviceDate = part.service_date || part.new_date;
  let lifespanInDays = xDate(serviceDate).diffDays(xDate(part.lifespan_date))
  console.log(serviceDate, lifespanInDays)

  let data = [
    {
      Metric: `Distance (${distUnit})`,
      Lifespan: part.lifespan_dist,
      Current: part.p_dist_current,
      Remaining: part.lifespan_dist - part.p_dist_current,
      Wear: part.p_dist_current / part.lifespan_dist < 1 ? part.p_dist_current / part.lifespan_dist : 1
    },
    {
      Metric: 'Ride time (hrs)',
      Lifespan: part.lifespan_time,
      Current: part.p_dist_current,
      Remaining: part.lifespan_time - part.p_time_current,
      Wear: part.p_time_current / part.lifespan_time < 1 ? part.p_time_current / part.lifespan_time : 1
    },
    {
      Metric: 'Date (days)',
      Lifespan: part.lifespan_date,
      Current: xDate(serviceDate).diffDays(xDate()),
      Remaining: xDate().diffDays(xDate(part.lifespan_date)),
      Wear: xDate(serviceDate).diffDays(xDate()) / lifespanInDays < 1 ? xDate(serviceDate).diffDays(xDate()) / lifespanInDays : 1
    }
  ];

  return (
    <Table striped bordered hover size="sm">

      <thead>
        <tr>
          <th>Metric</th>
          <th>Lifespan</th>
          <th>Current</th>
          <th>Remaining</th>
          <th>Wear</th>
        </tr>
      </thead>


      <tbody>
        {data.map((metric, i) => {
          return (
            <tr key={i}>
            {Object.keys(metric).map((heading) => {
              return <td key={heading}>{Math.round(metric[heading]) ? Math.round(metric[heading]) : metric[heading]}</td>
            })}
            </tr>
          )
        })

        }

      </tbody>


    </Table>
  )
};

export default PartDetails;