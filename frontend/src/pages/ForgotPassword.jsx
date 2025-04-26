import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword, resetPassword } from '../services/auth.service';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .when('showVerificationCode', {
      is: true,
      then: (schema) => schema.required('New password is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
  verificationCode: yup.string().when('showVerificationCode', {
    is: true,
    then: (schema) => schema.required('Verification code is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    context: { showVerificationCode },
  });

  const email = watch('email');

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      if (!showVerificationCode) {
        // Step 1: Request verification code
        const response = await forgotPassword(data.email);
        setSuccess(response.message || 'Verification code sent successfully');
        setShowVerificationCode(true);
        setValue('showVerificationCode', true);
      } else {
        // Step 2: Verify code and update password
        const response = await resetPassword(
          data.email,
          data.verificationCode,
          data.newPassword
        );
        
        setSuccess(response.message || 'Password reset successfully');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('customer/login');
        }, 2000);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Reset Password</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    isInvalid={!!errors.email}
                    disabled={showVerificationCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {showVerificationCode && (
                  <>
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
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        {...register('newPassword')}
                        isInvalid={!!errors.newPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.newPassword?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading 
                      ? 'Processing...' 
                      : (showVerificationCode ? 'Reset Password' : 'Get Verification Code')}
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <Link to="/customer/login" className="text-decoration-none">
                    Back to Login
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

export default ForgotPassword;