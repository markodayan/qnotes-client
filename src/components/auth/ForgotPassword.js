import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Loader from '../layout/Loader';

const ForgotPassword = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert, alerts } = alertContext;
  const {
    error,
    clearErrors,
    forgotPassword,
    success,
    clearSuccess,
    loading,
  } = authContext;
  var t1;
  var t2;
  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
      setEmail('');
    }

    if (success) {
      setAlert(success, 'success');
      clearSuccess();
      setEmail('');
      props.history.push('/login');
    }
  }, [error, success, authContext]);

  const [email, setEmail] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    forgotPassword({ email });
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <section className='forgot-password-container wrapper animated fadeIn'>
      {loading && <Loader />}
      <form className='fp-form wrapper animated slideInUp' onSubmit={onSubmit}>
        <h1 className='fp-title'>Forgot Your Password?</h1>
        <h5 className='fp-sub-title'>
          Not a problem it happens to the best of us, enter your email and we
          will email you instructions for a quick password reset :)
        </h5>
        <label className='fp-email-label' htmlFor='email'>
          Enter email:
        </label>
        <input
          className='fp-email-input'
          type='email'
          placeholder='Enter email address'
          name='email'
          value={email}
          onChange={onChange}
        />
        <input type='submit' className='fp-submit' value='Send Reset Link' />
      </form>
    </section>
  );
};

export default ForgotPassword;
