import axios from 'axios';
import { openModal, closeModal, logErr } from './appControls.js';

import Amplify, { Auth } from "aws-amplify";
import config from "../../aws-exports.js";
Amplify.configure(config);

export const httpReq = (reqType, endpoint, data) => async (dispatch) => {
  dispatch(openModal('dataWait'));
  let authData = await Auth.currentAuthenticatedUser();

  let headers = { accesstoken: authData.signInUserSession.accessToken.jwtToken }
  
  try {
    let response;
    if (reqType === 'get') {
      response = await axios[reqType](`${process.env.THIS_API}${endpoint}`, { headers });
    } else {
      data = data !== undefined ? data : {};
      response = await axios[reqType](`${process.env.THIS_API}${endpoint}`, { data }, { headers });
    }
    dispatch(closeModal('dataWait'));
    return response;
  }
  catch (err) {
    dispatch(closeModal('dataWait'));
    dispatch(logErr(err));
    dispatch(openModal('err'));
  }
}


