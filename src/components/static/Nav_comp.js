import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: "nav",
      navClosed: "nav",
      navOpened: "nav open",
      navOpen: false,
    }

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    if (this.state.navOpen) {
      this.setState((prevState) => ({
        nav: prevState.navClosed,
        navOpen: !prevState.navOpen,
      }));
    } else {
      this.setState((prevState) => ({
        nav: prevState.navOpened,
        navOpen: !prevState.navOpen,
      }));
    }
  }

  render() {
    return(
      <nav className={this.state.nav}>
        <ul className="nav__list">
          <li className="nav__item" onClick={this.toggleNav}>
            <Link className="nav__link" to="/">Home</Link>
          </li>
          <li className="nav__item" onClick={this.toggleNav}>
            <Link className="nav__link" to="/styleguides">StyleGuides</Link>
          </li>
          <li className="nav__item" onClick={this.toggleNav}>
            <Link className="nav__link" to="/login">Login / Sign-up</Link>
          </li>
          <li className="nav__item" onClick={this.toggleNav}>
            <Link className="nav__link" to="/about">About</Link>
          </li>
          {this.props.userData.userIsLoggedIn
            ? <li className="nav__item" onClick={this.toggleNav}>
                <Link className="nav__link" to="/dashboard">Dashboard</Link>
              </li>
            : ''}
        </ul>
        <div className="nav__btn" onClick={this.toggleNav}>
          <i className="fas fa-bars" />
        </div>
      </nav>
    );
  }

}

export default Nav;