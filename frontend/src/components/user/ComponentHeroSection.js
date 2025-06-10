import React, { useContext, useEffect, useState } from 'react';
import './HeroSection.css';
import bgHero from './../../assets/heroBackground_images.jpg';
import { AuthContext } from '../../contexts/AuthContext';

const ComponentHeroSection = () => {

  const { user } = useContext(AuthContext);
  const [userPreferenceId, setUserPreferenceId] = useState(null);
  const isLoggedIn = Boolean(user);
  console.log('apakah : ', Boolean(user));

  useEffect(() => {
    if (user && user.user_preference_id) {
      setUserPreferenceId(user.user_preference_id);
    }
  }, [user]);

  return (

    <section className="hero-section d-flex align-items-center bg-dark text-white py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-center mb-4 mb-md-0">
            <div className="phone-mockup">
              <img
                src={bgHero}
                alt="Phone Mockup"
                className="img-fluid phone-img"
              />
            </div>
          </div>

          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-5 fw-bold">
              Find Your Perfect <br /><span className="text-gradient">FOOD MATCH</span>
            </h1>
            {isLoggedIn ? (
              <a href="/profile_preference" className="btn btn-primary btn-lg px-4">
                Set Preference Now
              </a>
            ) : (
              <a href="#" className="btn btn-primary btn-lg px-4">
                Register Now
              </a>
            )}
            <p className="lead mt-3 mb-4">
              Enjoy the best experience in choosing your favorite food.
              Find recommendations that suit your taste and lifestyle.
            </p>

            <p className="mt-3  text-light">
              Food recommendations according to your taste, starting <strong>Now</strong>
            </p>
          </div>
        </div>
      </div>

    </section>
    // <section className="hero-section d-flex align-items-center">
    //   <div className="container">
    //     <div className="row align-items-center">
    //       <div className="col-md-6 text-center text-md-start">
    //       <h1 className="fw-bold"><br />Temukan Rekomendasi Makanan Terbaik!</h1>
    //       <p className="lead text-muted">Daftarkan dirimu untuk mulai menerima rekomendasi makanan sesuai seleramu</p>
    //         <a href="/register" className="btn btn-dark btn-lg rounded-pill px-4">Daftar Sekarang</a>
    //       </div>
    //       <div className="col-md-6 text-center">
    //         <img src="/img/hero-images.png" alt="Hero" className="img-fluid hero-image" />

    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default ComponentHeroSection;
