import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../state/actions.js';
import BikePanel from './BikePanel.jsx';

// auth imports
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import config from "../aws-exports.js";
Amplify.configure(config);

const Bikes = () => {
  const { hasStravaAccess } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, []);


  if (!hasStravaAccess) {
    return <Redirect to='stravaAuth' />
  }

  return (
    <div className="container-md my-5">
      <div className="display-4">YourBikes</div>
      <div className="row no-gutters justify-content-center mb-3">
        bikes
        {/* {
          userData.bikes.map((bike) => {
            return (<BikePanel name={bike.name} />)
          })
        } */}
      </div>
    </div>
  )
};

// export default withAuthenticator(Bikes, {includeGreetings: true} );

export default Bikes;