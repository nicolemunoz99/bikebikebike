import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports.js";
Amplify.configure(config);

const StravaAuth = () => {
  const [username, setUsername] = useState('');
  const hasStravaAccess = useSelector(state => state.hasStravaAccess);

  useEffect( () => {
    if (hasStravaAccess || username.length > 0) return;
    
    let getUsername = async () => {
      let newUsername = (await Auth.currentAuthenticatedUser()).username;
      setUsername(newUsername);
    };

    getUsername();
    
  }, []);


  
  return (
    <div>
    { !hasStravaAccess ?
      
      <div>
        <p>
          Looks like you haven't given Bike App access to your Strava activity data.
        </p>
        <p>
          In order to track component usage via your strava activities, grant Bike App
          access to your activity data. Upon clicking below you'll be redirected to Strava's site for authorization.
        </p>
        <p>
          To revoke access... on Strava's site or this app.
        </p>
        <div>
          <a href={`https://www.strava.com/oauth/authorize` +
                    `?client_id=${process.env.STRAVA_CLIENT_ID}` +
                    `&response_type=code` +
                    `&redirect_uri=${process.env.THIS_API}/stravaAuth?username=${username}` +
                    `&approval_prompt=force&scope=activity:read_all,profile:read_all`}>
            Go to Strava's site to authorize Bike App. 
          </a>
        </div>
      </div>

      :
      <Redirect to="/bikes" />
    }
    </div>
  )
};

export default withAuthenticator(StravaAuth, {includeGreetings: true});