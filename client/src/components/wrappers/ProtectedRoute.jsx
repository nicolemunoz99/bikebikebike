import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { setRedirectRoute } from '../../state/actions/appControls.js';
import { getUserData } from '../../state/actions/user.js';
import { getDefaults } from '../../state/actions/parts.js';


// ... wraper for routes requiring auth
export const ProtectedRoute = withRouter( ({ exact, path, render, ...routeProps }) => {
  const { authState, id } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // get user data if user is signed in 
    if ( authState === 'signedIn' && !id ) dispatch(getUserData());
}, [authState])

  useEffect(() => {
    // if not logged in, set route to redirect to after successfull login
    if (authState !== 'signedIn') dispatch(setRedirectRoute(routeProps.location.pathname));
  }, [authState]);
 
  // redirect to login if not signed in
  render = authState === 'signedIn' ? render : () => <Redirect to='/login' />;
  
  return (
    <Route 
      exact={exact}
      path={path}
      render={render}
    />
  );
});




// ... wrapper for routes that require app-level auth AND strava permissions
export const StravaPermissionsRoute = withRouter( ({ exact, path, render }) => {
  const { hasStravaAccess, id, measure_pref } = useSelector(state => state.user);
  const { authState } = useSelector(state => state.user);
  const { default: defaultParts} = useSelector(state => state.parts);
  const dispatch = useDispatch();
  

  useEffect(() => {
    // get default metrics for parts
    if (measure_pref && !Object.keys(defaultParts).length) dispatch(getDefaults());
  }, [])

  render = (hasStravaAccess && authState === 'signedIn') ? render : () => <Redirect to='/stravaAuth' />;
  
  return (
    <ProtectedRoute
      exact={exact}
      path={path}
      render={render}
    />
  );
});

