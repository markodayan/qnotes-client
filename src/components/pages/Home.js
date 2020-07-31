import React, {
  useContext,
  useEffect,
  useState,
  Fragment,
  useRef,
  Children,
} from 'react';
import './Home.css';
import Posts from '../posts/Posts';
import PostForm from '../posts/PostForm';
import Search from '../search/Search';

import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';
import DeletePostModal from '../modals/DeletePostModal';

const Home = (props) => {
  const htmlBody = document.querySelector('body');
  const addPostBtn = document.querySelector('.add-post-btn');
  const pfc = document.querySelector('.post-form-container');
  const pf = document.querySelector('.post-form-container form');

  const dpmContainer = document.querySelector('.dpm-container');
  const dpmForm = document.querySelector('.dpm-card');

  const postContext = useContext(PostContext);
  const authContext = useContext(AuthContext);
  const { loadUser, logout, isAuthenticated } = authContext;

  useEffect(() => {
    loadUser();
  }, []);

  const addBtnHandler = (e) => {
    htmlBody.classList.add('body-scroll-disable');
    pfc.classList.toggle('modal-close');
    pfc.classList.add('fadeIn');
    pf.classList.add('fadeInUp');
  };

  const pfcHandler = (e) => {
    // if clicked region contains form element it is outside the form (the container) hence if form not contained the click is from within the form
    if (!e.target.contains(pf)) {
      console.log('inside form');
    } else {
      pfc.classList.toggle('modal-close');
      htmlBody.classList.remove('body-scroll-disable');
      console.log('removes scroll disable');
      // important! - clears the fields and the form state
      clearAll();
    }
  };

  const dpmHandler = (e) => {
    if (!e.target.contains(dpmForm)) {
      console.log('inside form');
    } else {
      dpmContainer.classList.toggle('dpm-closed');
      htmlBody.classList.remove('body-scroll-disable');
      postContext.clearCurrent();
    }
  };

  // Will use this for backdrop click of update modal later
  const clearAll = () => {
    postContext.clearCurrent();
  };

  return (
    <Fragment>
      <div
        onClick={dpmHandler}
        className='dpm-container dpm-closed wrapper animated'
      >
        <DeletePostModal />
      </div>
      <div id='home-page'>
        {/* <Search /> */}

        <div
          onClick={pfcHandler}
          className='post-form-container wrapper animated modal-close'
        >
          <PostForm />
        </div>

        <Posts />
        <button onClick={addBtnHandler} className='add-post-btn'>
          <i className='fas fa-plus add-icon'></i>
        </button>
      </div>
    </Fragment>
  );
};

export default Home;
