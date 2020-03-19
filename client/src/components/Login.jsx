import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Authenticator } from 'aws-amplify-react';
import { getAuthStatus } from '../reducers/actions.js';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthStatus())
  });

  

  return (
    <div>Login or create a 'Bike App' account
      {isAuthenticated ?
        <Redirect to="/bikes" />
        :
        <Authenticator />
      }
      
    </div>
  )
};

export default Login;