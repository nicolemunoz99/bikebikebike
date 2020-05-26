import axios from 'axios';
import { openModal, closeModal, logErr } from './appControls.js';

import Amplify, { Auth } from "aws-amplify";
import config from "../../aws-exports.js";
Amplify.configure(config);

export const httpReq = (reqType, endpoint, data) => async (dispatch) => {
  dispatch(openModal('dataWait'));
  
  try {
    let authData = await Auth.currentAuthenticatedUser();

    let headers = { accesstoken: authData.signInUserSession.accessToken.jwtToken }
  
    let response;
    if (reqType === 'get') {
      response = await axios[reqType](`${process.env.THIS_API}${endpoint}`, { headers });
    } else {
      data = data !== undefined ? data : {};
      response = await axios[reqType](`${process.env.THIS_API}${endpoint}`, { data }, { headers });
    }
    dispatch(closeModal('dataWait'));
    
    if (response.status === 204) { dispatch(openModal('limitedAccess')); return }; // demo: scoped down permissions
    
    if (response.status === 201) return response; // user hasn't granted strava permissions

    if (typeof response.data === 'string') throw(`problem accessing ${process.env.THIS_API}${endpoint}`)

    return response;
  }
  catch (err) {
    dispatch(closeModal('dataWait'));
    dispatch(logErr(err.message || err));
  }
}


