import React from 'react';
import { Form, Col, Row, OverlayTrigger } from 'react-bootstrap';

export const CustomInput = ({ err, subText, className, ...bootstrapProps }) => (
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
);



export const FormHeader = ({ label, tooltip, placement = 'left' }) => (
  <>
    <Col sm="12">
      <Row>
        <Form.Label column sm={{ span: 10, order: 1 }} xs={{ span: 12, order: 12 }}>
          {label}
        </Form.Label>

        <Col sm={{ span: 2, order: 12 }} xs={{ span: 12, order: 1 }} className="text-right">

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


export const CustomFormGroup = ({children, className, ...bootsrapProps}) => (
    <Row
      className="custom-form-group my-3"
      {...bootsrapProps}
    >
      {children}
    </Row>
  );