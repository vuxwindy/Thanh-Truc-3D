import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Terms = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1>Terms & Conditions</h1>
          <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-4">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using Web2D's services, you agree to be bound by these Terms and Conditions.</p>
          </section>

          <section className="mt-4">
            <h2>2. User Accounts</h2>
            <p>Users must maintain the confidentiality of their account information and are responsible for all activities under their account.</p>
          </section>

          <section className="mt-4">
            <h2>3. Service Usage</h2>
            <p>Our services are provided "as is" and we reserve the right to modify or discontinue any feature or functionality.</p>
          </section>

          {/* Add more sections as needed */}
        </Col>
      </Row>
    </Container>
  );
};

export default Terms;