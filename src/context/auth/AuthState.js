import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
  PASSWORD_RESET_EMAIL,
  EMAIL_MATCH_FAIL,
  EMAIL_MATCH_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_FAIL,
  SET_LOADING,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
    loading: false,
    user: null,
    error: null,
    success: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load User
  const loadUser = async () => {
    setLoading();
    try {
      const res = await axios.get('/api/auth/me');
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register User
  const register = async (userData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setLoading();

    try {
      const res = await axios.post('/api/auth/register', userData, config);

      dispatch({ type: REGISTER_SUCCESS });
      loadUser();
    } catch (err) {
      let message = err.response.data.error;
      if (message === 'Duplicate field value entered') {
        message = 'A user already exists with that email';
      }
      dispatch({ type: REGISTER_FAIL, payload: message });
    }
  };

  // Login User
  const login = async (credentials) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setLoading();
    try {
      const res = await axios.post('/api/auth/login', credentials, config);

      dispatch({ type: LOGIN_SUCCESS });
      loadUser();
    } catch (err) {
      let message = err.response.data.error;
      dispatch({ type: LOGIN_FAIL, payload: message });
    }
  };

  // Logout (Clear Token)
  const logout = async () => {
    setLoading();
    try {
      const res = await axios.get('/api/auth/logout');
      dispatch({ type: LOGOUT });
    } catch (err) {
      console.log('Logout Failed');
    }
  };

  const updatePassword = async (passwords) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setLoading();

    try {
      const res = await axios.put(
        '/api/user/updatepassword',
        passwords,
        config
      );

      let successMessage = 'User details updated successfully!';

      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: successMessage });
    } catch (err) {
      let message = err.response.data.error;
      dispatch({ type: UPDATE_PASSWORD_FAIL, payload: message });
    }
  };

  const updateDetails = async (details) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    setLoading();
    try {
      const res = await axios.put('/api/user/updatedetails', details, config);

      let successMessage = 'User details updated successfully!';

      dispatch({ type: UPDATE_DETAILS_SUCCESS, payload: successMessage });
    } catch (err) {
      let message = err.response.data.error;
      dispatch({ type: UPDATE_DETAILS_FAIL, payload: message });
    }
  };

  // Forgot Password
  const forgotPassword = async (email) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setLoading();
    try {
      const res = await axios.post('/api/auth/forgotpassword', email, config);

      let successMessage =
        'Reset password link sent to your email. Please follow the instructions given there!';
      dispatch({ type: EMAIL_MATCH_SUCCESS, payload: successMessage });
    } catch (err) {
      let message = err.response.data.error;
      dispatch({ type: EMAIL_MATCH_FAIL, payload: message });
    }
  };

  const resetPassword = async (resetPasswordToken, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setLoading();

    try {
      const res = await axios.put(
        `/api/auth/resetpassword/${resetPasswordToken}`,
        password,
        config
      );

      dispatch({ type: RESET_PASSWORD_SUCCESS });
    } catch (err) {
      let message = err.response.data.error;
      dispatch({ type: RESET_PASSWORD_FAIL, payload: message });
    }
  };

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };
  // Clear Success
  const clearSuccess = () => {
    dispatch({ type: CLEAR_SUCCESS });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        success: state.success,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        clearSuccess,
        forgotPassword,
        resetPassword,
        setLoading,
        updateDetails,
        updatePassword,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
