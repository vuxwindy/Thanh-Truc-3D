// Admin Layout Component
import {useEffect, useState} from "react";
import {getAccessToken} from "../utils/session.js";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {FaBoxOpen, FaChartBar, FaCog, FaShoppingBag, FaUsers, FaUserShield, FaImages, FaNewspaper } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import DarkModeToggle from '../components/DarkModeToggle';

const AdminLayout = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(getAccessToken());
    const location = useLocation();
    const authState = useSelector(state => state.auth);
    const { t } = useTranslation();

    useEffect(() => {
        setIsAuthenticated(getAccessToken());
    }, [location, authState]);

    return (
        <div className="AdminApp">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    {/* Admin Logo */}
                    <Navbar.Brand href="/admin/dashboard">
                        <FaUserShield className="d-inline-block align-top me-2" size={24} />
                        {t('admin.adminPanel')}
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="admin-navbar-nav" />
                    <Navbar.Collapse id="admin-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/admin/dashboard">
                                <FaChartBar className="me-1" /> {t('common.dashboard')}
                            </Nav.Link>
                            <Nav.Link href="/admin/users">
                                <FaUsers className="me-1" /> {t('common.users')}
                            </Nav.Link>
                            <Nav.Link href="/admin/client">
                                <FaUsers className="me-1" /> {t('common.client')}
                            </Nav.Link>
                            <Nav.Link href="/admin/products">
                                <FaBoxOpen className="me-1" /> {t('common.products')}
                            </Nav.Link>
                            <Nav.Link href="/admin/banners">
                                <FaImages className="me-1" /> {t('common.banners')}
                            </Nav.Link>
                            <Nav.Link href="/admin/posts">
                                <FaNewspaper className="me-1" /> {t('common.posts')}
                            </Nav.Link>
                            <Nav.Link href="/admin/orders">
                                <FaShoppingBag className="me-1" /> {t('common.orders')}
                            </Nav.Link>
                            <Nav.Link href="/admin/settings">
                                <FaCog className="me-1" /> {t('common.settings')}
                            </Nav.Link>
                        </Nav>

                        <Nav>
                            <LanguageSelector />
                            {/* <DarkModeToggle /> */}
                            <NavDropdown
                                title={
                                    <div className="d-inline-block">
                                        <FaUserShield size={20} /> {t('admin.adminPanel')}
                                    </div>
                                }
                                id="admin-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item href="/admin/profile">{t('common.profile')}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        setIsAuthenticated(false);
                                        window.location.href = '/admin/login';
                                    }}
                                >
                                    {t('common.logout')}
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                {children}
            </Container>
        </div>
    );
};
export default AdminLayout;
