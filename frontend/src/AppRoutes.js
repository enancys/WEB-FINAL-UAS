import { Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/admin/adminDashboard.js';
import UserDashboard from './pages/user/UserDashboard';
import LoginPage from './pages/auth/LoginPage';
import RoutesConfig from './RoutesConfig.js';
import LandingPage from './pages/user/LandingPage.js';
import RegisterPage from './pages/auth/RegisterPage.js';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext'; // Import AuthContext
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext'; // Make sure to import AuthProvider
import ProfilePreferences from './pages/user/ProfilePreferences.js';
import RestaurantDetail from './components/user/Restaurant/RestaurantDetail.js';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<AdminDashboard />} />
          }
        >
          {RoutesConfig.map(({ path, component: Component }, index) => (
            <Route key={index} path={path} element={<Component />} />
          ))}
        </Route>

        {/* User dashboard route */}
        <Route
          path="/landingPage/"
          element={
            <ProtectedRoute element={<LandingPage />} />
          }
        />

        <Route path="/" element={<LandingPage />} />
        <Route path="/profilPreference" element={<ProfilePreferences/>} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/foods" element={<RestaurantDetail />} />

      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
