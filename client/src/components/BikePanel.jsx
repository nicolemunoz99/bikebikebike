import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Part from './Part.jsx';


const BikePanel = (props) => {
  const distUnit = useSelector(state => state.user.measure_pref);
  const bike = useSelector(state => state.bikes.list[props.id]);
  
  const detailTextClass = 'text-detail'

  return (
    <div className="row no-gutters justify-content-center mb-3 bike-panel">
      <div className="col-12">
        <div className="panel-title">
          {bike.name}
        </div>
      </div>
      <div className="col-12 col-sm-5">

        <div className={detailTextClass}>
          {`${bike.b_dist_current} ${distUnit}`}
        </div>
        <div className={detailTextClass}>
          {`${bike.b_time_current} hrs`}
        </div>
      </div>


      <div className="col-12 col-sm-7">
      { 
        bike.parts.map(id => {
          console.log('id', id)
          return (<Part key={id} id={id} />)
        })

      }
      </div>

    </div>
  )
};



export default BikePanel;