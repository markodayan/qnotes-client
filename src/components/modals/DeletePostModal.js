import React, { Fragment, useContext } from 'react';
import './DeletePostModal.css';

import PostContext from '../../context/post/postContext';

const DeletePostModal = () => {
  const htmlBody = document.querySelector('body');
  const dpmContainer = document.querySelector('.dpm-container');
  const dpmForm = document.querySelector('.dpm-form');

  const postContext = useContext(PostContext);
  const { current } = postContext;

  const btnHandler = (e) => {
    console.log('button value test:', e.target.value);
    if (e.target.value === 'delete') {
      console.log('delete post');
      postContext.deletePost(current._id);
      postContext.clearCurrent();
    }

    htmlBody.classList.remove('body-scroll-disable');
    dpmContainer.classList.toggle('dpm-closed');
    postContext.clearCurrent();
  };

  return (
    <section className='enclosure '>
      <div className='dpm-card wrapper animated fadeInUp'>
        <div className='dpm-form '>
          <h1 className='dpm-title'>Delete Post</h1>
          <p className='dpm-body'>
            You are about to delete a post, are you sure you want to do this?
            The contents of the post will not be recoverable
          </p>
        </div>
        <div className='dpm-btn-container'>
          <button className='cancel-delete' onClick={btnHandler} value='cancel'>
            Cancel
          </button>
          <button
            className='delete-post-btn'
            onClick={btnHandler}
            value='delete'
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeletePostModal;
