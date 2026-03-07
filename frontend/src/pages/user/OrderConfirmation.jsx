import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Alert,
  Spinner,
  Badge,
} from "react-bootstrap";
import { FaArrowLeft, FaCheckCircle, FaPaypal } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useTranslation, Trans } from 'react-i18next';
import { updateOrderStatus, getOrderById } from "../../services/order.service";
import axios from "axios";

const OrderConfirmation = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(null); // "success", "error", null
  const [isAgreed, setIsAgreed] = useState(false);

  // State cho Kien Long Bank QR Code (VietQR)
  const [klbPaymentData, setKlbPaymentData] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  // Get order data from location state or fetch from API
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);

        // Forcing a mock test directly from URL (e.g., ?tester=1)
        const paramsQ = new URLSearchParams(location.search);
        if (paramsQ.get("tester")) {
          setOrder({
            id: 9999,
            transaction_id: "",
            price: 100000,
            status: "pending",
            created_at: new Date().toISOString(),
            products: [
              {
                id: 1, name: "Test Product KLB", OrderProduct: { price: 100000, quantity: 1 }
              }
            ]
          });
          setLoading(false);
          return;
        }

        // Try to get order from location state first
        const orderFromState = location.state?.order;

        if (!orderFromState) {
          navigate("/customer/dashboard");
          return;
        }
        // If no order in state, try to get from URL params
        const orderId = orderFromState.id;

        if (orderId) {
          const fetchedOrder = await getOrderById(orderId);
          setOrder(fetchedOrder);
        } else {
          // No order ID available, redirect to dashboard
          navigate("/customer/dashboard");
        }
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Failed to load order details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [location.state, params, navigate]);

  const handleVPBankPayment = async (amount, transaction_id_send) => {
    const currency = "VND";
    const formattedAmount = Math.round(amount);
    const apiUrl = `https://api.lucentis.it.com/payment-form/${formattedAmount}/${currency}/${transaction_id_send}`;

    try {
      // Gọi API backend để lấy link thanh toán
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.paymentUrl) {
        console.log("🔗 Redirecting to:", data.paymentUrl);
        window.location.href = data.paymentUrl; // ✅ chuyển sang link thanh toán thật
      } else {
        alert("Không nhận được link thanh toán từ server!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API:", error);
      alert("Lỗi khi tạo link thanh toán!");
    }
  };

  const handleKlbPayment = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/klb/createPayment`, {
        orderId: order.id
      });
      if (res.data && res.data.success) {
        setKlbPaymentData(res.data);
        // Bắt đầu tự động kiểm tra xem đơn hàng đã được Webhook đánh dấu là completed chưa
        startPollingOrderStatus();
      }
    } catch (err) {
      console.error("Lỗi khi tạo payment KLB:", err);
      alert("Đã xảy ra lỗi khi kết nối với Ngân Hàng Kiên Long. Thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  const startPollingOrderStatus = () => {
    const intervalId = setInterval(async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/klb/order-status/${order.id}`);
        if (res.data && res.data.status === "completed") {
          clearInterval(intervalId);
          setPaymentSuccess(true);
        }
      } catch (e) {
        console.error("[POLLING] Lỗi kiểm tra trạng thái đơn hàng:", e);
      }
    }, 5000); // Check mỗi 5 giây
  };

  //   const handleVNPTPayment = (amount, transaction_id_send) => {
  //     const currency = 'VND';
  //     const redirectUrl = `....`;
  //     window.location.href = redirectUrl;
  //     };

  // Handle PayPal payment success
  const handlePaymentSuccess = async (details) => {
    try {
      setLoading(true);

      // Update order status to completed
      await updateOrderStatus(order.id, "completed", details.id);

      setPaymentSuccess(true);
    } catch (err) {
      console.error("Failed to process payment:", err);
      setError("Failed to process payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle PayPal payment error
  const handlePaymentError = async (err) => {
    await updateOrderStatus(order.id, "fail", details.id);
    console.error("Payment error:", err);
    setError("Payment failed. Please try again.");
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

  if (!order) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">
          Order not found. Please check your order details or try again later.
        </Alert>
        <Link to="/customer/dashboard">
          <Button variant="primary" className="mt-3">
            Return to Dashboard
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4 text-light">
      <h1 className="mb-4">Order Confirmation</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      {paymentSuccess ? (
        <Card className="text-center p-5 mb-4 ">
          <Card.Body>
            <FaCheckCircle size={50} className="text-success mb-3" />
            <h3>Payment Successful!</h3>
            <p className="text-muted">
              Your order has been placed and payment has been received.
            </p>
            <p className="text-muted">
              We have sent the activation code to your email.
            </p>
            <p>
              Order ID: <strong>{order.id}</strong>
            </p>
            <p>
              Transaction ID: <strong>{order.transaction_id}</strong>
            </p>
            <Link to="/customer/orders">
              <Button variant="primary" className="mt-3">
                View My Orders
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Card className="mb-4 bg-dark text-light">
            <Card.Header className="">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Order Details</h5>
                <Badge bg={order.status === "pending" ? "warning" : "success"}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <p className="mb-1">
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p className="mb-1">
                    <strong>Date:</strong>{" "}
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </Col>
                <Col md={6}>
                  <p className="mb-1">
                    <strong>Payment Method:</strong> PayPal
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong> {order.status}
                  </p>
                </Col>
              </Row>

              <h6 className="mb-3">Order Items</h6>
              <Table
                responsive
                className="table table-dark table-striped table-hover mb-0 "
              >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products &&
                    order.products.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {product.image && (
                              <img
                                src={`${import.meta.env.VITE_API_URL}/uploads/${product.image
                                  }`}
                                alt={product.name}
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  marginRight: "10px",
                                }}
                                className="rounded"
                              />
                            )}
                            <div>
                              <h6 className="mb-0">{product.name}</h6>
                              {product.category && (
                                <small className="text-muted">
                                  {product.category.name}
                                </small>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>{Math.round(product.OrderProduct.price).toLocaleString()} VND</td>
                        <td>{product.OrderProduct.quantity}</td>
                        <td>
                          {/* tổng tiền thanh toán */}
                          {Math.round(product.OrderProduct.price * product.OrderProduct.quantity).toLocaleString()} VND

                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Row>
            <Col lg={8}>
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
              <Card className="mb-4 bg-dark text-light">
                <Card.Header className="">
                  <h5 className="mb-0">Payment Summary</h5>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Subtotal:</span>
                    <span>{Math.round(order.price).toLocaleString()} VND</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Tax Fee:</span>
                    <span>15%</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3 fw-bold">
                    <span>Total:</span>
                    <span>{Math.round(order.price * 1.15).toLocaleString()} VND</span>
                  </div>

                  {loading ? (
                    <div className="text-center py-3">
                      <Spinner
                        animation="border"
                        role="status"
                        size="sm"
                        className="me-2"
                      />
                      Processing...
                    </div>
                  ) : klbPaymentData ? (
                    <div className="mt-3 text-center">
                      <Alert variant="info">
                        Quét mã QR qua ứng dụng ngân hàng để thanh toán nhanh (Kienlongbank)
                      </Alert>
                      <Alert variant="warning" className="text-dark fw-bold">
                        Lưu ý: Bạn giữ nguyên màn hình này trong khi thanh toán nhé. Hệ thống sẽ tự động cập nhật khi nhận được tiền.
                      </Alert>
                      <img
                        src={klbPaymentData.qrUrl}
                        alt="VietQR KLB"
                        style={{ width: "100%", maxWidth: "300px", borderRadius: "10px", margin: "10px auto" }}
                      />
                      <div className="mt-2" style={{ textAlign: "left", fontSize: "14px", padding: '10px', background: '#222', borderRadius: '5px' }}>
                        <p className="mb-1 text-light">Ngân hàng: <strong>Kiên Long Bank (KLB)</strong></p>
                        <p className="mb-1 text-light">Chủ TK: <strong>MERCHANT WEB2D</strong></p>
                        <p className="mb-1 text-light">Số tài khoản ảo: <strong className="text-primary fs-5">{klbPaymentData.virtualAccount}</strong></p>
                        <p className="mb-1 text-light">Số tiền nạp: <strong>{klbPaymentData.amount.toLocaleString()} VND</strong></p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <div className="mb-3 d-flex align-items-start text-start">
                        <input
                          type="checkbox"
                          id="agreePolicy"
                          className="me-2 mt-1 form-check-input"
                          checked={isAgreed}
                          onChange={(e) => setIsAgreed(e.target.checked)}
                          style={{ cursor: "pointer" }}
                        />
                        <label htmlFor="agreePolicy" className="text-light" style={{ fontSize: "0.9rem", cursor: "pointer" }}>
                          <Trans i18nKey="checkout.agreeToRefundPolicy">
                            By completing payment, you agree to our <Link to="/customer/refund-policy" className="text-info" target="_blank">Refund Policy</Link> and all sales are final.
                          </Trans>
                        </label>
                      </div>

                      <Button
                        style={{ layout: "vertical" }}
                        variant="warning"
                        className="w-100 fw-bold mb-3"
                        onClick={() => handleVPBankPayment(Math.round(order.price * 1.15))}
                        disabled={!isAgreed}
                      >
                        Pay via Visa/Master Card
                      </Button>

                      <Button
                        className="w-100 fw-bold text-light"
                        variant="success"
                        onClick={handleKlbPayment}
                        disabled={!isAgreed}
                      >
                        Pay via VietQR
                      </Button>

                      {/* <Button
                        style={{ layout: "vertical" }}
                        onClick={() => handleVNPTPayment(order.price)}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            handlePaymentSuccess(details);
                          });
                        }}
                        onError={handlePaymentError}
                      >
                        Thanh toán thẻ
                      </Button> */}

                      {/* <PayPalScriptProvider
                        options={{
                          "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
                          currency: "VND",
                        }}
                      >
                        <PayPalButtons
                          style={{ layout: "vertical" }}
                          createOrder={(data, actions) => {
                            return actions.order.create({
                              purchase_units: [
                                {
                                  amount: {
                                    value: order.price,
                                    currency_code: "VND",
                                  },
                                  description: `Order #${order.id}`,
                                },
                              ],
                            });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                              handlePaymentSuccess(details);
                            });
                          }}
                          onError={handlePaymentError}
                        />
                      </PayPalScriptProvider> */}
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default OrderConfirmation;
