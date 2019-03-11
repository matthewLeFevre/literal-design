import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Nav from './Nav_comp';
import logo from '../../images/leinary logo.svg';

class Header extends Component {
  render() {
    return(
      <header className="header">
        <div>
          <Link to="/">
            <img className="header__logo" src={logo} alt="Leinary logo"/>
            <span>Leinary</span>
          </Link>
        </div>
        {/* <span className="mdm txt-light logo">{this.props.userData.userIsLoggedIn ? this.props.userData.userName : 'Leinary'}<i className="logo__icon fas fa-vector-square"></i></span> */}
        <Nav/>
      </header>
    );
  }
}

export default Header;