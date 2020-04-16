import React from 'react';
import { Form, Col, Row, OverlayTrigger } from 'react-bootstrap';

const FormHeader = ({ label, tooltip, placement='left' }) => (
  <> 
  <Col sm="12">
    <Row>
    <Form.Label column sm={{span:10, order:1}} xs={{span:12, order:12}}>
      {label}
    </Form.Label>
    
    <Col sm={{span:2, order:12}} xs={{span:12, order:1}} className="text-right">

      {tooltip &&
        <OverlayTrigger
          overlay={tooltip}
          placement={placement}
          trigger="click"
        >
          <span className="material-icons tooltip-icon">
            info_outline
          </span>
        </OverlayTrigger>
      }

    </Col>
    </Row>
    </Col>
  </>
);


export default FormHeader;