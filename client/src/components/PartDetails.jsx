import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { capFirst } from '../utils.js';

const PartDetails = () => {
  const { selectedPart } = useSelector(state => state.parts);
  const { 
    lifespan_dist, 
    lifespan_time, 
    p_dist_current, 
    p_time_current, 
    usage_metric, 
    tracking_method,
    p_date_added 
  } = useSelector(state => state.parts.list[selectedPart]);
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  let detailItems = {
    'Replace/service in:': [
      lifespan_dist && p_dist_current ? `${Number(lifespan_dist) - Number(p_dist_current)} ${distUnit}` : '',
      lifespan_time && p_time_current ? `${Number(lifespan_time) - Number(p_time_current)} hrs` : ''
    ], 
    'Lifespan:': [
      lifespan_dist ? `${Number(lifespan_dist)} ${distUnit}` : '',
      lifespan_time && p_time_current ? `${Number(lifespan_time) - Number(p_time_current)} hrs` : ''
    ], 
    'Settings:': [
      `${capFirst(tracking_method)} tracking`,
      usage_metric ? `based on ${(
        usage_metric === 'both' ? 'distance & time (whichever expires first)' : (
          usage_metric === 'dist' ? 'distance' : 'time'
        )
      )}` : ''
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
            <div className="col-6">
              {key}
            </div>

            <div className="col-6">
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