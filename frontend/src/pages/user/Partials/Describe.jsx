import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Describe = () => {
  return (
    <div className="mt-5">
      <section style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', color: "#fff", padding: "4rem 0", marginTop:"3rem" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="display-5 fw-bold mb-4">
                Chúng tôi xây dựng <br /> trải nghiệm đồng đội vượt thời gian
              </h2>
              <p className="text-secondary mb-4">
                Đội ngũ Lucentis kết hợp giữa công nghệ và thẩm mỹ để tạo nên
                các trò chơi dựa trên thời gian – nơi từng giây đều có giá trị.
                Mỗi thành viên đều là một nghệ nhân, không ngừng hoàn thiện sản
                phẩm từ chi tiết nhỏ nhất.
              </p>
              <Button variant="outline-light" size="lg">
                <a href={`/customer/games/category/2`}style={{ textDecoration: 'none', color: '#00ffe0' }}>
                  Khám phá Soulbound Arena
                </a>
              </Button>
            </Col>
            <Col md={6}>
              <Image
                src="/banner7.png" // Thay bằng ảnh thực tế của bạn
                alt="Lucentis Team"
                fluid
                rounded
                style={{ filter: "brightness(0.7)" }} //làm mờ bên mặt
              />
              <p className="text-muted mt-2 text-center">
                Trải nghiệm Soulbound Arena - game nhập vai sống động
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{background:'linear-gradient(135deg, #f2d9c7, #bc8c5d, #6e4c2b)', color: "#fff", padding: "4rem 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <Image
                src="/banner10.png" // Thay bằng ảnh thực tế của bạn
                alt="Lucentis Team"
                fluid
                rounded
                style={{ filter: "brightness(0.7)" }} //làm mờ bên mặt
              />
              <p className="text-muted mt-2 text-center">
                Trải nghiệm Shadow of the Ronin - game nhập vai sống động
              </p>
            </Col>
            <Col md={6}>
              <h2 className="display-5 fw-bold mb-4">
                Bí mật được chôn vùi <br /> trong từng đường kiếm, nơi danh dự và lòng trung thành bị thử thách.
              </h2>
              <p className="text-light mb-4">
                Hành trình sẽ dẫn dắt nhân vật qua những trận chiến khốc liệt, khám phá các bí mật cổ xưa và đối mặt với những kẻ thù tàn bạo. Người chơi phải rèn luyện kỹ năng chiến đấu, thu thập vũ khí huyền thoại, và đưa ra những quyết định ảnh hưởng đến số phận của chính mình.
              </p>
              <Button variant="outline-light" size="lg">
                <a href={`/customer/games/category/1`}style={{ textDecoration: 'none', color: '#f2d9c7' }}>
                  Khám phá Soulbound Arena
                </a>
              </Button>
            </Col>           
          </Row>
        </Container>
      </section>

        <section style={{ color: "#fff", padding: "4rem 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="display-5 fw-bold mb-4">
                Cuộc chiến công nghệ <br />  nơi quyền lực và bí mật đã bị che giấu
              </h2>
              <p className="text-secondary mb-4">
                Một thành phố ngầm bị che khuất bởi những công nghệ lỗi thời và trí tuệ nhân tạo bị kiểm soát. Bạn vào vai một hacker bí ẩn, người vô tình khám phá ra một mã nguồn bị thất lạc có thể thay đổi vận mệnh cả thế giới.
              </p>
              <Button variant="outline-light" size="lg">
                <a href={`/customer/games/category/3`}style={{ textDecoration: 'none', color: '#00ffe0' }}>
                  Khám phá Cyber Eclipse
                </a>
              </Button>
            </Col>
            <Col md={6}>
              <Image
                src="/banner9.avif" // Thay bằng ảnh thực tế của bạn
                alt="Lucentis Team"
                fluid
                rounded
                style={{ filter: "brightness(0.7)" }} //làm mờ bên mặt
              />
              <p className="text-muted mt-2 text-center">
                Trải nghiệm Cyber Eclipse - game nhập vai sống động
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>

    
  );
};

export default Describe;
