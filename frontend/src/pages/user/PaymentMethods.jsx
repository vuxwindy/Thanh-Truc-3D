import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";

const PaymentMethods = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-4 text-light">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 className="entry-title mb uppercase">{t('paymentMethods.title')}</h1>
            <p className="lead">
              {t('paymentMethods.updated')} {new Date().toLocaleDateString()}
            </p>


            <p>
              <Trans i18nKey="paymentMethods.p1">
                Hiện nay, khi mua sản phẩm trực tuyến trên website <a href="https://lucentis.it.com">lucentis.it.com</a>
                , khách hàng có thể chọn một phương thức thanh toán duy nhất là thực hiện thanh toán trực tiếp trên web site.
              </Trans>
            </p>

            <p>
              <Trans i18nKey="paymentMethods.p2">
                * Lưu ý: Trước khi đặt hàng và thanh toán, vui lòng
                kiểm tra kỹ thông tin về sản phẩm đã đặt hàng
                (loại sản phẩm, hình ảnh mô tả, thông tin giới thiệu…)
                cùng số tiền cần thanh toán được hiển thị rõ ràng trong thông tin đơn hàng
                trên giao diện website <a href="https://lucentis.it.com">lucentis.it.com</a>.
              </Trans>
            </p>
            <p>
              {t('paymentMethods.p3')}
            </p>
            &nbsp;
            <h2>
              <strong>{t('paymentMethods.subtitle')} </strong>
            </h2>
            <p>
              {t('paymentMethods.p4')}
            </p>
            {/* <p>* Cách 1: Gọi đến số hotline của chúng tôi: 0332354286</p>
            <p>
              * Cách 2: Gửi email đến địa chỉ:&nbsp;
              <a href="mailto:lucentiscompany@gmail.com">
                lucentiscompany@gmail.com
              </a>
            </p>
            <p>
              * Cách 3: Đến trực tiếp địa chỉ: Khu phố Đỗ Nha, Phường Phương
              Liễu, Tỉnh Bắc Ninh.
            </p> */}
            <p>
              {t('paymentMethods.p5')}
            </p>
            <p>
              {t('paymentMethods.p6')}
            </p>

          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentMethods;
