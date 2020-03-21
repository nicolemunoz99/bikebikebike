import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';
import { getAuthStatus } from '../reducers/actions.js';
import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('login', isAuthenticated)
    dispatch(getAuthStatus());
    
  }, []);

  // const getUserData = async () => {
  //   try {
  //     let user = await Auth.currentAuthenticatedUser();

  //     // specify accessToken in headers of get request
  //     let res = await axios.get(`${process.env.THIS_API}/login?username=${user.username}`, {
  //       headers: { accesstoken: user.signInUserSession.accessToken.jwtToken }}
  //     );
  //     console.log('test: ', res.status)
  //     if (res.status === 201) {} // redirect to stravaAuth
  //   }
  //   catch (err) {
  //     if (err.response.status === 401) {} // redirect to login
  //     // otherwise display error modal
  //   }
    
  // };


  return (
    <div>Login or Signup
      

        <Redirect to="/stravaAuth" />


    </div>
  )
};

export default withAuthenticator(Login, {includeGreetings: true})