import React, { useState, useContext, useEffect, Fragment } from 'react';
import './PostForm.css';
import PostContext from '../../context/post/postContext';
import AlertContext from '../../context/alert/alertContext';
import Loader from '../layout/Loader';

const PostForm = () => {
  const htmlBody = document.querySelector('body');
  const pfc = document.querySelector('.post-form-container');

  const postContext = useContext(PostContext);
  const alertContext = useContext(AlertContext);

  const [post, setPost] = useState({
    title: '',
    subject: '',
    body: '',
  });
  const { current, loading, error, clearErrors, setCurrent } = postContext;
  const { setAlert } = alertContext;
  const { title, subject, body } = post;

  useEffect(() => {
    if (current) {
      setPost({
        title: current.title,
        subject: current.subject,
        body: current.body,
        _id: current._id,
      });
    } else {
      setPost({
        title: '',
        subject: '',
        body: '',
      });
    }
  }, [current, postContext]);

  useEffect(() => {
    if (error) {
      pfc.classList.toggle('modal-close'); // keep modal open

      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, postContext]);

  // Will use this for backdrop click of update modal later
  const clearAll = () => {
    postContext.clearCurrent();
  };

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      postContext.addPost(post);
    } else {
      postContext.updatePost(post);
    }

    htmlBody.classList.remove('body-scroll-disable');
    pfc.classList.toggle('modal-close');
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit} className='wrapper animated'>
        <div className='post-form-group'>
          <h1>{!current ? 'Add Post' : 'Edit Post'}</h1>
        </div>
        <div className='title-subject-cont'>
          <div className='post-form-group'>
            <label htmlFor='title'>Title</label>
            <input
              className='post-field-input'
              type='text'
              placeholder=''
              name='title'
              value={title}
              onChange={onChange}
            />
          </div>
          <div className='post-form-group'>
            <label htmlFor='subject'>
              Subject <span>(optional)</span>
            </label>
            <input
              className='post-field-input'
              type='text'
              name='subject'
              placeholder=''
              value={subject}
              onChange={onChange}
            />
          </div>
        </div>

        <div className='post-form-group post-body-extra'>
          <label htmlFor='body'>Body</label>
          <textarea
            className='post-field-input'
            type='text'
            name='body'
            placeholder=''
            value={body}
            onChange={onChange}
          ></textarea>
        </div>
        <div className='post-form-btn-group'>
          {current && (
            <button className='clear-form-btn' onClick={clearAll}>
              Clear
            </button>
          )}
          {!current ? (
            <input
              type='submit'
              id='add-btn'
              className='post-form-btn'
              value='Add Post'
            />
          ) : (
            <input
              type='submit'
              id='update-btn'
              className='post-form-btn'
              value='Update Post'
            />
          )}
        </div>
      </form>
    </Fragment>
  );
};

export default PostForm;
