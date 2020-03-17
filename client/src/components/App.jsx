import React from 'react';
import { action } from '../reducers/actions.js';
import { useDispatch, useSelector } from 'react-redux';
import strava from '../../../strava.js';
import urls from '../../../urls.js';

const App = () => {
  
  
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

export default App;