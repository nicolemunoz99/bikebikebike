import React, { useEffect } from 'react';
import axios from 'axios';
import { action } from '../reducers/actions.js';
import { useDispatch, useSelector } from 'react-redux';

// auth imports
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import config from "../aws-exports.js";
Amplify.configure(config);

const Bikes = () => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    // getUserData();
  }, []);

  const getUserData = async () => {
    try {
      let user = await Auth.currentAuthenticatedUser();
      console.log('user: ', user);
      // specify accessToken in headers of get request
      let res = await axios.get(`${process.env.THIS_API}/api/login?username=${user.username}`, {
        headers: { accesstoken: user.signInUserSession.accessToken.jwtToken }}
      );
      console.log('test: ', res.status)
      if (res.status === 201) {} // redirect to stravaAuth
    }
    catch (err) {
      if (err.response.status === 401) {} // redirect to login
      // otherwise display error modal
    }
    
  };
  

  return (
    <div>
      Bikes
    </div>
  )
};

export default withAuthenticator(Bikes, {includeGreetings: true} );