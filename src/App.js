import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import SideNav from './components/layout/SideNav';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import Reset from './components/auth/Reset';

import About from './components/pages/About';
import Landing from './components/pages/Landing';
import Posts from './components/posts/Posts';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import UpdatePassword from './components/pages/UpdatePassword';
import UpdateUserDetails from './components/pages/UpdateUserDetails';
import PrivateRoute from './components/routing/PrivateRoute';
import Alerts from './components/layout/Alerts';

// Context Providers
import PostState from './context/post/PostState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import ViewState from './context/view/ViewState';

function App() {
  return (
    <ViewState>
      <AuthState>
        <PostState>
          <AlertState>
            <Router>
              <Fragment>
                <div className='container'>
                  <Navbar />
                  <SideNav />
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/home' component={Home} />
                    <PrivateRoute
                      exact
                      path='/updatepassword'
                      component={UpdatePassword}
                    />
                    <PrivateRoute
                      exact
                      path='/updatedetails'
                      component={UpdateUserDetails}
                    />
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route
                      exact
                      path='/reset/:resetPasswordToken'
                      component={Reset}
                    />
                    <Route
                      exact
                      path='/forgotpassword'
                      component={ForgotPassword}
                    />
                    <Route exact path='/about' component={About} />
                    <Route path='/' component={Landing} />
                  </Switch>
                </div>
                <div className='landing-footer'>
                  <p>
                    Created by{' '}
                    <a href='https://www.odayan.tech' target='_blank'>
                      Mark Odayan
                    </a>
                  </p>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </PostState>
      </AuthState>
    </ViewState>
  );
}

export default App;
