import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Reset.css';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Reset = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert, alerts } = alertContext;
  const { error, clearErrors, resetPassword } = authContext;

  const { resetPasswordToken } = useParams();

  const [passwordFields, setPasswordFields] = useState({
    password1: '',
    password2: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }

    if (passwordFields.password1 !== passwordFields.password2) {
      setAlert('The passwords entered do not match!', 'danger');
    } else {
      resetPassword(resetPasswordToken, { password: passwordFields.password1 });

      if (alerts.length === 0) {
        setAlert('Password reset successful! Please try login', 'success');
        props.history.push('/login');
      }
    }

    setPasswordFields({
      password1: '',
      password2: '',
    });
  };

  const onChange = (e) => {
    setPasswordFields({ ...passwordFields, [e.target.name]: e.target.value });
  };

  return (
    <section className='reset-password-container wrapper animated fadeIn'>
      <form className='rp-form wrapper animated slideInUp' onSubmit={onSubmit}>
        <h1 className='rp-title'>Password Reset</h1>
        <h5 className='rp-sub-title'>
          Please enter a new password and try to remember this one ;)
        </h5>
        <label className='rp-password-label' htmlFor='password1'>
          Enter new password:
        </label>
        <input
          className='rp-password-input'
          type='password'
          placeholder='New password'
          name='password1'
          value={passwordFields.password1}
          onChange={onChange}
        />
        <label className='rp-password-label' htmlFor='password2'>
          Confirm password:
        </label>
        <input
          className='rp-password-input'
          type='password'
          placeholder='Confirm new password'
          name='password2'
          value={passwordFields.password2}
          onChange={onChange}
        />
        <input type='submit' className='rp-submit' value='Update Password' />
      </form>
    </section>
  );
};

export default Reset;
