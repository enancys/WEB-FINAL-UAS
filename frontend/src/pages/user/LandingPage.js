import React, { useEffect, useState } from 'react';
import ComponentNavbar from '../../components/user/ComponentNavbar';
import ComponentFooter from '../../components/user/ComponentFooter';
import ComponentHeroSection from '../../components/user/ComponentHeroSection';
import RestaurantList from '../../components/user/Restaurant/RestaurantList';

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    console.log('Login Status:', loginStatus);
    setIsLoggedIn(loginStatus === 'true'); 
  }, []);

  return (
    <div>
      <ComponentNavbar />
      <ComponentHeroSection />


  <header className='bg-light py-5 text-center'>
    <div className='container'>
      <h1 className='display-4'>Tentang Website Kami</h1>
      <p className='lead'>
        Website ini dirancang untuk membantu pengguna untuk mencari kuliner berdasrakan preferensi yang user inginkan
      </p>
      <p>
      Kami menggabungkan data kuliner dan sistem rekomendasi
      untuk menyajikan pilihan makanan yang paling sesuai untukmu.
    </p>
    {isLoggedIn ? (
            <a href="/profilPreference" className="btn btn-primary btn-lg mt-3">Atur Preferensi</a>
          ) : (
            <a href="/login" className="btn btn-primary btn-lg mt-3">Mulai Sekarang</a>
          )}
    </div>
  </header>
      {/* <header className="bg-light py-5 text-center">
        <div className="container">
          <h1 className="display-4">Temukan Rekomendasi Makanan Terbaik</h1>
          <p className="lead">Sesuaikan dengan selera, alergi, dan preferensimu!</p>
          {isLoggedIn ? (
            <p>Selamat datang kembali!</p>
          ) : (
            <a href="/login" className="btn btn-primary btn-lg mt-3">Mulai Sekarang</a>
          )}
        </div>
      </header> */}

      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="mb-4 text-center">Rekomendasi Restaurants</h2>
          <RestaurantList /> 
        </div>
      </section>

      <ComponentFooter />
    </div>
  );
};

export default LandingPage;
