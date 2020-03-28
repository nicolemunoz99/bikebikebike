import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../state/actions.js';
import Page from './buildingBlocks/Page.jsx';
import BikePanel from './BikePanel.jsx';

// aws auth stuff
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import config from "../aws-exports.js";
Amplify.configure(config);

const Bikes = () => {
  const { hasStravaAccess, bikes: bikeIds } = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);


  if (!hasStravaAccess) {
    return <Redirect to='stravaAuth' />
  }

  return (

    <Page title="Bikes">
      
      <div className="col-sm-10 col-md-8 col-lg-6">
        {
          bikeIds.map((id) => {
            return (
              <BikePanel key={id} id={id} />)
          })
        }
      </div>

    </Page>

  )
};

// export default withAuthenticator(Bikes, {includeGreetings: true} );

export default Bikes;