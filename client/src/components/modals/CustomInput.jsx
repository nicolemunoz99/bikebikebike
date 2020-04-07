import React from 'react';
import { Form, Row, Col, Dropdown, DropdownButton, OverlayTrigger, Popover, Button } from 'react-bootstrap';

//type, placeholder, id, className, onChange, value
const CustomInput = ({err, className, ...bootstrapProps}) => {
  console.log('err: ', err)

  return (
    <>
      <Form.Control
        {...bootstrapProps}
        className={`${className} ${err ? 'input-err' : ''}`}
      />
      {err ?
        <div className='err-msg'>{err}</div>
      :
      null
      }
      
    </>

  )
}

export default CustomInput;