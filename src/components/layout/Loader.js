import React from 'react';
import './Loader.css';
import loader from './loader.gif';
const Loader = () => {
  return (
    <div className='loader-backdrop'>
      <img className='loader' src={loader} alt='Loading...' />
    </div>
  );
};

export default Loader;
