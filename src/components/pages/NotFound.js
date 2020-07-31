import React, { useState, useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import pulp from './pulp.gif';

import './NotFound.css';

import AuthContext from '../../context/auth/authContext';

const NotFound = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
  }, []);

  return (
    <div className='not-found-page'>
      <div className='nf-container'>
        <div className='nf-title-cont'>
          <h1 className='not-found-title'>Page Not Found!</h1>
          <h3 className='not-found-subtitle'>
            The page you were looking for does not exist or has been removed.
          </h3>

          <Link className='not-found-link' to='/'>
            Return To Home
          </Link>
        </div>
        <div className='nf-img-cont'>
          <img className='not-found-img' src={pulp} alt='Not Found...' />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
