import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import Part from './Part.jsx';


const BikePanel = (props) => {
  const distUnit = useSelector(state => state.user.measure_pref);
  const bike = useSelector(state => state.bikes.list[props.id]);

  const detailTextClass = 'text-detail';

  return (
    <div className="outline-1 px-3 py-2 mb-3">
      <div className="row no-gutters align-items-top mb-3">
        <div className="col-6">
          <div className="panel-title">
            {bike.name}
          </div>
        </div>

        <div className="col-6">

    <div className="row no-gutters justify-content-end">
          <div className="col-sm-auto m-1">
            <OverlayTrigger
              placement='top'
              overlay={
                <Tooltip id='edit'>
                  add part
                </Tooltip>
              }
            >
              <Button variant="secondary" size="sm">
                <span className="material-icons align-top">add</span>
              </Button>
            </OverlayTrigger>
          </div>

          <div className="col-sm-auto m-1">
          <OverlayTrigger
            placement='top'
            overlay={
              <Tooltip id='edit'>
                edit bike
              </Tooltip>
            }
          >
            <Button variant="secondary" size="sm">
              <span className="material-icons align-top">edit</span>
            </Button>
          </OverlayTrigger>
          </div>

          <div className="col-sm-auto m-1">
          <OverlayTrigger
            placement='top'
            overlay={
              <Tooltip id='edit'>
                details
              </Tooltip>
            }
          >
            <Button variant="secondary" size="sm">
              <span className="material-icons align-top">description</span>
            </Button>
          </OverlayTrigger>
          </div>
            </div>

        </div>
      </div>

      <div className="row no-gutters align-items-end">
        <div className="col-6 col-sm-5">
          <div className="ml-3">
            <div className={detailTextClass}>
              {`${bike.b_dist_current} ${distUnit}`}
            </div>
            <div className={detailTextClass}>
              {`${bike.b_time_current} hrs`}
            </div>
          </div>
        </div>


        <div className="col-6 col-sm-7">

          {
            bike.parts.map(id => {
              return (<Part key={id} id={id} />)
            })

          }

        </div>
      </div>
    </div>
  )
};



export default BikePanel;