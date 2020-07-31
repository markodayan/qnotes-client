import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Loader from '../layout/Loader';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated, loading } = authContext;

  // run once only (on page 1st reload)
  useEffect(() => {
    authContext.loadUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/home');
    }
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
      setUser({ email: '', password: '' });
    }
  }, [error, authContext, props.history]);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <Fragment>
      {loading && <Loader />}
      <div className='wrapper animated fadeIn' id='login-page'>
        <div className='auth-form-container wrapper animated slideInUp '>
          <p className='form-heading'>
            Sign In<i className='lock fas fa-lock'></i>
          </p>

          <form onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='email'>Email Address</label>
              <input
                placeholder='Enter email'
                type='email'
                name='email'
                value={email}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <div className='password-line'>
                <label htmlFor='password'>Password</label>
                <Link className='auth-form-link' to='/forgotpassword'>
                  Forgot your password?
                </Link>
              </div>

              <input
                placeholder='Enter password'
                type='password'
                name='password'
                value={password}
                onChange={onChange}
              />
            </div>
            <div className='form-group'>
              <input type='submit' className='auth-button' value='Sign In' />
            </div>
            <div className='form-group'>
              <p className='auth-p'>
                Don't have an account?{' '}
                <Link className='auth-form-link' to='/register'>
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
