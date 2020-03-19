import React, { useEffect } from 'react';
import axios from 'axios';
import { action } from '../reducers/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import strava from '../../../strava.js';
import urls from '../../../urls.js';

// auth imports
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import config from "../aws-exports.js";
Amplify.configure(config);

const Bikes = () => {
  
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      let user = await Auth.currentAuthenticatedUser();
      console.log('user: ', user);
      // specify accessToken in headers of get request
      let res = await axios.get(`http://localhost:8080/api/login?username=${user.username}`, {
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
      <a href={`https://www.strava.com/oauth/authorize` +
                `?client_id=${strava.clientId}` +
                `&response_type=code` +
                `&redirect_uri=${urls.api}/user/stravaAuth?username=temp` +
                `&approval_prompt=force&scope=activity:read_all,profile:read_all`}>
                Authorize Chain Love to import your Strava data.
              </a>
    </div>
  )
};

export default withAuthenticator(Bikes, {includeGreetings: true} );