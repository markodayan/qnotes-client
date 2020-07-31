import React, { useContext, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';

import ViewContext from '../../context/view/viewContext';
import AuthContext from '../../context/auth/authContext';
import PostContext from '../../context/post/postContext';

const SideNav = () => {
  const htmlBody = document.querySelector('body');
  const sideNavElement = document.querySelector('.side-nav-container');
  const sideNavList = document.querySelector('.side-nav-list');

  const viewContext = useContext(ViewContext);
  const authContext = useContext(AuthContext);
  const postContext = useContext(PostContext);
  const { sideNav, toggleSideNav } = viewContext;
  const { clearPosts } = postContext;
  const { isAuthenticated, logout, user } = authContext;

  useEffect(() => {
    if (sideNav) {
      console.log('sideNav open');
      htmlBody.classList.add('body-scroll-disable');
      sideNavElement.classList.add('side-nav-open');
    }
  }, [sideNav, viewContext]);

  const backdropHandler = () => {
    htmlBody.classList.remove('body-scroll-disable');
    sideNavElement.classList.remove('side-nav-open');
    toggleSideNav();
  };

  const closeSideNav = () => {
    htmlBody.classList.remove('body-scroll-disable');
    sideNavElement.classList.remove('side-nav-open');
    toggleSideNav();
  };

  const onLogout = () => {
    closeSideNav();
    logout();
    clearPosts();
  };

  return (
    <Fragment>
      {sideNav && (
        <div onClick={backdropHandler} className='side-nav-backdrop'></div>
      )}
      <nav className='side-nav-container'>
        <ul
          className={
            isAuthenticated
              ? 'side-nav-list side-nav-logged-in-flex'
              : 'side-nav-list'
          }
        >
          <li className=' side-nav-title' onClick={closeSideNav}>
            <Link to='/'>Q </Link>
          </li>
          {!isAuthenticated ? (
            <Fragment>
              <li className='side-nav-no-auth-link' onClick={closeSideNav}>
                <Link to='/login'>Login</Link>
              </li>
              <li className='side-nav-no-auth-link' onClick={closeSideNav}>
                <Link to='/register'>Sign Up</Link>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              {user && (
                <Fragment>
                  <li className='side-nav-auth-link side-nav-profile username'>
                    {user.firstName} {user.lastName}
                  </li>
                  <li className='side-nav-auth-link side-nav-profile'>
                    {user.email}
                  </li>
                  <li className='side-nav-auth-link' onClick={closeSideNav}>
                    <Link to='/updatedetails'>Update Details</Link>
                  </li>
                  <li className='side-nav-auth-link' onClick={closeSideNav}>
                    <Link to='/updatepassword'>Update Password</Link>
                  </li>
                </Fragment>
              )}
              <li className='side-nav-auth-link' onClick={onLogout}>
                <Link to='#!'>Logout</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};

export default SideNav;
