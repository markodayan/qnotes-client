import React, { useContext, Fragment, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import PostContext from '../../context/post/postContext';
import ViewContext from '../../context/view/viewContext';

const Navbar = (props) => {
  const loginLink = document.querySelector('.nav-login');
  const registerLink = document.querySelector('.nav-register');

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const postContext = useContext(PostContext);
  const viewContext = useContext(ViewContext);

  const { logout, isAuthenticated, user } = authContext;
  const { clearPosts } = postContext;
  const { sideNav, toggleSideNav } = viewContext;

  const onLogout = () => {
    logout();
    clearPosts();
  };

  const sideNavHandler = () => {
    toggleSideNav();
  };

  return (
    <nav id='navbar'>
      <div className='nav-menu'>
        <div className='side-nav-menu-button' onClick={sideNavHandler}>
          <i className='fas fa-bars'></i>
        </div>
        <Link className='nav-brand' to='/'>
          Q
        </Link>
      </div>
      <div className='nav-extra'>
        {isAuthenticated ? (
          <ul className='nav-extra-list'>
            <li className='user-name'>
              {user && (
                <Fragment>
                  <span className='nav-logged-in-settings'>
                    <i className='fas fa-caret-down username-caret'></i>
                    {user.firstName} {user.lastName}
                  </span>
                </Fragment>
              )}
              <ul className='dropdown'>
                <Link to='/updatedetails'>
                  <li className='dropdown-tab-item'>Update Details</li>
                </Link>
                <Link to='/updatepassword'>
                  <li className='dropdown-tab-item'>Update Password</li>
                </Link>
              </ul>
            </li>
            <li className='nav-logged-in-settings' onClick={onLogout}>
              Logout
            </li>
          </ul>
        ) : (
          <Fragment>
            <div className='no-auth-list'>
              <Link className='no-auth-link' to='/login'>
                LOGIN
              </Link>
              <Link className='no-auth-link nav-register-link' to='/register'>
                SIGN UP
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
