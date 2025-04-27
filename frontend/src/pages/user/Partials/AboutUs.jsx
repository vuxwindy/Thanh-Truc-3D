import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <div
    style={{
      background: 'linear-gradient(to top,rgb(0, 0, 0),rgb(20, 10, 80))',
      color: '#f8f9fa',
      padding: '60px 0',
      minHeight: '100vh',
    }}
  >
    <Container>
      {/* Giới thiệu */}
      <Row className="mb-5">
        <Col>
          <h1 className="text-center mb-4 display-5 fw-bold">About Thanh Truc</h1>
          <div
            className="p-5 rounded-4 shadow"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <p className="lead mb-3">
              Welcome to <strong>Thanh Truc</strong> - your premier destination for high-quality games and gaming products.
            </p>
            <p>
              Founded in 2020, we specialize in delivering exceptional gaming experiences across multiple platforms.
              Our carefully curated collection includes the latest and most popular titles in mobile gaming, web games,
              and blockchain-based games.
            </p>
          </div>
        </Col>
      </Row>
      <Col>
          <h2 className="mb-4 fw-semibold text-center">What We Offer</h2>
        </Col>
      {/* Dịch vụ */}
      <Row className="mb-5 text-center">       
        {[
          {
            title: 'Quality Games',
            text: 'We provide a selection of high-quality games across various genres and platforms.',
            icon: '🎮',
          },
          {
            title: 'Secure Transactions',
            text: 'Our platform ensures safe and secure transactions for all your gaming purchases.',
            icon: '🔒',
          },
          {
            title: 'Customer Support',
            text: 'We\'re dedicated to providing excellent customer service and support.',
            icon: '🤝',
          },
        ].map((item, idx) => (
          <Col md={4} className="mb-4" key={idx}>
            <Card
              className="h-100 rounded-4 shadow-lg"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
              }}
            >
              <Card.Body>
                <div className="display-4 mb-3">{item.icon}</div>
                <h3 className="h5 fw-bold">{item.title}</h3>
                <p>{item.text}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Mission */}
      <Row>
        <Col>
          <div
            className="text-center p-5 rounded-4 shadow"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <h2 className="mb-3 fw-semibold">Our Mission</h2>
            <p>
              At Thanh Truc, our mission is to connect gamers with the best gaming products and experiences.
              We strive to create a platform where gaming enthusiasts can discover, purchase, and enjoy
              quality games with ease and confidence.
            </p>
            <p className="mb-0">
              Thank you for choosing Thanh Truc for your gaming needs. We look forward to serving you!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AboutUs;