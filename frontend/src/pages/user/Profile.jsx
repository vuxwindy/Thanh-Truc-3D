import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Row, Col, Alert, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';
import { vietnameseCities } from '../../constants/cities';
import { getUserSession } from '../../utils/session';
import { getUserProfile, updateUserProfile } from '../../services/user.service';

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  phone: yup.string().matches(/^[A-Z0-9]{6,15}$/, 'Passport or Government-Issued ID must be alphanumeric (6–15 characters)'),
  address: yup.string(),
  city: yup.string(),
  email: yup.string().email('Invalid email format'),
  country: yup.string(),
});

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [passportPreview, setPassportPreview] = useState(null); //Bổ sung passportPreview để hiển thị ảnh trước khi submit
  const [passportFile, setPassportFile] = useState(null);
  
  const  user  = getUserSession();
  
  const dispatch = useDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await getUserProfile(user.id);
        // Set form values
        setValue('fullName', userData.fullName);
        setValue('phone', userData.phone);
        setValue('address', userData.address);
        setValue('city', Number(userData.city));
        setValue('email', userData.email);
        setValue('country', userData.country);
        
        // Set avatar preview if exists
        if (userData.avatar) {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
          setAvatarPreview(`${apiUrl}/uploads/${userData.avatar}`);
        }
        //nếu có ảnh passport, thì hiển thị lại:
        if (userData.passportImage) {
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
          setPassportPreview(`${apiUrl}/uploads/${userData.passportImage}`);
        }
        
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile');
        setLoading(false);
      }
    };
    if (user?.id) {
      fetchUserProfile();
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  const handlePassportChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPassportFile(file);
      setPassportPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Add avatar file to data if selected
      if (avatarFile) {
        data.avatar = avatarFile;
      }
      if (passportFile) {
        data.passportImage = passportFile;
      }
      
      const updatedUser = await updateUserProfile(user.id, data);
      
      // Update user in Redux store
      dispatch(setCredentials({
        user: {
          ...user,
          fullName: updatedUser.fullName,
          phone: updatedUser.phone,
          address: updatedUser.address,
          city: updatedUser.city,
          avatar: updatedUser.avatar,
          passportImage: updatedUser.passportImage,
        },
        token: localStorage.getItem('token')
      }));
      
      setSuccess('Profile updated successfully');
      setLoading(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.error || 'Failed to update profile');
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">My Profile</h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-4 justify-content-center">
                  <Col xs={12} className="text-center mb-3">
                    {avatarPreview ? (
                      <Image 
                        src={avatarPreview} 
                        roundedCircle 
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                      />
                    ) : (
                      <div 
                        className="bg-secondary rounded-circle d-flex align-items-center justify-content-center mx-auto"
                        style={{ width: '150px', height: '150px' }}
                      >
                        <span className="text-white fs-1">
                          {user?.fullName?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group controlId="avatar">
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="form-control"
                      />
                      <Form.Text className="text-muted">
                        Upload a new profile picture
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="fullName">
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
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        {...register('email')}
                        isInvalid={!!errors.email}
                        disabled // Email should typically be read-only
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="country">
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
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        {...register('city')}
                        isInvalid={!!errors.city}
                      />
                      {/* <Form.Select
                        {...register('city')}
                        isInvalid={!!errors.city}
                      >
                        <option value="">Select a city</option>
                        {Object.entries(vietnameseCities).map(([id, name]) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </Form.Select> */}
                      <Form.Control.Feedback type="invalid">
                        {errors.city?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="address">
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
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="phone">
                      <Form.Label>Identity verification documents</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your Passport or Government-issued ID"
                        {...register('phone')}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                </Row>

                <Row>   
                  {passportPreview && (
                    <div className="mb-3">
                      <p>Preview Passport Image:</p>
                      <Image src={passportPreview} thumbnail width={300} />
                    </div>
                  )}

                  <Col md={6} className="mb-3">
                    <Form.Group controlId="passport">
                      <Form.Label>Upload Passport / Government ID</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handlePassportChange}
                        isInvalid={!!errors.passportImage}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.passportImage?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
 
                <div className="d-grid gap-2 mt-4">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;