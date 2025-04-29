import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const InspectionPolicy = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase">Inspection policy</h1>
            <p className="lead">
              Last updated: {new Date().toLocaleDateString()}
            </p>

          
              <p>
                To protect the interests of customers when shopping on
                thanhtruckb.com, we have a policy to support customers to check
                upon receipt. That is, when you receive the link from the email,
                you are allowed to install and check directly.
              </p>
              <p>
                <em>*</em> For more information, please contact us via hotline:
                0949942222.
              </p>
 
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default InspectionPolicy;
