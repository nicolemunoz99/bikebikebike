import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { setAuthState2 } from '../state/actions/user.js';


// Amplify auth components
import { Authenticator, SignIn, SignUp, ConfirmSignUp, ForgotPassword } from 'aws-amplify-react';
import { Hub } from 'aws-amplify';

const Login = ({ history }) => {
  const { redirectRoute, authState } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setRedirect('/bikes'));
      dispatch(setLoginErr(''));
    };
  },[]);

  useEffect(() => {
    // redirect after successful login to origin route, or to /bikes if /login accessed directly
    if (authState === 'signedIn') history.replace(redirectRoute ? redirectRoute : '/bikes');
  }, [authState]);

  // Amplify utility
  Hub.listen('auth', res => {
    // listen for login errors
    if (/failure/.test(res.payload.event)) dispatch(setLoginErr(res.payload.event));
  });
  
  const handleAuthStateChange = (state) => dispatch(setAuthState2(state));


  return (
    <Authenticator
      hideDefault={true}
      onStateChange={handleAuthStateChange}
      authState={authState}
      usernameAttributes="Email"
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


// ...Amplify UI config..
const signUpConfig = {
  header: 'Create Account',
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Email',
      key: 'username',
      required: true,
      displayOrder: 1,
      type: 'string'
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 2,
      type: 'password'
    }
  ]
};

export default Login;