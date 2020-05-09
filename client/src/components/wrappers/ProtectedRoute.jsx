import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Redirect } from 'react-router-dom';
import { setRedirectRoute } from '../../state/actions/appControls.js';


// ... wraper for routes requiring auth
  const ProtectedRoute = ({ exact, path, render, ...routeProps }) => {
  const { authState } = useSelector(state => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    // define route to redirect to after successfull login
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
};

export default withRouter(ProtectedRoute);



// // ... wrapper for routes that require app-level auth AND strava permissions
// export const StravaPermissionsRoute = ({ exact, path, render}) => {
//   const { hasStravaAccess } = useSelector(state => state.user);

//   render = hasStravaAccess ? render : () => <Redirect to='/stravaAuth' />;s
  
//   return (
//     <ProtectedRoute
//       exact={exact}
//       path={path}
//       render={render}
//     />
//   )

// }

