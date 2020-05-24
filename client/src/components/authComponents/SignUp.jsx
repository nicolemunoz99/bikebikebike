import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { InputGroup, Button, FormControl, Col, Row } from 'react-bootstrap';
import {AuthWrapper, AuthInput} from '../bits/RandomBits.jsx';
import { Auth } from 'aws-amplify';
import { logErr, openModal } from '../../state/actions/appControls.js';

const SignUp = (props) => {
  const [data, setData] = useState({
    email: '',
    username: '', 
    pw: '', 
    confirmPw: ''
  });
  const [showPwErr, updatePwErr] = useState(false);
  const { authState, onStateChange } = props;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      await Auth.signUp(data.username, data.pw);
      onStateChange('signIn');
      dispatch(openModal('success'));
    } 
    catch (error) {
      dispatch(logErr(error.message || error));
    }
  };


  return (
  <>
    {authState === 'signUp' &&
      
      <AuthWrapper title="Sign Up">


          <InputGroup as={Row} className="my-3 no-gutters justify-content-center">
            <AuthInput 
              placeholder="Email"
              onChange={handleChange}
              value={data.email}
              type='email'
              id="email"
            />

            <AuthInput 
              placeholder="Username"
              onChange={handleChange}
              value={data.username}
              type='text'
              id="username"
            />

            <AuthInput
              placeholder="Password"
              onChange={handleChange}
              value={data.pw}
              type='password'
              id="pw"
              err={data.pw.length && data.pw.length < 6 ? 'Password must be 6 chars. Nothing fancy' : ''}
            />

            <AuthInput
              placeholder="Confirm password"
              onChange={handleChange}
              value={data.confirmPw}
              type='password'
              id="confirmPw"
              err={data.confirmPw && data.pw !== data.confirmPw ? `Passwords don't match` : ''}
            />


          </InputGroup>

          <Button bsPrefix='bbb-button' onClick={handleSignUp} variant='outline-secondary' className="my-2">Create account</Button>
        

        <div className="small mt-3">
          Already have an account? <u className="pointer" onClick={()=>onChange('signIn')}>Sign in.</u>
        </div>
        
        { showPwErr && <div className="err-msg">Errors.</div>}

      </AuthWrapper>
    }
  </>
  );
};

export default SignUp;