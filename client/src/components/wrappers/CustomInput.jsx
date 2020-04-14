import React from 'react';
import { Form } from 'react-bootstrap';

const CustomInput = ({ err, subText, className, ...bootstrapProps }) => {

  return (
    <>
      <Form.Control
        {...bootstrapProps}
        className={`${className} ${err ? 'input-err' : ''}`}
      />
      <Form.Text className="text-muted">
        { subText }
      </Form.Text>
      <Form.Text className="err-msg">
        { err }
      </Form.Text>
    </>

  )
}

export default CustomInput;