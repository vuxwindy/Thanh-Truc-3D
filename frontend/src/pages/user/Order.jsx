import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { CDN_URL } from '../../constant';

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const data = await orderService.getOrderById(id);
        setOrder(data);
        setError(null);
      } catch (err) {
        setError('Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.');
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const getStatusBadge = (status) => {
    const statusMap = {
      'pending': { variant: 'warning', text: 'Đang xử lý' },
      'processing': { variant: 'info', text: 'Đang xử lý' },
      'completed': { variant: 'success', text: 'Hoàn thành' },
      'cancelled': { variant: 'danger', text: 'Đã hủy' }
    };
    
    const statusInfo = statusMap[status] || { variant: 'secondary', text: status };
    return <Badge bg={statusInfo.variant}>{statusInfo.text}</Badge>;
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{error}</Alert>
        <Button as={Link} to="/customer/orders" variant="outline-primary">
          Quay lại danh sách đơn hàng
        </Button>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-4">
        <Alert variant="info">Không tìm thấy thông tin đơn hàng.</Alert>
        <Button as={Link} to="/customer/orders" variant="outline-primary">
          Quay lại danh sách đơn hàng
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Chi tiết đơn hàng #{order.id}</h2>
      
      <Card className="mb-4">
        <Card.Header>
          <Row>
            <Col>
              <h5 className="mb-0">Thông tin đơn hàng</h5>
            </Col>
            <Col xs="auto">
              {getStatusBadge(order.status)}
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Ngày đặt hàng:</strong> {formatDate(order.created_at)}</p>
              <p><strong>Phương thức thanh toán:</strong> {order.payment_method}</p>
              <p><strong>Tổng tiền:</strong> {formatCurrency(order.price)}</p>
            </Col>
            <Col md={6}>
              {order.transaction_id && (
                <p><strong>Mã giao dịch:</strong> {order.transaction_id}</p>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <h5 className="mb-0">Sản phẩm đã mua</h5>
        </Card.Header>
        <Card.Body>
          {order.products && order.products.map((item, index) => (
            <Row key={index} className={index > 0 ? "mt-3 pt-3 border-top" : ""}>
              <Col md={8}>
                <img src={CDN_URL+ item?.image} alt={item?.name || 'Sản phẩm không xác định'} className="img-fluid" width={100} height={100} style={{objectFit:"cover", marginBottom:"8px"}}/>
                <h6>{item?.name || 'Sản phẩm không xác định'}</h6>
                <p className="text-muted">{item?.description?.substring(0, 100)}...</p>
              </Col>
              <Col md={4} className="text-end">
                <p><strong>Số lượng:</strong> {item?.OrderProduct?.quantity}</p>
                <p><strong>Giá:</strong> {formatCurrency(item?.OrderProduct?.price || 0)}</p>
              </Col>
            </Row>
          ))}
        </Card.Body>
      </Card>

      <div className="mt-4">
        <Button as={Link} to="/customer/orders" variant="outline-primary">
          Quay lại danh sách đơn hàng
        </Button>
      </div>
    </Container>
  );
};

export default Order;