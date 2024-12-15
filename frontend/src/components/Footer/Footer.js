import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Office address</h5>
            <p>Pharmacy, SD, photography st, 8</p>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: airguy-one@yandex.ru</p>
            <p>Phone: +83 (999) 999 99-99</p>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <p>
              <a href="#facebook">Facebook</a> | <a href="#instagram">Instagram</a> | <a href="#twitter">Twitter</a>
            </p>
          </Col>
        </Row>
        <Row className="mt-3">
          <p>&copy; {new Date().getFullYear()} Whizzy Lens. All rights reserved.</p>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
