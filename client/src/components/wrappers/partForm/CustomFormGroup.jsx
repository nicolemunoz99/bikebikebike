import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';

const CustomFormGroup = ({children, className, ...bootsrapProps}) => {
  console.log('customFormGroup render')
  return (
    <Row
      className="custom-form-group my-3"
      {...bootsrapProps}
    >
      {children}
    </Row>
  )
};

export default CustomFormGroup