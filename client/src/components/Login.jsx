import React from 'react';
import { Redirect } from 'react-router-dom';
import { withAuthenticator } from 'aws-amplify-react';


const Login = () => {

  return (
    <div>Login or Signup
        <Redirect to="/bikes" />
    </div>
  )
};

export default withAuthenticator(Login, {includeGreetings: true})