import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div
    style={{
      // background: 'linear-gradient(to top,rgb(0, 0, 0),rgb(20, 10, 80))',
      color: '#000',
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
            className="p-5 rounded-4 "
         style={{
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              color: '#000',
              border: '1px solid transparent',
            }}
        
          >
            <p className="lead mb-3">
            Chào mừng đến với <strong>Thanh Truc</strong> - điểm đến hàng đầu của bạn cho các trò chơi và sản phẩm trò chơi chất lượng cao.
            </p>
            <p>
            Được thành lập vào năm 2020, chúng tôi chuyên cung cấp trải nghiệm chơi game đặc biệt trên nhiều nền tảng.
Bộ sưu tập được tuyển chọn cẩn thận của chúng tôi bao gồm các tựa game mới nhất và phổ biến nhất trong trò chơi di động, trò chơi trên web
và trò chơi dựa trên blockchain.
            </p>
            <p>
  Với đội ngũ đam mê công nghệ và yêu thích game, Thanh Trúc không chỉ là một nền tảng mua bán – chúng tôi là người bạn đồng hành của mọi game thủ. Từ sản phẩm bản quyền đến các dịch vụ hỗ trợ cộng đồng, chúng tôi luôn đặt sự hài lòng và an toàn của khách hàng lên hàng đầu.
</p>
<p>
  Sự khác biệt của Thanh Trúc đến từ sự kết hợp giữa công nghệ hiện đại, dịch vụ tận tâm và cam kết không ngừng cải tiến. Chúng tôi tự hào là cầu nối giữa game thủ và thế giới giải trí số – nơi mà mỗi trải nghiệm đều đáng nhớ.
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
            link: '/customer/games/category/1',
          },
          {
            title: 'Giao dịch an toàn',
            text: 'Nền tảng của chúng tôi đảm bảo các giao dịch an toàn và bảo mật cho mọi giao dịch mua trò chơi của bạn.',
            icon: '🔒',
            link: '/customer/PrivacyPolicy',
          },
          {
            title: 'Hỗ trợ khách hàng',
            text: 'Chúng tôi cam kết cung cấp dịch vụ hỗ trợ và chăm sóc khách hàng tuyệt vời.',
            icon: '🤝',
            link: '/customer/user-manual',
          },
        ].map((item, idx) => (
          <Col md={4} className="mb-4" key={idx}>
             <Link to={item.link} style={{ textDecoration: 'none' }}> 
            <Card
              className="h-100 rounded-4 "
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                color: '#000',
                border: '1px solid transparent',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.border = '1px solid transparent';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
              }}
            >
              <Card.Body>
                <div className="display-4 mb-3">{item.icon}</div>
                <h3 className="h5 fw-bold">{item.title}</h3>
                <p>{item.text}</p>
              </Card.Body>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Mission */}
      <Row>
        <Col>
          <div
            className="text-center p-5 rounded-4 shadow"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              color: '#000',
              border: '1px solid transparent',
            }}
          >
            <h2 className="mb-3 fw-semibold">Sứ mệnh của chúng tôi</h2>
            <p>
            Tại Thanh Trúc, sứ mệnh của chúng tôi là kết nối game thủ với các sản phẩm và trải nghiệm chơi game tốt nhất.
Chúng tôi nỗ lực tạo ra một nền tảng nơi những người đam mê chơi game có thể khám phá, mua và tận hưởng
các trò chơi chất lượng một cách dễ dàng và tự tin.
            </p>
            <p>
  Chúng tôi cam kết cung cấp dịch vụ chuyên nghiệp, nhanh chóng và an toàn — đảm bảo mỗi giao dịch đều minh bạch và đáng tin cậy.
  Bằng việc hợp tác với các nhà phát hành uy tín, Thanh Trúc mang đến kho sản phẩm đa dạng, luôn cập nhật xu hướng mới nhất trong thế giới game.
</p>
<p>
  Hơn cả một nền tảng mua bán, chúng tôi mong muốn xây dựng một cộng đồng gắn kết, nơi mọi game thủ đều được lắng nghe, hỗ trợ và đồng hành.
  Đó là lý do vì sao đội ngũ của chúng tôi không ngừng phát triển hệ thống, cải tiến dịch vụ và đặt lợi ích người chơi làm trung tâm trong mọi hoạt động.
</p>
            <p className="mb-0">
            Cảm ơn bạn đã chọn Thanh Trúc cho nhu cầu chơi game của mình. Chúng tôi mong muốn được phục vụ bạn!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AboutUs;