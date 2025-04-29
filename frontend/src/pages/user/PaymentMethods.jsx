import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PaymentMethods = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase">Payment Methods</h1>
            <p className="lead">
              Last updated: {new Date().toLocaleDateString()}
            </p>

             
              <p>
                Currently, when purchasing products online on the website
                https://thanhtruckb.com/, customers make payment in the
                following ways:
              </p>
              <p>
                <strong>
                  Bank transfer
                  <br />
                </strong>
                <br />
                Customers transfer money to our bank account below:
              </p>
              <p>
                Account name:&nbsp;
                <strong>THANH TRUC KINH BAC COMPANY LIMITED</strong>
              </p>
              <p>
                Account number:&nbsp;<strong>9683666666</strong>
              </p>
              <p>
                <strong>Military Commercial Joint Stock Bank (MBBank)</strong>
              </p>
              <p>
                * Note: Before ordering and paying by bank transfer, please
                carefully check the information about the ordered product
                (product type, description image, introduction information…)
                along with the amount to be paid clearly displayed in the order
                information on the thanhtruckb.com website interface.
              </p>
     
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentMethods;
