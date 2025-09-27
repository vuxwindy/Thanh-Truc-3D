import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { getUserSession } from '../utils/session';
import { useTranslation } from 'react-i18next';
import {useEffect, useState} from "react";
import {getAccessToken} from "../utils/session.js";
import {useLocation} from "react-router-dom";
import {FaBell, FaShoppingCart, FaUser} from "react-icons/fa";
import { fetchCartItems } from '../store/slices/cartSlice';
import LanguageSelector from '../components/LanguageSelector';
import DarkModeToggle from '../components/DarkModeToggle';
import Footer from '../components/Footer';
import Badge from "react-bootstrap/Badge";
import axios from 'axios';

const UserLayout = ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getUserSession();
  const [isAuthenticated, setIsAuthenticated] = useState(getAccessToken());
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const authState = useSelector(state => state.auth);
  const { count: cartItemCount } = useSelector(state => state.cart);


  const handleLogout = () => {
    dispatch(logout());
    navigate('/customer/login');
  };
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories`); 
        setNotifications(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy thông báo:', error);
      }
    };

    fetchNotifications();
  }, []);

    // Giá trị cứng cho thông báo
    const notificationCount = notifications.filter(notification => !notification.read).length;

    useEffect(() => {
        setIsAuthenticated(getAccessToken());
    }, [location, authState]);

    // Fetch cart items when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchCartItems());
        }
    }, [isAuthenticated, dispatch]);

    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
                const response = await axios.get(`${API_URL}/categories`);
                setCategories(response.data.categories || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

  return (
    <div className="d-flex flex-column min-vh-100" >
    <Navbar expand="lg"  className="shadow-sm border-bottom border-secondary " variant="dark" style={{ backgroundColor: '#1a1a1a ' }} >
        <Container>
          <Navbar.Brand as={Link} to="/customer">          
            <img
              src="/AnhLucentis300x230.jpg"
              width="160"
              height="80"
              className="d-inline-block align-top me-2"
              alt="Lucentis - SOURCE SOFTWARE .   Logo" />                         
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
              {/* Only show navigation items when authenticated */}
              {isAuthenticated ? (
                <Nav className="me-auto fw-semibold  ">
                {/* Home Link */}
                    <Nav.Link href="/customer"   >Trang Chủ</Nav.Link>
                
                {/* Games Dropdown */}
                    <NavDropdown title="Sản Phẩm" id="games-dropdown">
                        {categories.map(category => (
                            <NavDropdown.Item 
                                key={category.id} 
                                href={`/customer/games/category/${category.id}`}
                            >
                                {category.name}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                {/* Blogs Link */}
                    {/* <Nav.Link href="/customer/blogs">Tin Tức</Nav.Link> */}
                {/* Buying_Guide */}
                    <Nav.Link href="/customer/Terms">Hướng Dẫn Mua Hàng</Nav.Link>
                    <Nav.Link href="/customer/user-manual">Hướng dẫn sử dụng tài liệu</Nav.Link>
                    
                </Nav>
            ) : (
                <Nav className="me-auto">
                    {/* Empty nav when not authenticated */}
                    <Nav.Link href="/customer">Trang Chủ</Nav.Link>
                    <NavDropdown title="Sản Phẩm" id="games-dropdown">
                        {categories.map(category => (
                            <NavDropdown.Item 
                                key={category.id} 
                                href={`/customer/games/category/${category.id}`}
                            >
                                {category.name}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                    {/* <Nav.Link href="/customer/blogs">Tin Tức</Nav.Link> */}
                    <Nav.Link href="/customer/Terms">Hướng Dẫn Mua Hàng</Nav.Link>
                    <Nav.Link href="/customer/user-manual">Hướng dẫn sử dụng tài liệu</Nav.Link>
                </Nav>
            )}

            {!isAuthenticated ? (
                <Nav>
                    <Nav.Link href="/customer/login">{t('common.login')}</Nav.Link>
                    <Nav.Link href="/customer/register">{t('common.register')}</Nav.Link>
                </Nav>
            ) : (
                <Nav>
                  {/* Cart Icon with Badge */}
                    <Nav.Link href="/customer/cart" className="position-relative me-3">
                        <FaShoppingCart size={20} />
                        {cartItemCount > 0 && (
                            <Badge
                                pill
                                bg="danger"
                                className="position-absolute top-10 start-100 translate-middle"
                                style={{ fontSize: '0.5rem' }}
                            >
                                {cartItemCount}
                            </Badge>
                        )}
                    </Nav.Link>

                  {/* Rest of the code remains the same */}
                  {/* Notification Icon with Badge */}
                    <Nav.Link href="/customer/notifications" className="position-relative me-3">
                        <FaBell size={20} />
                        {notificationCount > 0 && (
                            <Badge
                                pill
                                bg="danger"
                                className="position-absolute top-20 start-100 translate-middle"
                                style={{ fontSize: '0.5rem' }}
                            >
                                {notificationCount}
                            </Badge>
                        )}
                    </Nav.Link>

                <Nav>
                {/* <LanguageSelector /> */}
                {/* cài đặt sáng tối */}
                {/* <DarkModeToggle /> */}
                {user ? (
                  <NavDropdown title={user.fullName || user.email} id="user-dropdown">
                    <NavDropdown.Item as={Link} to="/customer/profile">{t('common.profile')}</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/customer/orders">{t('common.orders')}</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/customer/settings">{t('common.settings')}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>{t('common.logout')}</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/customer/login">{t('common.login')}</Nav.Link>
                    <Nav.Link as={Link} to="/customer/register">{t('common.register')}</Nav.Link>
                  </>
                )}
              </Nav>
            </Nav>
          )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="flex-grow-1  pt-0">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default UserLayout;
