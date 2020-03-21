import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import { getAuthStatus } from '../reducers/actions.js';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('login', isAuthenticated)
    dispatch(getAuthStatus());
    
  }, []);

  return (
    <div>Login or Signup
      

        <Redirect to="/stravaAuth" />


    </div>
  )
};

export default withAuthenticator(Login, {includeGreetings: true})