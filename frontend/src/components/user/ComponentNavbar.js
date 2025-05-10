import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; 

const ComponentNavbar = () => {
  const { user, logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bolder" to="/">🍽️ WannaEAT</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Beranda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Tentang</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/foods">Makanan</Link>
            </li>
            <li className="nav-item">
              {user ? (
                <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <Link className="btn btn-outline-primary ms-2" to="/login">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default ComponentNavbar;
