import React from 'react';
import { Container, Row, Col, Stack, Image, Nav, NavLink } from 'react-bootstrap';
import LogoImage from './../../assets/logoWebsite_sementara.png';
import './ComponentFooter.css';

const ComponentFooter = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 shadow-sm">
      <Container>
        <Row className="justify-content-between">
          <Col md={4} className="mb-4">
            <Stack gap={2}>
              <Image
                src={LogoImage}
                alt="Website Logo"
                rounded
                width={120}
                height={120}
              />
              <h4 className="mb-0">Wanna<span className="fw-bold text-warning">EAT</span></h4>
              <small>Set Your Food Preference</small>
            </Stack>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="mb-3">Main Menu</h5>
            <Nav className="flex-column">
              <NavLink href="/" className="text-white text-decoration-none fw-normal footer-link">Home</NavLink>
              <NavLink href="/restaurants" className="text-white text-decoration-none fw-normal footer-link">Restaurant</NavLink>
              <NavLink href="/foods" className="text-white text-decoration-none fw-normal footer-link">Foods</NavLink>
              <NavLink href="/aboutMe" className="text-white text-decoration-none fw-normal footer-link">About Website</NavLink>
            </Nav>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="mb-3">Contact Us</h5>
            <p className="mb-1">📧 <strong>Email:</strong> Enancy@GG.com</p>
            <p>📞 <strong>Phone:</strong> +62 7788 5533 221</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default ComponentFooter;
