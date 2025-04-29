import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const WarrantyPolicy = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase"> Warranty Policy </h1>
            <p className="lead">
              Last updated: {new Date().toLocaleDateString()}
            </p>
           
            <ol>
                <li >
                  <strong>Covered by the warranty:</strong>
                </li>
              </ol>
               <p>
                – The product that has just been delivered is not as the image,
                description provided or on the website
              </p>
              <ol start="2">
                <li >
                  <strong>Cases not covered by the warranty:</strong>
                </li>
              </ol>
              <p>– The product is defective due to improper installation</p>
              <p>– The product is modified, the code is changed</p>
              <ol start="3">
                <li >
                  <strong>
                    Procedures, warranty methods and contact points
                  </strong>
                </li>
              </ol>
              <p>
                <strong>
                  We encourage you to send directly to the company's
                  headquarters at the address: Do Nha Quarter, Phuong Lieu Ward,
                  Que Vo Town, Bac Ninh Province, Vietnam for warranty support
                  in the fastest time.
                </strong>
              </p>
              <p>
                <strong>
                  In case you send the goods to thanhtruckb.com, the warranty
                  period is expected to be within 3-5 days from the date
                  thanhtruckb.com receive the goods. The specific warranty
                  period depends on the product defect in each case.
                </strong>
              </p>
              <p>
                <strong>
                  For answers to questions or detailed instructions about
                  https://thanhtruckb.com/ , product warranty process, please
                  contact 0949942222 phone number or email:
                  thanhtruckinhbac@gmail.com
                </strong>
              </p>  
    
 
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default WarrantyPolicy;
