import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Terms = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}
          
          <section className="mt-4">
					  <h1 class="entry-title mb uppercase">Buying Guide</h1>
            <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
						<p>To purchase on the website thanhtruckb.com, customers please follow the instructions below:</p>
            <p><strong>Step 1: </strong>Select the Games category you want.</p>
            <img
                src="/BuyingGuideS1.png"
                className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS1"
              />
            <p>&nbsp;</p>
            <p><strong>Step 2: </strong>The system moves to the game list page you have chosen.&nbsp;
             Next, Click on the product to see product details.</p>
            <img
                src="/BuyingGuideS2.png"
                className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS2"
              />
            <p>&nbsp;</p>
            <p><strong>Step 3:</strong> Product information will appear. &nbsp;Next, Add products to your cart.</p>
            <img
                src="/BuyingGuideS3.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS3"
              />
              <p>There will be an additional product notice to the successful shopping cart.</p>
               <p>&nbsp;</p>
            <p><strong>Step 4:</strong> You need to visit the shopping cart page via <strong>Icon Cart</strong>.</p>
            <p>Then select<strong>Proceed to checkout</strong>  to choose the payment method.</p>
            <img
                src="/BGS6.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS3"
              />
              <p>&nbsp;</p>
              <p>The system will transfer you to the payment page.</p>
            <p><strong>Step 5:</strong> You can see the product information and choose the payment method here.</p>
            <p> If you choose to pay by payment card, select<strong>The Debit or Credit</strong>.</p>
            <p>If you choose to pay via Paypal, select<strong>Paypal</strong>.</p>
            <img
                src="/BGS2.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS3"
              />
                <p>&nbsp;</p>
           
            <p><strong>The Debit or Credit </strong>  After completing the card information, choose to pay to complete the purchase. </p>
            <p> Then enter the information</p>
            <img
                src="/BGS3.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS3"
              />
              
                <p>&nbsp;</p>
            <p><strong>Step 6:</strong>  You will be able to enter a successful purchase notification.</p>
            <p>Order successful display screen</p>
            <img
                src="/BGS4.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS3"
              />
                <p>&nbsp;</p>
            <p><strong>Step 7:</strong> Now you can check your email to receive the product link.</p>
            <img
                src="/BGS5.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS3"
              />
                <p>&nbsp;</p>
            
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Terms;