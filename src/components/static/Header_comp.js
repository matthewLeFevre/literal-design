import React, { Component } from 'react';
import Nav from './Nav_comp';

class Header extends Component {
  render() {
    return(
      <header className="header">
        
        <span className="mdm txt-light logo">{this.props.userIsLoggedIn ? this.props.userData.userName : 'Literal Design'}<i className="logo__icon fas fa-vector-square"></i>
        </span>
        <Nav userData={this.props.userData} userIsLoggedIn={this.props.userIsLoggedIn}/>
      </header>
    );
  }
}

export default Header;