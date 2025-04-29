import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const RefundPolicy = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase"> Return and Refund Policy </h1>
            <p className="lead">
              Last updated: {new Date().toLocaleDateString()}
            </p>
              <ol>
                <li>
                  <strong>
                    Cases accepted for return (only applicable to physical
                    products)
                  </strong>
                </li>
              </ol>
              <p>
                – The product has a defect due to the design and technical
                department of http://thanhtruckb.com/
              </p>
              <ol start="2">
                <li>
                  <strong>Regulations on product return:</strong>
                </li>
              </ol>
              <p>
                – The time for customers to contact to request a valid return is
                03 working days from the time of receiving the product.
              </p>
              <p>
                – How to return: Customers need to notify the staff of
                http://thanhtruckb.com/ via phone number 0949942222 about the
                reason for return, address and correct contact phone number so
                that we can carry out the product return process as quickly as
                possible according to your request. We will ask customers to
                provide proof of purchase (photos, videos of unpacking) to have
                a basis for processing customers’ requests to exchange/return
                goods.
              </p>
              <p>
                For valid return requests (customers provide full information
                proving that they purchased the product on the website
                http://thanhtruckb.com/ and meet the return contact deadline),
                we will support customers to exchange new products.
              </p>
              <p>
                – Product return location: http://thanhtruckb.com/ encourages
                customers to bring the product directly to the store at the
                address: Do Nha Quarter, Phuong Lieu Ward, Que Vo Town, Bac Ninh
                Province so that we can check the product and customers can view
                and choose to exchange the product according to their needs. For
                customers in the province, you can send the product by post and
                contact the Company about the exchanged product, postal code… so
                that we can process and send the product back as soon as
                possible upon receiving the product.
              </p>
              <ol start="3">
                <li>
                  <strong>Refund Policy</strong>
                </li>
              </ol>
              <p>
                We do not refund all technology products after a successful
                transaction. All purchases are final and we do not offer any
                money back guarantees. You read and agree that you will not be
                refunded for any purchase under any circumstances.
              </p>
        
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default RefundPolicy;
