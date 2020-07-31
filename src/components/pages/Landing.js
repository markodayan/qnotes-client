import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Woman from './woman.jpg';

import './Landing.css';

const Landing = (props) => {
  const loginLink = document.querySelector('.nav-login');
  const registerLink = document.querySelector('.nav-register');

  const authContext = useContext(AuthContext);

  const { login, error, clearErrors, isAuthenticated, loading } = authContext;

  // run once only (on page 1st reload)
  useEffect(() => {
    authContext.loadUser();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/home');
    }
  }, [authContext, props.history]);

  return (
    <section className='landing-page-section wrapper animated fadeIn'>
      <div className='landing-page-container  '>
        <div className='lp-writing  '>
          <h1 className='landing-title'>Q Notes</h1>
          <h4 className='lp-pre-title '>q notes offers</h4>
          <h1 className='lp-main-title'>
            A Simplified Approach to Note Taking on the Web.
          </h1>

          <p className='lp-sub-title'>
            Q Notes is whatever you need it to be and is designed to be easy to
            use. It is completely free, secure and accessible on multiple
            devices.
          </p>
          <Link
            className='lp-get-started wrapper animated slideInUp'
            to='/register'
          >
            GET STARTED NOW
          </Link>
        </div>
        <div className='lp-img-cont'>
          <img className='lp-img' src={Woman} alt='Q Notes' />
        </div>
      </div>
    </section>
  );
};

export default Landing;
