import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../state/actions.js';
import PageWrapper from './buildingBlocks/PageWrapper.jsx';
import BikePanel from './BikePanel.jsx';

// aws auth stuff
import Amplify, { Auth } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react";
import config from "../aws-exports.js";
Amplify.configure(config);

const BikeList = () => {
  const { hasStravaAccess, bikes: bikeIds } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, []);


  if (!hasStravaAccess) {
    return <Redirect to='stravaAuth' />
  }

  return (

    <PageWrapper title="Bikes">
      
      
        {
          bikeIds.map((id) => {
            return (

              <BikePanel key={id} id={id} />)
          
            })
        }
      {/* </div> */}

    </PageWrapper>

  )
};

// export default withAuthenticator(Bikes, {includeGreetings: true} );

export default BikeList;