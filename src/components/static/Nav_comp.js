import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {AppContext} from '../context/appContext';

const Nav = () => {
    return(
      <AppContext.Consumer>
        {context => (
          <nav className={context.toggles.nav ? "nav open" : "nav"}>
            <ul className="nav__list">
              <li className="nav__item" >
                <Link data-toggle="nav" 
                      onClick={context.toggle} 
                      className="nav__link hide--sml" 
                      to="/">Home</Link>
              </li>
              <li className="nav__item" >
                <Link className="nav__link" 
                      data-toggle="nav" 
                      onClick={context.toggle} 
                      to="/styleguides">StyleGuides</Link>
              </li>
              <li className="nav__item">
                <Link className="nav__link" 
                      data-toggle="nav" 
                      onClick={context.toggle} 
                      to="/about">About</Link>
              </li>
              {context.userData.userIsLoggedIn
                ? <li className="nav__item">
                    <Link className="nav__link" 
                          data-toggle="nav" 
                          onClick={context.toggle} 
                          to="/dashboard">Dashboard</Link>
                  </li>
                : ''}
              {context.userData.userIsLoggedIn
                ? <li className="nav__item">
                    <Link className="nav__link" 
                          data-toggle="nav" 
                          onClick={context.toggle} 
                          to="/alphatools">Alpha Tools</Link>
                  </li>
                : ''}
              <li className="nav__item">
                {context.userData.userIsLoggedIn
                  ? <button type="button" 
                            className="nav__link" 
                            data-toggle="nav" 
                            onClick={context.toggle} 
                            onClick={context.onLogout}><i className="fas fa-lock" />&nbsp;Logout</button>
                  : <Link className="nav__link" 
                          data-toggle="nav" 
                          onClick={context.toggle} 
                          data-toggle="nav" 
                          onClick={context.toggle} 
                          to="/login"><i className="fas fa-unlock" />&nbsp;Login</Link>}
              </li>
            </ul>
            <div className="nav__btn" data-toggle="nav" onClick={context.toggle}>
              <i className="fas fa-bars" />
            </div>
          </nav>
        )}
      </AppContext.Consumer>
    );
}

export default Nav;