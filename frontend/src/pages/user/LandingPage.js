import React, { useContext } from 'react';
import ComponentNavbar from '../../components/user/ComponentNavbar';
import ComponentFooter from '../../components/user/ComponentFooter';
import ComponentHeroSection from '../../components/user/ComponentHeroSection';
import RestaurantList from '../../components/user/Restaurant/RestaurantList';
import { AuthContext } from '../../contexts/AuthContext';


import bgHero from './../../assets/heroBackground_images.jpg';


const LandingPage = () => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = Boolean(user);
  console.log('apakah : ', Boolean(user));



  return (
    <div>
      <ComponentNavbar />
      <ComponentHeroSection />


      <section
        className="about-section py-5 text-black">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6">
              <h2 className="fw-bold mb-4">About This Website</h2>
              <p className="lead">
                This website is designed to help you discover culinary delights based on your personal preferences.
                By combining smart food data with a recommendation system, we provide personalized food suggestions
                that match your taste and lifestyle — making it easier and more enjoyable to decide what to eat.
              </p>
            </div>

            <div className="col-md-6 text-center">
              <img
                src={bgHero}
                alt="Food illustration"
                className="img-fluid rounded-5 shadow-lg"
                style={{ maxHeight: '350px' }}
              />
            </div>

          </div>
        </div>
      </section>

      <section className="py-5 text-dark">
        <div className="container">
          <div className="card shadow-sm rounded-5">

            <div className="card-body">

              <h2 className="mb-4 text-center text-black">Rekomendasi Restaurants</h2>
              <RestaurantList />
            </div>
          </div>
        </div>
      </section>


      <ComponentFooter />
    </div>
  );
};

export default LandingPage;
