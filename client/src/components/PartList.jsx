import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams} from 'react-router';
import { getUserData } from '../state/actions.js';
import PageWrapper from './buildingBlocks/PageWrapper.jsx';
import PartPanel from './PartPanel.jsx';

const PartList = (props) => {
  const bike = useSelector(state => state.bikes.list[useParams().bikeId])
  const distUnit = useSelector(state => state.user.measure_pref);
  const dispatch = useDispatch();

  console.log()

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  return (
    <div>
      {
        bike ?

          <PageWrapper title={bike.name}>

            <div className="row no-gutters text-detail">
              <div className="row">
                <div className="col-sm-auto">{bike.b_brand}</div>
                <div className="col-sm-auto">{bike.b_model}</div>
                <div className="col-sm-auto">{bike.frame_type}</div>
              </div>
              <div className="col-12">
                Tracking since {bike.b_date_added}
              </div>
              <div className="col-12">
                {bike.b_dist_current} {distUnit}, {bike.b_time_current} hrs
              </div>
            </div>

            <div className="w-100"></div>
            <div className="mt-4">
              {
                bike.parts.map(partId => {
                  return <PartPanel key={partId} id={partId}/>
                })
              }
            </div>

          </PageWrapper>

          :
          null
      }
    </div>
  );
};

export default PartList;
