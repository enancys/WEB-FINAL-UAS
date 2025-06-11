import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/adminDashboard.js';
// import UserDashboard from './pages/user/UserDashboard';
import LoginPage from './pages/auth/LoginPage';
import RoutesConfig from './RoutesConfig.js';
import LandingPage from './pages/user/LandingPage.js';
import RegisterPage from './pages/auth/RegisterPage.js';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext, AuthProvider } from './contexts/AuthContext'; 
import ProfilePreferences from './pages/user/ProfilePreferences.js';
import RestaurantDetail from './components/user/Restaurant/RestaurantDetail.js';
import FoodPrefrencesList from './components/FoodPreferencesList.js';
import { useContext, useEffect, useState } from 'react';
import AboutMePage from './pages/user/AboutMePage.js';
import RestaurantPage from './pages/user/RestaurantPage.js';
import AccountSetting from './pages/user/accountSetting/AccountSetting.js';
import SellerSetting from './pages/user/sellerSetting/SellerSetting.js';


const AppRoutes = () => {

  const { user } = useContext(AuthContext);
  const [userPreferenceId, setUserPreferenceId] = useState(null);

  useEffect(()=> {
      if(user && user.user_preference_id) {
        setUserPreferenceId(user.user_preference_id);
      }
  }, [user]);

  console.log("test", userPreferenceId);
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

        <Route path='/aboutMe' element= {<AboutMePage/>} />

        <Route path="/" element={<LandingPage />} />
        <Route path="/profile_preference" element={<ProfilePreferences/>} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        {/* <Route path="/foods" element={<FoodPrefrencesList id={user.user_preference_id} />} /> */}
        <Route path="/foods" 
              element={ <FoodPrefrencesList id={userPreferenceId}/>} />
        <Route path="/restaurants" 
              element={ <RestaurantPage/>} />
        <Route path="/account_settings/:id" 
              element={ <AccountSetting/>} />
        <Route path="/seller_settings" 
              element={ <SellerSetting/>} />



      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
