import React from 'react';
import { useSelector } from 'react-redux';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import Part from './Part.jsx';


const BikePanel = (props) => {
  const distUnit = useSelector(state => state.user.measure_pref);
  const bike = useSelector(state => state.bikes.list[props.id]);

  const menu = [
    { tooltip: 'edit', icon: 'edit' },
    { tooltip: 'details', icon: 'description' },
    { tooltip: 'add component', icon: 'add' }
  ];


  return (
    <div className="shadow p-3 mb-5 bg-white rounded panel">
      <div className="row no-gutters align-items-top mb-3">

        <div className="col-6">

          <div className="row">
            <div className="col-12 panel-title">
              {bike.name}
            </div>
          </div>

          <div className="row">

            <div className="col-12 ml-3">
              <div className="text-detail">
                {`${bike.b_dist_current} ${distUnit}`}
              </div>
              <div className="text-detail">
                {`${bike.b_time_current} hrs`}
              </div>
            </div>

          </div>

        </div>

        <div className="col-6">

          <div className="row no-gutters justify-content-end text-right">
            {menu.map(el => {
              return (
                <div key={el.icon} className="mx-1 text-sm-center">
                  <OverlayTrigger
                    placement='top'
                    overlay={ <Tooltip id='edit'> {el.tooltip} </Tooltip> }
                  >
                    <Button className="bbb-button" size="sm">
                      <span className="material-icons panel-menu-text">{el.icon}</span>
                    </Button>
                  </OverlayTrigger>
                </div>

              )
            })
            }
          </div>

        </div>

      </div>

      <div className="row no-gutters justify-content-end">


        <div className="col-sm-6">

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