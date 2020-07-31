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
  EMAIL_MATCH_SUCCESS,
  EMAIL_MATCH_FAIL,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_DETAILS_SUCCESS,
  UPDATE_DETAILS_FAIL,
  SET_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload.data,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };

    case UPDATE_DETAILS_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload,
        loading: false,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case EMAIL_MATCH_SUCCESS:
      return {
        ...state,
        success: action.payload,
        loading: false,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    // authenticated-related errors
    case UPDATE_DETAILS_FAIL:
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    // unauthenticated failures
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case EMAIL_MATCH_FAIL:
    case RESET_PASSWORD_FAIL:
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case CLEAR_SUCCESS:
      return {
        ...state,
        success: null,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
