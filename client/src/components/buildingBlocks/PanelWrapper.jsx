import React from 'react';
import {useSelector } from 'react-redux';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import CustomNavLink from './CustomNavLink.jsx';

const PanelWrapper = ({ children, title='', menu=[], subTitle='' }) => {
  
  return (
    <div className="shadow p-3 mb-5 bg-white rounded panel">
      <div className="row no-gutters align-items-top">

{/* gear summary */}
        <div className="col-6">

          <div className="row">
            <div className="col-12 panel-title">
              { title }
            </div>
            <div className="col-12 text-detail">{subTitle}</div>
          </div>
          

        </div>

{/* menu */}
        <div className="col-6">

          <div className="row no-gutters justify-content-end text-right">
            {menu.map(el => {
              console.log('el.modal', el.modal)
              return (
                <div key={el.icon} className="mx-1 text-sm-center">
                  <OverlayTrigger
                    placement='top'
                    overlay={<Tooltip id={el.icon}> {el.tooltip} </Tooltip>}
                  >
                    <Button className="bbb-button" size="sm">
                      <CustomNavLink to={el.link} className="" modal={el.modal}>
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