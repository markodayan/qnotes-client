import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UpdateUserDetails.css';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Loader from '../layout/Loader';

const UpdateUserDetails = (props) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { user } = authContext;

  const [detailsFields, setDetailsFields] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const {
    error,
    clearErrors,
    success,
    clearSuccess,
    loading,
    updateDetails,
  } = authContext;
  const { setAlert, alerts } = alertContext;

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
      setDetailsFields({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }

    if (success) {
      setAlert(success, 'success');
      clearSuccess();
      setDetailsFields('');
      props.history.push('/home');
    }
  }, [error, success, authContext]);

  const onChange = (e) => {
    setDetailsFields({ ...detailsFields, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    updateDetails(detailsFields);
  };

  return (
    <div className='uud-container wrapper animated fadeIn'>
      <form onSubmit={onSubmit} className='uud-form wrapper animated slideInUp'>
        <h1 className='uud-title'>Update Username Details</h1>
        <h5 className='uud-sub-title'>
          You can change your username you want to be referred by over here:
        </h5>

        <label className='uud-username-label' htmlFor='firstName'>
          Update First Name:
        </label>
        <input
          className='uud-username-input'
          type='text'
          name='firstName'
          value={detailsFields.firstName}
          onChange={onChange}
        />

        <label className='uud-username-label' htmlFor='lastName'>
          Update Last Name:
        </label>
        <input
          className='uud-username-input'
          type='text'
          name='lastName'
          value={detailsFields.lastName}
          onChange={onChange}
        />

        <label className='uud-username-label' htmlFor='email'>
          Update Email Address:
        </label>
        <input
          className='uud-username-input'
          type='email'
          name='email'
          value={detailsFields.email}
          onChange={onChange}
        />

        <input
          type='submit'
          className='uud-submit'
          value='Update User Details'
        />
      </form>
    </div>
  );
};

export default UpdateUserDetails;
