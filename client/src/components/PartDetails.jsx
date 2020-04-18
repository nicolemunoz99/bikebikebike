import React from 'react';
import xDate from 'xdate';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { capFirst } from '../utils.js';

const PartDetails = () => {
  const { selectedPart } = useSelector(state => state.parts);
  const { 
    lifespan_dist, 
    lifespan_time,
    lifespan_date, 
    p_dist_current, 
    p_time_current, 
    use_metric_date,
    use_metric_time,
    use_metric_dist,
    tracking_method,
    new_date,
    p_date_added 
  } = useSelector(state => state.parts.list[selectedPart]);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  let detailItems = {
    'Replace/service in:': [
      use_metric_dist ? `${(Number(lifespan_dist) - Number(p_dist_current)).toFixed(1)} ${distUnit}` : '',
      use_metric_time ? `${(Number(lifespan_time) - Number(p_time_current)).toFixed(1)} hrs` : '',
      use_metric_date ? `${Math.round(xDate(false).diffDays(xDate(lifespan_date)))} days` : ''
    ], 
    'Lifespan:': [
      use_metric_dist ? `${(Number(lifespan_dist)).toFixed(1)} ${distUnit}` : '',
      use_metric_time ? `${(Number(lifespan_time) - Number(p_time_current)).toFixed(1)} hrs` : '',
      use_metric_date ? `${lifespan_date}` : ''
    ], 
    'Settings:': [
      `${capFirst(tracking_method)} tracking via:`,
      `${use_metric_dist ? 'Distance': ''}`,
      `${use_metric_time ? 'Ride time': ''}`,
      `${use_metric_date ? 'Date': ''}`
    ],
    'New:': [
      new_date
    ],
    'Tracking Since:': [
      p_date_added
    ]
  }



  return(
  <>
    {
      _.map(detailItems, (textArr, key) => {
        return (
          <div key={key} className="row no-gutters my-1 part-detail text-detail py-3">
            <div className="col-sm-4">
              {key}
            </div>

            <div className="col-sm-8 offset-1 offset-sm-0">
              <div className="row no-gutters">
                {textArr.map((textLine, i) => {
                  return (
                    <div key={i} className="col-12">{textLine}</div>
                  )
                })

                }
              </div>

            </div>
          </div>
        )
      })
    }

  </>
  )
};

export default PartDetails;