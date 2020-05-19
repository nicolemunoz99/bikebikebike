import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../wrappers/ModalWrapper.jsx';
// import { clearErrs } from '../../../state/actions/appControls.js';

export const DataWait = () => {

  return (
    <ModalWrapper cancelClose={true} modal="dataWait" title="Please wait">
      <div className="row align-items-center">
        <div className="col text-center">
          Please wait ...
        </div>
      </div>
    </ModalWrapper>
  );
};

export const Err = () => {
  const dispatch = useDispatch();
  // const { errs } = useSelector(state => state.appControl)
  return (
    <ModalWrapper title="Ooops" modal="err">
      <div className="row align-items-center">
        <div className="col-12 text-center">
          There was an problem.
        </div>
        <div className="col-10">
          {/* <ul>
            {
              errs.map(err => <li>{err}</li>)
            }
          </ul> */}

        </div>
      </div>
    </ModalWrapper>
  );
};

export const LimitedAccess = () => {

  return (
    <ModalWrapper title="Limited Access" modal="limitedAccess">
      <div className="row align-items-center">
        <div className="col text-center">
          You are using a demo account that has been granted limited access. If you would like to
          demo API endpoints, sign in using credentials (u/n) demo_api, (p/w) demo123, OR
         create BikeBikeBike and <a href="http://strava.com" target="NONE">Strava</a> accounts.  
        </div>
      </div>
    </ModalWrapper>
  )
}
