import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { setAuthState2 } from '../state/actions/user.js';
import { logErr, openModal } from '../state/actions/appControls.js';

// Amplify auth components
import { Authenticator, SignIn, SignUp, ConfirmSignUp, ForgotPassword } from 'aws-amplify-react';
import { Hub } from 'aws-amplify';

const Login = ({ history }) => {
  const { authState } = useSelector(state => state.user);
  const { redirectRoute } = useSelector(state => state.appControls);
  const dispatch = useDispatch();


  useEffect(() => {

    if (authState) {

      // redirect after successful login to this route if specified, otherwise to /bikes if /login accessed directly
      if (authState === 'signedIn') {history.replace(redirectRoute ? redirectRoute : '/bikes');}
      
      else {
        if (authState === 'confirmSignUp') dispatch(openModal('actionRequired'));

        Hub.listen('auth', res => { // Amplify utility
          // listen for login errors         
          if (/failure/.test(res.payload.event)) {

            if (res.payload.data.name === 'UserNotConfirmedException') {
              dispatch(openModal('actionRequired'));
              return;
            }

            dispatch(logErr( `${res.payload.data.message} Be sure your password is at least 6 characters long.` ));
          }
        });
      }
    }

  }, [authState]);

  
  const handleAuthStateChange = (state) => dispatch(setAuthState2(state));


  return (
    <Authenticator
      hideDefault={true}
      onStateChange={handleAuthStateChange}
      authState={authState}
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