import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './UpdatePassword.css';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Loader from '../layout/Loader';

const UpdatePassword = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    password1: '',
    password2: '',
  });

  const {
    error,
    clearErrors,
    success,
    clearSuccess,
    loading,
    updatePassword,
  } = authContext;
  const { setAlert, alerts } = alertContext;

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
      setPasswordFields({
        currentPassword: '',
        password1: '',
        password2: '',
      });
    }

    if (success) {
      setAlert(success, 'success');
      clearSuccess();
      setPasswordFields({
        currentPassword: '',
        password1: '',
        password2: '',
      });
      props.history.push('/home');
    }
  }, [error, success, authContext]);

  const onChange = (e) => {
    setPasswordFields({ ...passwordFields, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (passwordFields.password1 !== passwordFields.password2) {
      setAlert(
        'Please confirm the new password correctly matches the last input field',
        'danger'
      );
      setPasswordFields({
        currentPassword: '',
        password1: '',
        password2: '',
      });
    } else {
      updatePassword({
        currentPassword: passwordFields.currentPassword,
        newPassword: passwordFields.password1,
      });
    }
  };

  return (
    <div className='up-container wrapper animated fadeIn'>
      <form
        className='up-form wrapper animated slideInUp d'
        onSubmit={onSubmit}
      >
        <h1 className='up-title'>Update Password</h1>
        <h5 className='up-sub-title'>
          Please enter your current password and then your desired new one to
          successfully update the password for your account
        </h5>

        <label className='up-password-label' htmlFor='currentPassword'>
          Enter Current Password:
        </label>
        <input
          className='up-password-input'
          type='password'
          name='currentPassword'
          value={passwordFields.currentPassword}
          onChange={onChange}
        />

        <label className='up-password-label' htmlFor='password1'>
          Enter New Password:
        </label>
        <input
          className='up-password-input'
          type='password'
          name='password1'
          value={passwordFields.password1}
          onChange={onChange}
        />

        <label className='up-password-label' htmlFor='password2'>
          Confirm New Password:
        </label>
        <input
          className='up-password-input'
          type='password'
          name='password2'
          value={passwordFields.password2}
          onChange={onChange}
        />

        <input type='submit' className='up-submit' value='Update Password' />
      </form>
    </div>
  );
};

export default UpdatePassword;
