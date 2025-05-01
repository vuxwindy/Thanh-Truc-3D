import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { getAccessToken, isAdminSession, isCustomerSession } from "./utils/session.js";
import AdminLogin from './pages/AdminLogin';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Admin from './pages/Admin.jsx';
import AdminLayout from "./layouts/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import Customer from './pages/Customer.jsx';
import Blogs from './pages/Blogs.jsx';
import Terms from './pages/user/Terms.jsx';
import Dashboard from './pages/user/Dashboard.jsx';
import CategoryGames from './pages/user/CategoryGames.jsx';
import Termsc from './pages/user/TermsCopy.jsx';
import ChatWidget from './components/ChatWidget';
import { ChatProvider } from './contexts/ChatContext';
import LiveAgentChatWidget from './components/chat/LiveAgentChatWidget.jsx';
import LanguageRedirect from './components/LanguageRedirect';

// AppContent component that uses Redux
const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(getAccessToken());
  const [isAdmin, setIsAdmin] = useState(false); // You'll need to determine this from your auth state
  const location = useLocation();
  const authState = useSelector(state => state.auth);

  // Update authentication status when location changes or auth state changes
  useEffect(() => {
    const token = getAccessToken();
    setIsAuthenticated(token);

    // Check admin status
    const adminStatus = isAdminSession();
    const isAdminPath = location.pathname.startsWith('/admin');
    const isAdminLoginPath = location.pathname === '/admin/login';

    if (token && adminStatus && isAdminPath && !isAdminLoginPath) {
      setIsAdmin(true);
    } else if (!token || !adminStatus) {
      setIsAdmin(false);
      // Redirect non-admin users away from admin paths
      if (isAdminPath && !isAdminLoginPath) {
        window.location.href = '/admin/login';
      }
    }
  }, [location, authState]);

  return (
    <>
      <LanguageRedirect />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <Routes>
            {/* Admin Public Routes */}
            <Route path="login" element={<AdminLogin />} />

            {/* Admin Protected Routes - Using AdminLayout */}
            <Route element={<AdminProtectedRoute />}>
              <Route path="*" element={
                <AdminLayout>
                  <Routes>
                    <Route path="/*" element={<Admin />} />
                    {/* Redirect admin root to dashboard */}
                    <Route path="" element={<Navigate to="/admin/dashboard" replace />} />
                  </Routes>
                </AdminLayout>
              } />
            </Route>
          </Routes>
        } />

        {/* Customer Routes */}
        <Route path="/customer/*" element={
          <UserLayout>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="dashboard" element={<Dashboard/>}/>
                <Route path="blogs" element={<Blogs/>}/> 
                <Route path="terms" element={<Terms/>}/> 
                <Route path="games/category/:categoryId" element={<CategoryGames />} />
                <Route path="user-manual" element={<Termsc/>}/> 
              </Route>

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/*" element={<Customer />} />
              </Route>

              {/* Redirect root to dashboard if authenticated, otherwise to login */}
              <Route
                path=""
                element={
                  isAuthenticated ? (
                    isAdminSession() ?
                      <Navigate to="/admin/dashboard" replace /> :
                      <Navigate to="/customer/dashboard" replace />
                  ) : (
                    <Navigate to="/customer/login" replace />
                    // <Navigate to="/customer/dasboard" replace />
                     
                  )
                }
              />
            </Routes>
          </UserLayout>
        } />
        <Route
          path=""
          element={
            isAuthenticated ? (
              isAdminSession() ?
                <Navigate to="/admin/dashboard" replace /> :
                <Navigate to="/customer/dashboard" replace />
            ) : (
              <Navigate to="/customer/login" replace />
              // <Navigate to="/customer/dashboard" replace />
            )
          }
        />
      </Routes>
    </>
  );
};

// Main App component that provides the Redux store
function App() {
  return (
    <Provider store={store}>
      <ChatProvider>
        <Router>
          <AppContent />
          {/* <ChatWidget /> */}
          {!isAdminSession() && <LiveAgentChatWidget />}
        </Router>
      </ChatProvider>
    </Provider>
  );
}

export default App;

