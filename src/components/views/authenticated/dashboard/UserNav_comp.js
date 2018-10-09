import React, { Component } from 'react';

const UserNav = (props) => {
  return(
    <nav className={`nav--auth ${props.toggle ? "open" : ''}`}>
      <div className="nav--auth__header">
        <div className="nav--auth__toggle"
             onClick={props.toggleNav}>
          <i className="fas fa-arrow-left"></i>
        </div>
      </div>
    </nav>
  );
}

export default UserNav;