import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmSignUp from './authComponents/ConfirmSignUp.jsx';
// import SignUp from './authComponents/SignUp.jsx';
import { Row, Col } from 'react-bootstrap';
import { setAuthState2 } from '../state/actions/user.js';
import { logErr } from '../state/actions/appControls.js';

// Amplify auth components
import { Authenticator, ForgotPassword, SignIn, SignUp } from 'aws-amplify-react';
import { Hub } from 'aws-amplify';

const Login = ({ history }) => {
  const authState2 = useSelector(state => state.user.authState);
  const { redirectRoute } = useSelector(state => state.appControls);
  const dispatch = useDispatch();

  useEffect(() => {
      console.log('authState2', authState2)
      // redirect after successful login to this route if specified, otherwise to /bikes if /login accessed directly
      if (authState2 === 'signedIn') {history.replace(redirectRoute ? redirectRoute : '/bikes');}
  }, [authState2]);

  Hub.listen('auth', res => { // Amplify utility
    // listen for login errors         
    if (/failure/.test(res.payload.event)) {
      if (res.payload.data.name === 'UserNotConfirmedException') {}
      else if (res.payload.data.name === 'InvalidParameterException') {
        dispatch(logErr('Password should be 6 characters.'));
      }
      else dispatch(logErr( `${res.payload.data.message}` ));
    }
  });

  
  const handleAuthStateChange = (state) => dispatch(setAuthState2(state));



  return (
    
      <Authenticator
        hideDefault={true}
        onStateChange={handleAuthStateChange}
        authState='signIn'
        usernameAttributes="Username"
      >

          <SignIn />

          <SignUp
            signUpConfig={signUpConfig}
          />

          <ConfirmSignUp />

          <ForgotPassword />

      </Authenticator>
   
  )
};


// ...Amplify UI config ...
const signUpConfig = {
  header: 'Create Account',
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Username',
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password (6 chars for demo purposes. Nothing fancy.)',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    }
  ]
};

export default Login;