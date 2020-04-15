import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import CustomInput from './CustomInput.jsx';
import { updatePartForm, resetForm } from '../../../state/actions.js';
import { errMsgs } from '../../../validation.js';

const TrackingMethod = () => {
  const { inputs, isReq, isOk } = useSelector(state => state.form);
  const dispatch = useDispatch();
  
  return (

  )
};

export default TrackingMethod;