import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ModalWrapper from '../wrappers/ModalWrapper.jsx';
import { clearErrs } from '../../state/actions/appControls.js';


export const DataWait = () => {

  return (
    <ModalWrapper cancelClose={true} modal="dataWait" title="Please wait">
      <div className="row align-items-center">
        <div className="col-12 text-center">
          Please wait ...
        </div>
      </div>
    </ModalWrapper>
  );
};

export const Err = () => {
  const dispatch = useDispatch();
  const { err } = useSelector(state => state.appControls);


  return (
    <ModalWrapper title="Ooops" modal="err" closeAction={() => dispatch(clearErrs())}>
      <div className="row no-gutters align-items-center">
        <div className="col-12 text-center">
          Error:
        </div>
        <div className="col-10 mx-auto mt-3 text-center">

          {err}

        </div>
      </div>
    </ModalWrapper>
  );
};

export const Success = () => {
  return (
    <ModalWrapper title="Success" modal="success">
      Yay.
    </ModalWrapper>
  )
}

export const LimitedAccess = () => {

  return (
    <ModalWrapper title="Limited Access" modal="limitedAccess">
      <div className="row align-items-center">
        <div className="col-12 text-center">
          You are using a demo account that has been granted limited access. If you would like to
          demo API endpoints, sign in using credentials (u/n) demo_api, (p/w) demo123, OR
         create {process.env.APP_NAME} and <a href="http://strava.com" target="NONE">Strava</a> accounts.
        </div>
      </div>
    </ModalWrapper>
  );
};


