import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const HandlingProcess = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase"> Complaints reception and handling process</h1>
            <p className="lead">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
                  
            
              <p>
                <strong>Article 1: Resolution mechanism</strong>.
              </p>
              <p>
                All complaints from the Customer are resolved on the basis of
                negotiation. In case of failure to reach the desired agreement,
                either party has the right to bring the case to the competent
                State agency for resolution.
              </p>
              <p>
                In case of an incident due to the fault of&nbsp;
                <u>thanhtruckb.com</u>, we will immediately apply necessary
                measures to ensure the rights of the customer.
              </p>
              <p>
                <strong>Article 2: Method of submitting complaints</strong>.
              </p>
              <p>
                Customers can submit complaints to request Thanh Truc Kinh Bac
                Company Limited to resolve them in the following ways:
              </p>
              <p>* Method 1: Call our hotline: 0949942222</p>
              <p>
                * Method 2: Send an email to the address:&nbsp;
                <a href="mailto:thanhtruckinhbac@gmail.com">
                  thanhtruckinhbac@gmail.com
                </a>
              </p>
              <p>
                * Method 3: Directly to the address: Do Nha Quarter, Phuong Lieu
                Ward, Que Vo Town, Bac Ninh Province.
              </p>
              <p>
                <strong>Article 3: Implementation procedure</strong>.
              </p>
              <p>
              *  <em>Step 1: </em>Submit a complaint.
              </p>
              <p>
                Customers submit complaints about services or benefits that have
                not been fully guaranteed to Thanh Truc Kinh Bac Company Limited
                through the methods specified above.
              </p>
              <p>
              *   <em>Step 2: </em>Receiving and handling complaints.
              </p>
              <p>
                Thanh Truc Kinh Bac Company Limited will receive complaints from
                Customers and proceed to verify information.
              </p>
              <p>
              *  <em>Step 3: </em>Responding to Customers.
              </p>
              <p>
                Thanh Truc Kinh Bac Company Limited will respond to the results
                of handling complaints to Customers within 03 working days from
                the date of completion of information verification and
                processing.
              </p>
              <p>
                Thanh Truc Kinh Bac Company Limited will try to verify
                information and resolve complaints quickly and promptly to
                ensure the rights of Customers. In cases beyond the ability and
                authority of the Center, we will request the Customer to bring
                this case to a competent state agency for settlement in
                accordance with the law.
              </p>
 
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default HandlingProcess;
