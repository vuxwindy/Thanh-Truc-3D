import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Form, Alert, Spinner } from 'react-bootstrap';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, updateCartItemQuantity, removeItemFromCart, clearCartItems } from '../../store/slices/cartSlice';
import { createOrder } from '../../services/order.service';

const Cart = () => {
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, total, count, loading, error } = useSelector(state => state.cart);

  // Fetch cart items on component mount
  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  // Handle quantity change
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdating(true);
      await dispatch(updateCartItemQuantity({ cartItemId, quantity: newQuantity })).unwrap();
    } catch (err) {
      console.error('Failed to update quantity:', err);
    } finally {
      setUpdating(false);
    }
  };

  // Handle remove item
  const handleRemoveItem = async (cartItemId) => {
    try {
      setUpdating(true);
      await dispatch(removeItemFromCart(cartItemId)).unwrap();
    } catch (err) {
      console.error('Failed to remove item:', err);
    } finally {
      setUpdating(false);
    }
  };

  // Handle clear cart
  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      try {
        setUpdating(true);
        await dispatch(clearCartItems()).unwrap();
        dispatch(fetchCartItems());
      } catch (err) {
        console.error('Failed to clear cart:', err);
      } finally {
        setUpdating(false);
      }
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    try {
      setUpdating(true);
      
      // Call the order service to create an order
      const orderData = await createOrder(1);
      
      // Refresh cart
      dispatch(fetchCartItems());
      
      // Navigate to order confirmation page (to be implemented)
      navigate('/customer/order-confirmation', { state: { order: orderData.order } });
    } catch (err) {
      console.error('Failed to checkout:', err);
      // You might want to show an error message to the user
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Your Shopping Cart</h1>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {count === 0 ? (
        <Card className="text-center p-5">
          <Card.Body>
            <FaShoppingCart size={50} className="text-muted mb-3" />
            <h3>Your cart is empty</h3>
            <p className="text-muted">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/customer/dashboard">
              <Button variant="primary">
                <FaArrowLeft className="me-2" />
                Continue Shopping
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Row>
            <Col lg={8}>
              <Card className="mb-4">
                <Card.Header className="bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Cart Items ({count})</h5>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={handleClearCart}
                      disabled={updating}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              {item.product.image && (
                                <img 
                                  src={`${import.meta.env.VITE_API_URL}/uploads/${item.product.image}`}
                                  alt={item.product.name}
                                  style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                                  className="rounded"
                                />
                              )}
                              <div>
                                <h6 className="mb-0">{item.product.name}</h6>
                                {item.product.category && (
                                  <small className="text-muted">{item.product.category.name}</small>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>${item.product.priceSale}</td>
                          <td style={{ width: '120px' }}>
                            <div className="d-flex align-items-center">
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || updating}
                              >
                                -
                              </Button>
                              <Form.Control
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                                className="mx-2 text-center"
                                style={{ width: '50px' }}
                                disabled={updating}
                              />
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                disabled={updating}
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td>${(item.product.priceSale * item.quantity).toFixed(2)}</td>
                          <td>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => handleRemoveItem(item.id)}
                              disabled={updating}
                            >
                              <FaTrash />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              
              <div className="mb-4">
                <Link to="/customer/dashboard">
                  <Button variant="outline-primary">
                    <FaArrowLeft className="me-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Col>
            
            <Col lg={4}>
              <Card className="mb-4">
                <Card.Header className="bg-white">
                  <h5 className="mb-0">Order Summary</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal:</span>
                    <span>${total}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>Total:</span>
                    <span>${total}</span>
                  </div>
                  <Button 
                    variant="success" 
                    className="w-100 mt-3"
                    onClick={handleCheckout}
                    disabled={updating}
                  >
                    Proceed to Checkout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;