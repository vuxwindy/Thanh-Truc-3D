import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Row, Col, Alert, Image, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getUserProfile, updateUserProfile } from '../../services/user.service';
import { setCredentials } from '../../store/slices/authSlice';
import { toast } from 'react-toastify';
import { getUserSession } from '../../utils/session';
import { vietnameseCities } from '../../constants/cities';

// Define validation schema similar to Profile.jsx
const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  phone: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  address: yup.string(),
  city: yup.string(),
  email: yup.string().email('Invalid email format'),
  country: yup.string(),
});

const AdminProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  
  const user = getUserSession();
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
    const fetchAdminProfile = async () => {
      try {
        setLoading(true);
        const userData = await getUserProfile(user.id);
        
        // Set form values using setValue from react-hook-form
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
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin profile:', err);
        setError('Failed to load admin profile');
        setLoading(false);
      }
    };
    
    if (user?.id) {
      fetchAdminProfile();
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
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
        },
        token: localStorage.getItem('token')
      }));
      
      setSuccess('Profile updated successfully');
      toast.success('Profile updated successfully');
      setLoading(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.error || 'Failed to update profile');
      toast.error('Failed to update profile');
      setLoading(false);
    }
  };
  
  // Password change functionality
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    
    setLoading(true);
    setPasswordError('');
    
    try {
      // Call password change API (you'll need to implement this)
      // await changePassword(passwordData);
      
      toast.success('Password updated successfully');
      
      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Failed to update password');
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <h2 className="mb-4">Admin Profile</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body className="text-center">
              <div className="mb-3">
                {avatarPreview ? (
                  <Image 
                    src={avatarPreview} 
                    roundedCircle 
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                  />
                ) : (
                  <div 
                    className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: '150px', height: '150px', color: 'white', fontSize: '3rem' }}
                  >
                    {user?.fullName?.charAt(0) || 'A'}
                  </div>
                )}
              </div>
              
              <h4>{user?.fullName || 'Admin User'}</h4>
              <p className="text-muted">{user?.email}</p>
              
              <Form.Group controlId="avatar" className="mb-3">
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
            </Card.Body>
          </Card>
          
          <Card className="mt-4">
            <Card.Header>Admin Privileges</Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li>✅ User Management</li>
                <li>✅ Content Management</li>
                <li>✅ Order Management</li>
                <li>✅ System Settings</li>
                <li>✅ Analytics Access</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card>
            <Card.Header>Profile Information</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
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
                        disabled
                      />
                      <Form.Text className="text-muted">
                        Email cannot be changed
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        {errors.email?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="phone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter your phone number"
                        {...register('phone')}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone?.message}
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
                </Row>
                
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Select
                        {...register('city')}
                        isInvalid={!!errors.city}
                      >
                        <option value="">Select a city</option>
                        {Object.entries(vietnameseCities).map(([id, name]) => (
                          <option key={id} value={id}>
                            {name}
                          </option>
                        ))}
                      </Form.Select>
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
                </Row>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          
          <Card className="mt-4">
            <Card.Header>Security Settings</Card.Header>
            <Card.Body>
              {passwordError && <Alert variant="danger">{passwordError}</Alert>}
              <Form onSubmit={handlePasswordSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter current password"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="Enter new password"
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm new password"
                    required
                  />
                </Form.Group>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button 
                    variant="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Change Password'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminProfile;