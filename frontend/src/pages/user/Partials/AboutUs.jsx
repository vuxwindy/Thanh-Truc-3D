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
            Chào mừng đến với <strong>Thanh Truc</strong> - điểm đến hàng đầu của bạn cho các trò chơi và sản phẩm trò chơi chất lượng cao.
            </p>
            <p>
            Được thành lập vào năm 2020, chúng tôi chuyên cung cấp trải nghiệm chơi game đặc biệt trên nhiều nền tảng.
Bộ sưu tập được tuyển chọn cẩn thận của chúng tôi bao gồm các tựa game mới nhất và phổ biến nhất trong trò chơi di động, trò chơi trên web
và trò chơi dựa trên blockchain.
            </p>
          </div>
        </Col>
      </Row>
      <Col>
          <h2 className="mb-4 fw-semibold text-center">Những gì chúng tôi cung cấp</h2>
        </Col>
      {/* Dịch vụ */}
      <Row className="mb-5 text-center">       
        {[
          {
            title: 'Trò chơi chất lượng',
            text: 'Chúng tôi cung cấp nhiều trò chơi chất lượng cao ở nhiều thể loại và nền tảng khác nhau.',
            icon: '🎮',
          },
          {
            title: 'Giao dịch an toàn',
            text: 'Nền tảng của chúng tôi đảm bảo các giao dịch an toàn và bảo mật cho mọi giao dịch mua trò chơi của bạn.',
            icon: '🔒',
          },
          {
            title: 'Hỗ trợ khách hàng',
            text: 'Chúng tôi cam kết cung cấp dịch vụ hỗ trợ và chăm sóc khách hàng tuyệt vời.',
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