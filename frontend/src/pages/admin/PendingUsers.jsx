import React, { useEffect, useState } from 'react';
import { Container, Card, Table, Button, Image } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getPendingUsers, approveUser, rejectUser } from '../../services/user.service';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const PendingUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPending = async () => {
    try {
      setLoading(true);
      const res = await getPendingUsers();
      setUsers(res || []);
    } catch (err) {
      toast.error('Failed to load pending users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveUser(id);
      toast.success('User approved');
      fetchPending();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Approve failed');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectUser(id);
      toast.success('User rejected');
      fetchPending();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Reject failed');
    }
  };

  return (
    <Container fluid className="mt-4">
      <Card>
        <Card.Header>
          <h4>Pending Users (ID verification)</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>ID Front</th>
                <th>ID Back</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={u.id}>
                  <td>{idx + 1}</td>
                  <td>{u.id}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>
                    {u.idFrontImage ? (
                      <a href={`${API_BASE}/uploads/${u.idFrontImage}`} target="_blank" rel="noreferrer">
                        <Image src={`${API_BASE}/uploads/${u.idFrontImage}`} thumbnail style={{ maxWidth: 120 }} />
                      </a>
                    ) : '—'}
                  </td>
                  <td>
                    {u.idBackImage ? (
                      <a href={`${API_BASE}/uploads/${u.idBackImage}`} target="_blank" rel="noreferrer">
                        <Image src={`${API_BASE}/uploads/${u.idBackImage}`} thumbnail style={{ maxWidth: 120 }} />
                      </a>
                    ) : '—'}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="success" size="sm" onClick={() => handleApprove(u.id)}>Approve</Button>
                      <Button variant="danger" size="sm" onClick={() => handleReject(u.id)}>Reject</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {users.length === 0 && <div className="text-center">No pending users</div>}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PendingUsers;
