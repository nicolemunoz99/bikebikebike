import React from 'react';
import {useSelector } from 'react-redux';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import CustomNavLink from './CustomNavLink.jsx';

const PanelWrapper = ({ children, title='', distCurr='', timeCurr='', menu=[] }) => {
  const distUnit = useSelector(state => state.user.measure_pref);
  
  return (
    <div className="shadow p-3 mb-5 bg-white rounded panel">
      <div className="row no-gutters align-items-top mb-3">

{/* gear summary */}
        <div className="col-6">

          <div className="row">
            <div className="col-12 panel-title">
              { title }
            </div>
          </div>

          <div className="row">

            <div className="col-12 ml-3">
              <div className="text-detail">
                {`${distCurr} ${distUnit}`}
              </div>
              <div className="text-detail">
                {`${timeCurr} hrs`}
              </div>
            </div>

          </div>

        </div>

{/* menu */}
        <div className="col-6">

          <div className="row no-gutters justify-content-end text-right">
            {menu.map(el => {
              return (
                <div key={el.icon} className="mx-1 text-sm-center">
                  <OverlayTrigger
                    placement='top'
                    overlay={<Tooltip id='edit'> {el.tooltip} </Tooltip>}
                  >
                    <Button className="bbb-button" size="sm">
                      <CustomNavLink to={el.link} className="">
                      <span className="material-icons panel-menu-text">{el.icon}</span>
                      </CustomNavLink>
                    </Button>
                  </OverlayTrigger>
                </div>

              )
            })
            }
          </div>

        </div>
      </div>

      { children }

    </div>

  )




};

export default PanelWrapper;