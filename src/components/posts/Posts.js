import React, { useContext, Fragment, useEffect } from 'react';
import PostContext from '../../context/post/postContext';
import AuthContext from '../../context/auth/authContext';
import PostItem from './PostItem';
import './Posts.css';
import Loader from '../layout/Loader';

const Posts = () => {
  const postContext = useContext(PostContext);
  // const authContext = useContext(AuthContext);
  // const { loading } = authContext;
  const { posts, getPosts, loading } = postContext;

  useEffect(() => {
    getPosts();
  }, []);

  const loadedContent =
    posts.length !== 0 ? (
      <ul className='posts-list wrapper animated fadeIn'>
        {posts.map((post) => {
          return <PostItem post={post} key={post._id} />;
        })}
      </ul>
    ) : (
      <div className='empty-post-container'>
        <i class='fas fa-clipboard'></i>
        <p className='empty-writing'>I find your lack of notes disturbing...</p>
      </div>
    );

  return loading ? (
    <div className='posts-container'>
      <Loader />
    </div>
  ) : (
    <div className='posts-container'>{loadedContent}</div>
  );
};

export default Posts;
