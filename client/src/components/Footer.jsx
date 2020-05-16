import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
<Container fluid className="footer mt-4 my-2" fixed="bottom">
  <Row>
    <Col className="text-right">
      <img src="/img/strava_logo.png" />
    </Col>
  </Row>
</Container>
);

export default Footer;