import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../reducers/actions.js';

// auth imports
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import config from "../aws-exports.js";
Amplify.configure(config);

const Bikes = () => {
  const hasStravaAccess = useSelector(state => state.hasStravaAccess)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  

  if (!hasStravaAccess) {
    return <Redirect to='stravaAuth' />
  }

  return (
    <div>
      Bikes
    </div>
  )
};

export default withAuthenticator(Bikes, {includeGreetings: true} );