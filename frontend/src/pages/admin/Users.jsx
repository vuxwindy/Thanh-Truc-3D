import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Modal, Form, Pagination } from 'react-bootstrap';
import { toast } from 'react-toastify';
// Update the import statement at the top
import { getUsers, createUser, updateUserProfile, deleteUser, changePassword } from '../../services/user.service';
import axios from 'axios';
import { getAllRoles, assignRolesToUser } from '../../services/role.service';
import { FaEdit, FaTrash, FaKey } from 'react-icons/fa';
import { getUserSession } from '../../utils/session';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  // Update the formData state to include confirmPassword
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '', // Add this field
    address: '',
    phone: ''
  });
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);

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

  const fetchRoles = async () => {
    try {
      const roles = await getAllRoles();
      setRoles(roles);
    } catch (error) {
      toast.error('Error fetching roles');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, [searchTerm]);

  // Update handleShowModal to reset confirmPassword
  const handleShowModal = (user = null) => {
    setSelectedUser(user);
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        address: user.address || '',
        phone: user.phone || '',
        password: '',
        confirmPassword: '' // Add this field
      });
      setSelectedRoles(user.roles?.map(role => role.id) || []);
    } else {
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '', // Add this field
        address: '',
        phone: ''
      });
      setSelectedRoles([]);
    }
    setShowModal(true);
  };

  // Update handleSubmit to validate passwords
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedUser && formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      const dataToSubmit = { ...formData };
      delete dataToSubmit.confirmPassword; // Remove confirmPassword before sending to API

      if (selectedUser) {
        await updateUserProfile(selectedUser.id, dataToSubmit);
        await assignRolesToUser(selectedUser.id, selectedRoles);
        toast.success('User updated successfully');
      } else {
        const newUser = await createUser(dataToSubmit);
        if (selectedRoles.length > 0) {
          await assignRolesToUser(newUser.id, selectedRoles);
        }
        toast.success('User created successfully');
      }
      setShowModal(false);
      fetchUsers(pagination.currentPage);
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleRoleChange = (roleId) => {
    setSelectedRoles(prev => {
      if (prev.includes(roleId)) {
        return prev.filter(id => id !== roleId);
      } else {
        return [...prev, roleId];
      }
    });
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        toast.success('User deleted successfully');
        fetchUsers(pagination.currentPage);
      } catch (error) {
        toast.error('Error deleting user');
      }
    }
  };

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

  // Add new state for password change modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // Add new handler for password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      if (passwordData.newPassword !== passwordData.confirmNewPassword) {
        toast.error('New passwords do not match');
        return;
      }

      await changePassword(selectedUser.id, {
        newPassword: passwordData.newPassword
      });

      toast.success('Password changed successfully');
      setShowPasswordModal(false);
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to change password');
    }
  };

  // Update the Actions column in the table
  return (
    <Container fluid className="mt-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4>User Management</h4>
          <div className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '200px' }}
            />
            <Button variant="primary" onClick={() => handleShowModal()}>
              Add New User
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Roles</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.filter(user=>user?.id !== getUserSession()?.id).map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>
                    {user.roles?.map(role => (
                      <span
                        key={role.id}
                        className="badge bg-primary me-1"
                      >
                        {role.role_name}
                      </span>
                    ))}
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleShowModal(user)}
                      title="Edit"
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDelete(user.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setShowPasswordModal(true);
                      }}
                      title="Change Password"
                    >
                      <FaKey />
                    </Button>
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedUser ? 'Edit User' : 'Add New User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Form.Group>
            {!selectedUser && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!selectedUser}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required={!selectedUser}
                    isInvalid={formData.password !== formData.confirmPassword && formData.confirmPassword !== ''}
                  />
                  {formData.password !== formData.confirmPassword && formData.confirmPassword !== '' && (
                    <Form.Control.Feedback type="invalid">
                      Passwords do not match
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Roles</Form.Label>
              <div>
                {roles.map(role => (
                  <Form.Check
                    key={role.id}
                    type="checkbox"
                    id={`role-${role.id}`}
                    label={role.role_name}
                    checked={selectedRoles.includes(role.id)}
                    onChange={() => handleRoleChange(role.id)}
                  />
                ))}
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {selectedUser ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Add new Modal for password change */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password for {selectedUser?.fullName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordChange}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                value={passwordData.confirmNewPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                required
                isInvalid={passwordData.newPassword !== passwordData.confirmNewPassword && passwordData.confirmNewPassword !== ''}
              />
              {passwordData.newPassword !== passwordData.confirmNewPassword && passwordData.confirmNewPassword !== '' && (
                <Form.Control.Feedback type="invalid">
                  Passwords do not match
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Change Password
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Users;