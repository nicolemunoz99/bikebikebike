import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, Button, FormControl, Col, Row } from 'react-bootstrap';
import ModalWrapper from '../wrappers/ModalWrapper.jsx';
import { Auth } from 'aws-amplify';
import { logErr } from '../../state/actions/appControls.js';

const ActionRequired = () => {
  const [data, setData] = useState({username: '', code: ''});
  const [showResendStatus, updateResendStatus] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  const handleSubmit = async () => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
    } 
    catch (error) {
      dispatch(logErr(error.message || error));
    }
  };

  const handleResendCode = async () => {
    try {
      await Auth.resendSignUp(data.username);
      updateResendStatus(true);
    }
    catch (error) {
      dispatch(logErr(error.message || error));
    }
    
  }

  return (
    <ModalWrapper title="Action Required" modal="actionRequired">


      <div className="my-2">
        Check email for your confirmation code.
      </div>

      <div>
        <InputGroup className="my-3" as={Row} xs={1} className="no-gutters justify-content-center">
          
          <Col xs={7} md={5} lg={4} className="my-1 mx-1">
            <FormControl
              placeholder="Username"
              aria-label="Username"
              aria-describedby="Username"
              onChange={handleChange}
              value={data.username}
              id="username"
            />
          </Col>

          <Col xs={7} md={5} lg={4} className="my-1 mx-1">
            <FormControl
              placeholder="Confirmation code"
              aria-label="Confirmation code"
              aria-describedby="Confirmation code"
              onChange={handleChange}
              value={data.code}
              id="code"
            />
          </Col>

        </InputGroup>

        <Button bsPrefix='bbb-button' onClick={handleSubmit} variant='outline-secondary' className="my-2">Submit</Button>
      </div>

      <div>
        <span className="small pointer" onClick={handleResendCode}>Resend confirmation code.</span>
      </div>
      
      { showResendStatus && <div className="err-msg">Code has been resent to your email.</div>}

    </ModalWrapper>
  )
};

export default ActionRequired;