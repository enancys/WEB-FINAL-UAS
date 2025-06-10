import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './navBar.css';

const ComponentNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
console.log("User context data:", user);
console.log("test user", user?.user_preference?.seller);


  return (
    <header className="header shadow-sm" style={{
      background: 'rgba(83,92,170, 0.5)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    }}>
      <Link to="/" className="logo text-light">
        Wanna<span className="highlight">EAT</span>
      </Link>

      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>

      <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>

        <div className="dropdown">
          <span className="nav-link" onClick={toggleDropdown}>Eat?</span>
          <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} style={{
            backgroundColor: '#535caa',
            borderColor: '#434a8a',
            color: 'white'
          }}>
            <li><Link className="dropdown-item" to="/restaurants" onClick={toggleMenu}>Restaurant</Link></li>
            <li><Link className="dropdown-item" to="/foods" onClick={toggleMenu}>Food</Link></li>
            <li><Link className="dropdown-item" to="/profile_preference" onClick={toggleMenu}>Preference</Link></li>
            <li><Link className="dropdown-item" to="/foods" onClick={toggleMenu}>Recommended</Link></li>
          </ul>
        </div>

        <Link to="/aboutMe" onClick={toggleMenu}>About</Link>
        {user ? (
          <div className="user-controls">
            {user?.seller  === true && (
              <Link
                to="/seller-dashboard" 
                className="seller-btn"
                onClick={toggleMenu}
                title="Seller Dashboard"
              >
                <i className="fas fa-store"></i>  
              </Link>
            )}

            <Link
              to="/setting"
              className="user-settings-btn"
              onClick={toggleMenu}
              title="Pengaturan Akun"
            >
              <i className="fas fa-user-cog"></i>
            </Link>

            <button
              className="btn-login"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span className="btn-text">Logout</span>
            </button>
          </div>
        ) : (
          <button className="btn-login" onClick={() => { toggleMenu(); navigate('/login'); }}>
            <i className="fas fa-sign-in-alt"></i>
            <span className="btn-text">Login</span>
          </button>
        )}


      </nav>
    </header>
  );
};

export default ComponentNavbar;
