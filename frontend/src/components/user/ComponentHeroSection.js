import React from 'react';
import './HeroSection.css';

const ComponentHeroSection = () => {
  return (
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
            <h1 className="fw-bold"><br />Temukan Rekomendasi Makanan Terbaik!</h1>
            <p className="lead text-muted">Daftarkan dirimu untuk mulai menerima rekomendasi makanan sesuai seleramu</p>
              <a href="/register" className="btn btn-dark btn-lg rounded-pill px-4">Daftar Sekarang</a>
            </div>
            <div className="col-md-6 text-center">
              <img src="/img/hero-images.png" alt="Hero" className="img-fluid hero-image" />

            </div>
          </div>
        </div>
      </section>
  );
};

export default ComponentHeroSection;
