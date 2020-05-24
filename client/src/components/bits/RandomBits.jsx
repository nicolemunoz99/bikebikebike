import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import PageWrapper from '../wrappers/PageWrapper.jsx';
import { CustomInput } from '../wrappers/partForm/CustomFormBits.jsx';

export const ModalTitle = ({ children }) => (
  
  <div className="modal-title mb-4 text-center">
    {children}
  </div>

);

export const AuthWrapper = ({ title, children }) => (
  <PageWrapper>
    <Row className="justify-content-center">
      <Col xs={12} className="bbb-container bbb-border shadow">
        
        <ModalTitle>{title}</ModalTitle>
  
        <Row>
          <Col xs={12}>
          {children}
          </Col>
        </Row>
        
      </Col>
    </Row>
    
  </PageWrapper>
);

export const AuthInput = (formControlProps) => (
  <>
    <Col xs={12} md={10} lg={6} className={`my-1 mx-1`}>
      
      <Form.Control 
        as={CustomInput}
        { ...formControlProps } 
        className="w-100"
      />

    </Col>
    <div className="w-100" />
  </>
);