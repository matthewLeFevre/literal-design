import React from 'react';
import {Link} from 'react-router-dom';

const ProjectNav = (props) => {
  return(
    <nav className={`nav--auth ${props.toggle ? "open" : ''}`}>
      <div className="nav--auth__header">
        <div className="nav--auth__toggle"
             onClick={props.toggleNav}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <Link to="/dashboard" className="nav--auth__header__btn">
          <i className="fas fa-th"></i>
          <span>Dashboard</span>
        </Link>
      </div>
      <div className="nav--auth__body">
        <h4 className="section__heading--quatro">What do you want to do with your project?</h4>
        <button type="button" className="btn primary breath">Edit</button>
        <button type="button" className="btn danger breath">Delete</button>
        <p className="spacing--1">{props.projectData.projectDescription}</p>
      </div>
    </nav>
  );
}

export default ProjectNav;