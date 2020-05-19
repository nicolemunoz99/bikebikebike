import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import PageWrapper from './wrappers/PageWrapper.jsx';
import { Button } from 'react-bootstrap';

// auth stuff
import Amplify, { Auth } from "aws-amplify";
import config from "../aws-exports.js";
Amplify.configure(config);

const StravaAuth = ({ history }) => {
  const [username, setUsername] = useState('');
  const hasStravaAccess = useSelector(state => state.user.hasStravaAccess);
  const { redirectRoute } = useSelector(state => state.appControls);


  useEffect(() => {
    // get username to put in redirectURL query
    if (!hasStravaAccess) {
      let getUsername = async () => {
        let newUsername = (await Auth.currentAuthenticatedUser()).username;
        setUsername(newUsername);
      };
      getUsername();
    }
  }, []);

  useEffect(() => {
    // redirect after permissions granted
    if (hasStravaAccess) history.replace(redirectRoute ? redirectRoute : '/bikes');
  }, [hasStravaAccess]);

  return (
    <>
    
    { !hasStravaAccess ?
      
      <PageWrapper>
        <p>
          Looks like you haven't given BikeBikeBike! access to your Strava activity data.
        </p>
        <p>
          In order to track component usage via your strava activities, click the link below to grant BikeBikeBike! permission to
          access to your activity data. You'll be redirected to Strava's site for authorization.
        </p>
        <p>
          To revoke access, go to your Settings in your Strava account, select "My Apps", and click "Revoke Access".
        </p>
        <div className="text-center mt-4">

          <Button
            bsPrefix="bbb-button"
            href={`https://www.strava.com/oauth/authorize` +
            `?client_id=${process.env.STRAVA_CLIENT_ID}` +
            `&response_type=code` +
            `&redirect_uri=${process.env.THIS_API}/api/oauth2?username=${username}` +
            `&approval_prompt=force&scope=activity:read_all,profile:read_all`}
          >
            Go to Strava's site to grant access. 
          </Button>
        </div>
      </PageWrapper>

      :

      <Redirect to="/bikes" />
    }
    </>
  )
};

export default withRouter(StravaAuth);