import React, { useEffect, useState } from 'react';
import ComponentNavbar from '../../components/user/ComponentNavbar';
import ComponentFooter from '../../components/user/ComponentFooter';
import ComponentHeroSection from '../../components/user/ComponentHeroSection';
import FoodList from '../../components/FoodList';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true'); 
  }, []);

  return (
    <div>
      <ComponentNavbar />
      <ComponentHeroSection />

      <header className="bg-light py-5 text-center">
        <div className="container">
          <h1 className="display-4">Temukan Rekomendasi Makanan Terbaik</h1>
          <p className="lead">Sesuaikan dengan selera, alergi, dan preferensimu!</p>
          {isLoggedIn ? (
            <p>Selamat datang kembali!</p>
          ) : (
            <a href="/login" className="btn btn-primary btn-lg mt-3">Mulai Sekarang</a>
          )}
        </div>
      </header>

      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="mb-4 text-center">Rekomendasi Makanan</h2>
          <FoodList /> 
        </div>
      </section>

      <ComponentFooter />
    </div>
  );
};

export default LandingPage;
