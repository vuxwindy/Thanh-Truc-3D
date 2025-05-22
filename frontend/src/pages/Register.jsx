import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { vietnameseCities } from '../constants/cities';
import { register as registerApi, verifyRegistration } from '../services/auth.service';
import { setCredentials, setLoading, setError } from '../store/slices/authSlice';

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  address: yup.string().required('Address is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  phone: yup
  .string()
  .matches(/^\d{9,13}$/, 'Mobile Phone number you are using')
  .required('Mobile Phone number is required'),
  cccd: yup
      .string()
      .matches(/^[A-Z0-9]{6,15}$/, 'Passport or ID must be alphanumeric (6–15 characters)')
      .required('Passport or Government-issued ID is required'),
  verificationCode: yup.string().when('showVerificationCode', {
    is: true,
    then: (schema) => schema.required('Verification code is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const Register = () => {
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [formData, setFormData] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      showVerificationCode: false,
    },
  });

  // Add countdown effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      if (!showVerificationCode) {
        await registerApi(data);
        setFormData(data);
        setShowVerificationCode(true);
        setCountdown(60); // Start countdown when verification code is sent
      } else {
        const { email, verificationCode, ...userData } = data;
        const result = await verifyRegistration(email, verificationCode, userData);
        if (result.success) {
          const { user, token } = result.data;
          const action = setCredentials({
            user: {
              id: user.id,
              email: user.email,
              fullName: user.fullName,
              phone: user.phone,
              cccd: user.cccd,
              roles: user.roles
            },
            token
          });
          dispatch(action);

          navigate('/customer/dashboard');
        }
      }
    } catch (error) {
      dispatch(setError(error.response?.data?.error || 'Something went wrong'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Add resend verification code function
  const handleResendCode = async () => {
    if (countdown > 0 || !formData) return;

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      await registerApi(formData);
      setCountdown(60); // Reset countdown
    } catch (error) {
      dispatch(setError(error.response?.data?.error || 'Failed to resend verification code'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
      <Container className="mt-5 py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="card shadow bg-dark text-light">
              <div className="card-body p-4">
                <h2 className="text-center mb-4">Registration</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        {...register('fullName')}
                        isInvalid={!!errors.fullName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fullName?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

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

                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your address"
                        {...register('address')}
                        isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your country"
                        {...register('country')}
                        isInvalid={!!errors.country}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.country?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your city"
                        {...register('city')}
                        isInvalid={!!errors.city}
                    />
                    {/*  chọn city trong constants/citis.js  */}
                    {/* <Form.Select
                      type="text"
                        placeholder="Enter your city"
                        {...register('city')}
                        isInvalid={!!errors.city}
                    >                      
                      <option value="">Select a city</option>
                      {Object.entries(vietnameseCities).map(([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                      ))}
                    </Form.Select> */}
                    <Form.Control.Feedback type="invalid">
                      {errors.city?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* phone */}
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Mobile Phone Number"
                        {...register('phone')}
                        isInvalid={!!errors.phone}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* ID Number: CCCD, Partposs */}
                  <Form.Group className="mb-3">
                    <Form.Label>Identity verification documents</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter your Passport or Government-issued ID"
                        {...register('cccd')}
                        isInvalid={!!errors.cccd}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.cccd?.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {showVerificationCode && (
                      <Form.Group className="mb-3">
                        <Form.Label>Verification Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter verification code"
                            {...register('verificationCode')}
                            isInvalid={!!errors.verificationCode}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.verificationCode?.message}
                        </Form.Control.Feedback>
                        <div className="d-flex justify-content-end mt-2">
                          <Button
                              variant="link"
                              size="sm"
                              onClick={handleResendCode}
                              disabled={countdown > 0 || loading}
                              className="p-0 text-decoration-none"
                          >
                            {countdown > 0 ? `Resend code (${countdown}s)` : 'Resend code'}
                          </Button>
                        </div>
                      </Form.Group>
                  )}

                  <div className="d-grid gap-2">
                    <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        disabled={loading}
                    >
                      {loading ? 'Loading...' : showVerificationCode ? 'Complete Registration' : 'Get Verification Code'}
                    </Button>
                  </div>

                  <div className="text-center mt-3">
                    <span>Already have an account? </span>
                    <Link to="/customer/login" className="text-decoration-none">
                      Login
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

export default Register;
