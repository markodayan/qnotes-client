import {
  ADD_POST,
  DELETE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_POST,
  FILTER_SUBJECTS,
  CLEAR_FILTER,
  GET_POSTS,
  POST_ERROR,
  CLEAR_POSTS,
  SET_LOADING,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, , ...state.posts],
        loading: false,
      };

    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        current: null,
        loading: false,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };

    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        current: null,
        error: null,
        loading: true,
      };

    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true,
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

    default:
      return state;
  }
};
