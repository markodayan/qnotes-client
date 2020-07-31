import React, { useContext, useState, useEffect } from 'react';
import PostContext from '../../context/post/postContext';
import './PostItem.css';
import moment from 'moment';

const PostItem = ({ post }) => {
  const htmlBody = document.querySelector('body');
  const pfc = document.querySelector('.post-form-container');
  const pfcForm = document.querySelector('.post-form-container form');
  const dpmContainer = document.querySelector('.dpm-container');
  const dpmForm = document.querySelector('.dpm-form');

  const postContext = useContext(PostContext);
  const { title, subject, body, createdAt } = post;
  const date = moment(createdAt).calendar();
  const explicitDate = moment(createdAt).format('LLL');

  const delPost = () => {
    htmlBody.classList.add('body-scroll-disable');
    dpmContainer.classList.toggle('dpm-closed');
    postContext.setCurrent(post);
    dpmContainer.classList.add('fadeIn');
  };

  const getPost = () => {
    htmlBody.classList.add('body-scroll-disable');
    pfc.classList.toggle('modal-close');
    postContext.setCurrent(post);
    pfcForm.classList.add('fadeInUp');
  };

  return (
    <div className='post-item-container'>
      <div className='post-item-head'>
        <div className='post-item-head-options'>
          <i id='pi-del' className=' fas fa-times' onClick={delPost}></i>
          <i id='pi-edit' className='fas fa-pencil-alt' onClick={getPost}></i>
        </div>
        <div className='post-item-head-writing'>
          <div className='post-item-main-title'>
            <h2>{title}</h2>
          </div>

          <div className='post-item-sub-title-container'>
            {subject && <h6 className='post-item-subject'>{subject}</h6>}
            <p className='post-item-date'>{date}</p>
          </div>
        </div>
      </div>
      <div className='post-item-body-container'>
        <p>{body}</p>
      </div>
    </div>
  );
};

export default PostItem;
