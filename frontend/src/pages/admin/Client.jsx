import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Form, Pagination } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getUsers, updateUserProfile } from '../../services/user.service';
import { getUserSession } from '../../utils/session';

const Client = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async (page = 1) => {
    try {
      const response = await getUsers(page, searchTerm);
      setUsers(response.users);
      setPagination({
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        totalItems: response.totalItems
      });
    } catch (error) {
      toast.error('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm]);

  const renderPagination = () => {
    const items = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === pagination.currentPage}
          onClick={() => fetchUsers(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return <Pagination>{items}</Pagination>;
  };

  return (
    <Container fluid className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4>Client Management</h4>
          <Form.Control
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '200px' }}
          />
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Government-issued ID</th>
                <th>Address</th>
                <th>City</th>
                <th>Country</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
            {users
                ?.filter(
                  (user) =>
                    user?.id !== getUserSession()?.id &&
                    user?.roles?.some((role) => role.role_name === 'customer')
                )
                .map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>{user.city}</td>
                  <td>{user.country}</td>
                  <td>
                      {user.passportImage ? (
                        <img
                          src={user.passportImage}
                          alt="Passport"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                      ) : (
                        'No Image'
                      )}
                      </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center mt-3">
            {renderPagination()}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Client;
