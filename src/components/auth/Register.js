import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  // run once only (on page 1st reload)
  useEffect(() => {
    authContext.loadUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/home');
    }
    if (error === 'A user already exists with that email') {
      setAlert(error, 'danger');
      clearErrors();
    }

    // eslint-disable-next-line
  }, [error, isAuthenticated, authContext, props.history]);

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [password2, setPassword2] = useState('');

  const { firstName, lastName, email, password } = user;

  const onChange = (e) => {
    if (e.target.name === 'password2') {
      setPassword2(e.target.value);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === ''
    ) {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register(user);
    }
  };

  return (
    <div id='register-page' className='wrapper animated fadeIn'>
      <div className='reg-form-container wrapper animated slideInUp '>
        <p className='reg-form-heading'>
          Sign Up <i className='lock fas fa-address-card'></i>
        </p>
        <form className='reg-form' onSubmit={onSubmit}>
          <div className='first-second-name-cont'>
            <div className='reg-name-group'>
              <label htmlFor='firstName'>First Name</label>
              <input
                type='text'
                name='firstName'
                value={firstName}
                onChange={onChange}
              />
            </div>
            <div className='reg-name-group'>
              <label htmlFor='lastName'>Last Name</label>
              <input
                type='text'
                name='lastName'
                value={lastName}
                onChange={onChange}
              />
            </div>
          </div>
          <div className='reg-email-group'>
            <label htmlFor='email'>Email Address</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='reg-pass-form-group'>
            <label htmlFor='password'>Create a Password</label>
            <input
              placeholder='Minimum of 6 characters'
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              minLength='6'
            />
          </div>
          <div className='reg-pass-form-group'>
            <label htmlFor='password2'>Confirm Password</label>
            <input
              placeholder='Minimum of 6 characters'
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              min='6'
            />
          </div>
          <div className='reg-final-group'>
            <div className='reg-btn-form-group'>
              <p className='auth-p'>
                Already have an account?{' '}
                <Link className='auth-form-link' to='/login'>
                  Login here
                </Link>
              </p>
            </div>
            <div className='reg-btn-form-group'>
              <input type='submit' value='Sign Up' />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
