import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { login } from '../services/auth.service';
import { setCredentials } from '../store/slices/authSlice';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      const response = await login(data);

      if (response.success) {
        const { user, token } = response.data;

        const action = setCredentials({
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
            roles: user.roles
          },
          token
        });

        dispatch(action);

        navigate('/customer/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
      <Container className="mt-5 py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="card shadow">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">Login</h2>

                {error && (
                    <Alert variant="danger" className="mb-3">
                      {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        {...register('email')}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter your password"
                        {...register('password')}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        disabled={loading}
                    >
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </div>

                  <div className="text-center mt-3">
                    <Link to="/customer/forgot-password" className="text-decoration-none">
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="text-center mt-3">
                    <span>Don't have an account? </span>
                    <Link to="/customer/register" className="text-decoration-none">
                      Register
                    </Link>
                  </div>

                  {/* Add admin login link */}
                  <div className="text-center mt-4 pt-3 border-top">
                    <Link to="/admin/login" className="btn btn-outline-secondary btn-sm">
                      Admin Login
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
  );
};

export default Login;
