import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';

const Footer = () => {

return (

<Navbar fixed="bottom" className="footer">
  <img className="ml-auto" src="/img/strava_logo.png" />
</Navbar>
)};

export default Footer;

{/* <Container fluid className="footer mt-4 my-2" fixed="bottom">
  <Row>
    <Col className="text-right">
      <img src="/img/strava_logo.png" />
    </Col>
  </Row>
</Container> */}