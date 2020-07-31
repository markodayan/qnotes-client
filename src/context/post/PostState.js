import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import PostContext from './postContext';
import postReducer from './postReducer';
import {
  ADD_POST,
  DELETE_POST,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_POSTS,
  UPDATE_POST,
  FILTER_SUBJECTS,
  CLEAR_FILTER,
  GET_POSTS,
  POST_ERROR,
  SET_LOADING,
  CLEAR_ERRORS,
  CLEAR_SUCCESS,
} from '../types';

const PostState = (props) => {
  const initialState = {
    posts: [],
    current: null,
    error: null,
    loading: true,
    addPostOpen: false,
    success: null,
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  // Get Posts
  const getPosts = async () => {
    try {
      const res = await axios.get('/posts');
      dispatch({ type: GET_POSTS, payload: res.data.data });
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.error });
    }
  };

  // Add Post
  const addPost = async (post) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setLoading();

    try {
      const res = await axios.post('/posts', post, config);
      clearCurrent();
      dispatch({ type: ADD_POST, payload: res.data.post });
    } catch (err) {
      let message = err.response.data.error;
      // let message = 'Please fill in all required fields';
      dispatch({ type: POST_ERROR, payload: message });
    }
  };

  // Delete Post
  const deletePost = async (id) => {
    setLoading();
    try {
      const res = await axios.delete(`posts/${id}`);
      dispatch({ type: DELETE_POST, payload: id });
    } catch (err) {
      let message = err.response.data.error;
      dispatch({ type: POST_ERROR, payload: message });
    }
  };

  // Set Current Post
  const setCurrent = (post) => {
    dispatch({ type: 'SET_CURRENT', payload: post });
  };

  // Clear Current Post
  const clearCurrent = (post) => {
    dispatch({ type: 'CLEAR_CURRENT' });
  };
  // Update Post
  const updatePost = async (post) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    setLoading();

    try {
      const res = await axios.put(`/posts/${post._id}`, post, config);
      clearCurrent();
      dispatch({ type: UPDATE_POST, payload: res.data.post });
    } catch (err) {
      dispatch({ type: POST_ERROR, payload: err.response.data.error });
    }
  };

  // set loading
  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  // Clear Posts (and other Post states to default on Logout)
  const clearPosts = () => {
    dispatch({ type: CLEAR_POSTS });
  };

  // Clear Errors
  const clearErrors = () => {
    console.log('clearing errors?');
    dispatch({ type: CLEAR_ERRORS });
  };
  // Clear Success
  const clearSuccess = () => {
    dispatch({ type: CLEAR_SUCCESS });
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        current: state.current,
        error: state.error,
        success: state.success,
        loading: state.loading,
        addPostOpen: state.addPostOpen,
        addPost,
        getPosts,
        deletePost,
        setCurrent,
        clearCurrent,
        updatePost,
        clearPosts,
        clearErrors,
        clearSuccess,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
