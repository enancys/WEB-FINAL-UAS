import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak sama.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          role: formData.role
        })
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess('Registrasi berhasil! Silakan login.');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(result.message || 'Terjadi kesalahan saat registrasi.');
      }
    } catch (err) {
      setError('Gagal menghubungi server.');
    }
  };

  return (
    <section className="page-wrapper">
      <div className="page-content">
        <div className='container-fluid h-custom'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col-md-9 col-lg-6 col-xl-5'>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample"
              />
            </div>
            <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className='d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-3'>
                  <p className='lead fw-normal mb-0 me-3'>Register with</p>
                  <button type='button' className="btn btn-primary btn-floating mx-1">
                    <i className='fab fa-facebook-f'></i>
                  </button>
                  <button type='button' className='btn btn-primary btn-floating mx-1'>
                    <i className='fab fa-twitter'></i>
                  </button>
                  <button type='button' className='btn btn-primary btn-floating mx-1'>
                    <i className='fab fa-linkedin-in'></i>
                  </button>
                </div>

                <div className='divider d-flex align-items-center my-4'>
                  <p className='text-center fw-bold mx-3 mb-0'>Or</p>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control form-control-lg"
                    placeholder="Enter Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="name">Full Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="email">Email address</label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>

                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                  >
                    Register
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <span>Sudah punya akun? </span>
                  <Link to="/login" className="text-decoration-none text-primary">
                    Login di sini
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer bg-primary text-white py-4 px-4 px-xl-5">
        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between">
          <div className="mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
          <div>
            <a href="#!" className="text-white me-4"><i className="fab fa-facebook-f"></i></a>
            <a href="#!" className="text-white me-4"><i className="fab fa-twitter"></i></a>
            <a href="#!" className="text-white me-4"><i className="fab fa-google"></i></a>
            <a href="#!" className="text-white"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default RegisterPage;
