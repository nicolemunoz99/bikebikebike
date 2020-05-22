import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup,Button, FormControl } from 'react-bootstrap';
import ModalWrapper from '../wrappers/ModalWrapper.jsx';
import { clearErrs } from '../../state/actions/appControls.js';

import { Auth } from 'aws-amplify';

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
        <div className="col-10 mx-auto mt-3 tet-center">

          {err}

        </div>
      </div>
    </ModalWrapper>
  );
};

export const LimitedAccess = () => {

  return (
    <ModalWrapper title="Limited Access" modal="limitedAccess">
      <div className="row align-items-center">
        <div className="col-12 text-center">
          You are using a demo account that has been granted limited access. If you would like to
          demo API endpoints, sign in using credentials (u/n) demo_api, (p/w) demo123, OR
         create BikeBikeBike and <a href="http://strava.com" target="NONE">Strava</a> accounts.
        </div>
      </div>
    </ModalWrapper>
  );
};

export const ActionRequired = () => {
  const [code, setCode] = useState('');

  const handleChange = (e) => {
    setCode(e.target.value);
  }

  const handleSubmit = async () => {
    try {
      await Auth.confirmSignUp('muno002', code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
  };

  return (
    <ModalWrapper title="Action Required" modal="actionRequired">
      <div className="row align-items-center">
        <div className="col-12 text-center">
          Check your email for your confirmation code.
        </div>
        <div className="col-12 text-center">

          <InputGroup className="mb-3">
            <FormControl
              placeholder="Confirmation code"
              aria-label="Confirmation code"
              aria-describedby="Confirmation code"
              onChange={handleChange}
              value={code}
            />
            <InputGroup.Append>
              <Button onClick={handleSubmit} variant="outline-secondary">Submit</Button>
            </InputGroup.Append>
          </InputGroup>


        </div>
      </div>
    </ModalWrapper>
  )
}
