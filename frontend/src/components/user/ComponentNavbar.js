import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './navBar.css';

const ComponentNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Tutup menu ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
    if (dropdownOpen) setDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownOpen(prev => !prev);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="header shadow-sm" ref={navbarRef} style={{
      background: 'rgba(83,92,170, 0.5)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    }}>
      <Link to="/" className="logo text-light" onClick={closeAllMenus}>
        Wanna<span className="highlight">EAT</span>
      </Link>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <nav className={`navbar ${isMenuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <Link to="/" onClick={closeAllMenus}>Home</Link>

        <div className="dropdown">
          <span className="nav-link" onClick={toggleDropdown}>
            Eat?
            <i className={`fas ${dropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ marginLeft: '5px' }}></i>
          </span>
          <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''} ${window.innerWidth <= 768 ? 'mobile-dropdown' : ''}`}>
            <li><Link className="dropdown-item" to="/restaurants" onClick={closeAllMenus}>Restaurant</Link></li>
            <li><Link className="dropdown-item" to="/foods" onClick={closeAllMenus}>Food</Link></li>
            <li><Link className="dropdown-item" to="/profile_preference" onClick={closeAllMenus}>Preference</Link></li>
            <li><Link className="dropdown-item" to="/foods" onClick={closeAllMenus}>Recommended</Link></li>
          </ul>
        </div>
        <Link to="/aboutMe" onClick={closeAllMenus}>About</Link>

        {user ? (
          <div className="user-controls">
            {(user?.role === "seller" || user?.role === "admin") && (
              <Link to="/seller_settings" className="seller-btn" onClick={closeAllMenus} title="Seller Dashboard">
                <i className="fas fa-store"></i>
              </Link>
            )}

            <Link to={`/account_settings/${user.id}`} className="user-settings-btn" onClick={closeAllMenus} title="Pengaturan Akun">
              <i className="fas fa-user-cog"></i>
            </Link>

            <button className="btn-login" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span className="btn-text">Logout</span>
            </button>
          </div>
        ) : (
          <button className="btn-login" onClick={() => { closeAllMenus(); navigate('/login'); }}>
            <i className="fas fa-sign-in-alt"></i>
            <span className="btn-text">Login</span>
          </button>
        )}
      </nav>
    </header>
  );
};

export default ComponentNavbar;