import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import ComponentFooter from '../../components/user/ComponentFooter';
import './LoginPage.css';
const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(formData.email, formData.password);
    if (user) {
      localStorage.setItem('id', user.id);
      if(user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (

    <section className='vh-100'>
      <div className='container-fluid h-custom'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-md-9 col-lg-6 col-xl-5'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid login-image" alt="Sample image"/>
          </div>
          <div className='col-md-8 col-lg-6 col-xl-4 offset-xl-1'>
          <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
              <div className='d-flex flex-row align-items-center justify-content-center justify-content-lg-start'>
                <p className='lead fw-normal mb-0 me-3'>Sign with</p>
                
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

              <div className="d-flex justify-content-between align-items-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
          <button
            type="submit"
            data-mdb-button-init
            data-mdb-ripple-init
            className="btn btn-primary btn-lg"
            style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
          >
            Login
          </button>
          <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="link-danger">Register</Link> </p>
          </div>

            </form>
          </div>
        </div>
      </div>
      <ComponentFooter/>
    </section>
    // <div className="container">
    //   <form onSubmit={handleSubmit}>
    //     {error && <div>{error}</div>}
    //     <input
    //       type="email"
    //       name="email"
    //       value={formData.email}
    //       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    //       required
    //     />
    //     <input
    //       type="password"
    //       name="password"
    //       value={formData.password}
    //       onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    //       required
    //     />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
  );
};

export default LoginPage;
