import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Table, Button, Badge, Form, Row, Col, Spinner, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import { CDN_URL } from '../../constant';
import { debounce } from 'lodash';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [processingOrderId, setProcessingOrderId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  const ordersPerPage = 10;

  // Create a debounced search function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 500),
    []
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter, searchQuery]); // Changed from searchTerm to searchQuery

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      let url = `${API_URL}/orders/order-admin?page=${currentPage}&limit=${ordersPerPage}`;
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }
      if (searchQuery) {
        url += `&search=${searchQuery}`;
      }

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setOrders(response.data.orders || []);
      setTotalPages(response.data.totalPages || 1);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setProcessingOrderId(orderId);
      const token = localStorage.getItem('token');

      await axios.patch(
        `${API_URL}/orders/${orderId}/status`,
        { status: newStatus, transactionId:"admin-active-" + new Date().getTime() },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the order in the local state
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));

    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status. Please try again.');
    } finally {
      setProcessingOrderId(null);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { variant: 'warning', text: 'Pending' },
      'completed': { variant: 'success', text: 'Completed' },
      'fail': { variant: 'error', text: 'Fail' },
    };

    const statusInfo = statusMap[status] || { variant: 'secondary', text: status };
    return <Badge bg={statusInfo.variant}>{statusInfo.text}</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Container fluid className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4>Order Management</h4>
          <Button variant="primary" onClick={fetchOrders}>Refresh</Button>
        </Card.Header>

        <Card.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by order ID or customer email"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="fail">Fail</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button variant="outline-primary" onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
              }}>
                Clear Filters
              </Button>
            </Col>
          </Row>

          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : orders.length === 0 ? (
            <Alert variant="info">No orders found.</Alert>
          ) : (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>#{order.id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            {order?.user?.avatar ? (
                              <img
                                src={order.user.avatar}
                                alt={order.user.fullName || 'Author'}
                                className="rounded-circle"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  objectFit: 'cover',
                                  border: '2px solid #eee'
                                }}
                              />
                            ) : (
                              <div
                                className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  color: 'white',
                                  fontSize: '1.2rem',
                                  border: '2px solid #eee'
                                }}
                              >
                                {order?.user?.fullName?.charAt(0) || 'A'}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="fw-bold">
                              {order.user?.fullName || order.fullName || 'N/A'}
                            </div>
                            <div className="text-muted small">
                              {order.user?.email || order.email || 'N/A'}
                            </div>
                            <div className="text-muted small">
                              {order.user?.phone || order.phone || 'N/A'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{formatDate(order.created_at)}</td>
                      <td>{formatCurrency(order.price)}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="me-2"
                          onClick={() => handleViewOrder(order)}
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div>
                  Showing page {currentPage} of {totalPages}
                </div>
                <div>
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    Previous
                  </Button>
                  {currentPage < totalPages && (
                    <Button
                      variant="outline-primary"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Order Detail Modal */}
      <Modal
        show={showOrderModal}
        onHide={() => setShowOrderModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <Row className="mb-3">
                <Col md={6}>
                  <p><strong>Order ID:</strong> #{selectedOrder.id}</p>
                  <p><strong>Date:</strong> {formatDate(selectedOrder.created_at)}</p>
                  <p><strong>Status:</strong> {getStatusBadge(selectedOrder.status)}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Customer:</strong> {selectedOrder.user?.fullName || 'N/A'}</p>
                  <p><strong>Email:</strong> {selectedOrder.user?.email || selectedOrder.email || 'N/A'}</p>
                  <p><strong>Phone:</strong> {selectedOrder.user?.phone || selectedOrder.phone || 'N/A'}</p>
                  <p><strong>Total:</strong> {formatCurrency(selectedOrder.price)}</p>
                </Col>
              </Row>

              <h6 className="mt-4 mb-3">Order Items</h6>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Licence</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.products?.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item?.image && (
                          <img
                            src={`${CDN_URL}/${item.image}`}
                            alt={item?.name || 'Product Image'}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        )}
                      </td>
                      <td>{item?.name || 'Unknown Product'}</td>
                      <td>{item?.OrderProduct?.quantity}</td>
                      <td>{formatCurrency(item?.OrderProduct?.price)}</td>
                      <td>{item?.OrderProduct?.licence}</td>
                      <td>{formatCurrency(item?.OrderProduct?.price * item?.OrderProduct?.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {selectedOrder.notes && (
                <div className="mt-3">
                  <h6>Notes</h6>
                  <p>{selectedOrder.notes}</p>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {selectedOrder && (
            <>
              {selectedOrder.status === 'pending' && (
                <Button
                  variant="primary"
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, 'processing');
                    setShowOrderModal(false);
                  }}
                >
                  Process Order
                </Button>
              )}

              {(selectedOrder.status === 'pending' || selectedOrder.status === 'processing') && (
                <Button
                  variant="success"
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, 'completed');
                    setShowOrderModal(false);
                  }}
                >
                  Complete Order
                </Button>
              )}

              {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'completed' && (
                <Button
                  variant="danger"
                  onClick={() => {
                    handleStatusChange(selectedOrder.id, 'cancelled');
                    setShowOrderModal(false);
                  }}
                >
                  Cancel Order
                </Button>
              )}
            </>
          )}
          <Button variant="secondary" onClick={() => setShowOrderModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Orders;