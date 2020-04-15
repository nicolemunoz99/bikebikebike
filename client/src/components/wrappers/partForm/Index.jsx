import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import ModalWrapper from '../ModalWrapper.jsx';
import Basics from './Basics.jsx';
import TrackingMethod from './TrackingMethod.jsx';
import { updatePartForm, resetForm } from '../../../state/actions.js';

const PartFormWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetForm());
    };
  }, []);

  const handleSubmitWrapper = () => {

  };

  return (
    <ModalWrapper title="New Component" minHeight="70%">
      <Form onSubmit={handleSubmitWrapper} id="part-form" >
        
        <Basics />

        <TrackingMethod />




      </Form>
    </ModalWrapper>
  )

};

export default PartFormWrapper;