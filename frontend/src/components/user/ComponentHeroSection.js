import React from 'react';
import './HeroSection.css';

const ComponentHeroSection = () => {
  return (
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
            <h1 className="fw-bold"><br />Yuk, Atur Sekarang!</h1>
            <p className="lead text-muted">Tentukan preferensi makanan favoritmu</p>
              <a href="/profilPreference" className="btn btn-dark btn-lg rounded-pill px-4">Atur Sekarang</a>
            </div>
            <div className="col-md-6 text-center">
            <img src="/img/hero-img.png" alt="Hero" className="img-fluid hero-image" />
            </div>
          </div>
        </div>
      </section>
  );
};

export default ComponentHeroSection;
