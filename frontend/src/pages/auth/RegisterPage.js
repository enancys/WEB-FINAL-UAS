import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

    <section className='vh-100'>
      <div className='container-fluid h-custom'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-md-9 col-lg-6 col-xl-5'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid" alt="Sample image"/>
          </div>
          <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
          <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
              <div className='d-flex flex-row align-items-center justify-content-center justify-content-lg-start'>
                <p className='lead fw-normal mb-0 me-3'>Register with</p>
                
                <button type='button' data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                  <i className='fab fa-facebook-f'></i>
                </button>

                <button type='button' data-mdb-button-init data-mdb-ripple-init className='btn btn-primary btn-floating mx-1'>
                  <i className='fab fa-twitter'></i>
                </button>

                <button type='button' data-mdb-button-init data-mdb-ripple-init className='btn btn-primary'>
                  <i className='fab fa-linkedin-in'></i>
                </button>
              </div>

              <div className='divider d-flex align-items-center my-4'>
                <p className='text-center fw-bold mx-3 mb-0'>Or</p>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
              <input type="text"
                  id="form3Example3"
                  name="name"
                  className="form-control form-control-lg"
                  placeholder="Enter Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
              <input type="email"
                  id="form3Example3"
                  name="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />

                <label className="form-label" htmlFor="form3Example3">Email address</label>
              </div>

              <div data-mdb-input-init className="form-outline mb-3">
              <input
                type="password"
                id="form3Example4"
                name="password"
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
                <label className="form-label" htmlFor="form3Example4">Password</label>
              </div>

              <div data-mdb-input-init className="form-outline mb-3">
              <input
                type="password"
                id="form3Example4"
                name="confirmPassword"
                className="form-control form-control-lg"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
                <label className="form-label" htmlFor="form3Example4">Confirm Password</label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
          <button
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-lg"
            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
          >
            Register
          </button>
          </div>

            </form>
          </div>
        </div>
      </div>

      <div
    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
    <div className="text-white mb-3 mb-md-0">
      Copyright © 2020. All rights reserved.
    </div>

    <div>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-google"></i>
      </a>
      <a href="#!" className="text-white">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>
    </section>
    // <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
    //   <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '450px' }}>
    //     <h2 className="text-center mb-4">Daftar Akun</h2>
    //     { error && <div className="alert alert-danger">{error}</div> }
    //     { success && <div className="alert alert-success">{success}</div> }
    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-3">
    //         <label htmlFor="name" className="form-label">Nama Lengkap</label>
    //         <input 
    //           type="text" 
    //           className="form-control" 
    //           id="name" 
    //           name="name"
    //           value={formData.name}
    //           onChange={handleChange}
    //           required 
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="email" className="form-label">Email</label>
    //         <input 
    //           type="email" 
    //           className="form-control" 
    //           id="email" 
    //           name="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //           required 
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="password" className="form-label">Password</label>
    //         <input 
    //           type="password" 
    //           className="form-control" 
    //           id="password" 
    //           name="password"
    //           value={formData.password}
    //           onChange={handleChange}
    //           required 
    //         />
    //       </div>
    //       <div className="mb-3">
    //         <label htmlFor="confirmPassword" className="form-label">Konfirmasi Password</label>
    //         <input 
    //           type="password" 
    //           className="form-control" 
    //           id="confirmPassword" 
    //           name="confirmPassword"
    //           value={formData.confirmPassword}
    //           onChange={handleChange}
    //           required 
    //         />
    //       </div>
    //       <button type="submit" className="btn btn-success w-100">Daftar</button>
    //     </form>

    //     <div className="text-center mt-3">
    //       <span>Sudah punya akun? </span>
    //       <Link to="/login" className="text-decoration-none text-primary">
    //         Login di sini
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default RegisterPage;
