import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { setRedirectRoute } from '../../state/actions/appControls.js';
import { getUserData } from '../../state/actions/user.js';
import { getDefaults } from '../../state/actions/parts.js';


// ... wrapper for routes requiring auth
export const ProtectedRoute = withRouter( ({ exact, path, render, ...routeProps }) => {
  const { authState, id } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // if not logged in, set route to redirect to after successfull login
    let redirectRoute = routeProps.location.pathname !== '/stravaAuth' ? routeProps.location.pathname : '/bikes'
    if (authState !== 'signedIn') dispatch(setRedirectRoute(redirectRoute));

    // get user data if user is signed in 
    if ( authState === 'signedIn' && !id ) {
      dispatch(getUserData())
    };

}, [authState])

 
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
  const { redirectRoute } = useSelector(state => state.appControls);
  const dispatch = useDispatch();
  

  useEffect(() => {
    // get default metrics for parts
    if (measure_pref && !Object.keys(defaultParts).length) dispatch(getDefaults());
  }, [])

  // render = (hasStravaAccess && authState === 'signedIn') ? render : () => <Redirect to={redirectRoute} />;
  
  
  return (
    <ProtectedRoute
      exact={exact}
      path={path}
      render={render}
    />
  );
});

