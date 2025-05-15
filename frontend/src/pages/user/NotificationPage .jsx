import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, ListGroupItem, Badge, Button } from 'react-bootstrap';

const NotificationPage = () => {
  // Giả lập các thông báo
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Lấy thông báo từ API khi trang được tải
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`); // URL của API
        setNotifications(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông báo:', error);
      }
    };    fetchNotifications();
}, []);

  // Xử lý đánh dấu thông báo là đã đọc
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <Container>
      <h2 className="my-4 text-light">Thông Báo Mua Hàng</h2>
      <ListGroup>
        {notifications.map((notification) => (
          <ListGroupItem
            key={notification.id}
            className={notification.read ? 'bg-light' : 'bg-warning'}
            onClick={() => markAsRead(notification.id)}
            style={{ cursor: 'pointer' }}
          >
            <div>{notification.message}</div>
            {!notification.read && <Badge pill bg="info" className="float-end">Mới</Badge>}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default NotificationPage;
