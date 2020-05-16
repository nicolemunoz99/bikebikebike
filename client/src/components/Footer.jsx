import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
<Container fluid className="footer my-2">
  <Row>
    <Col className="text-right">
      <img src="/img/strava_logo.png" />
    </Col>
  </Row>
</Container>
);

export default Footer;