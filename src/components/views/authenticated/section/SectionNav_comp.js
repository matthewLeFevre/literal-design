import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import Globals from '../../../services/Global_service';
const Global = new Globals();

const SectionNav = (props) => {
  return(
    <nav className={`nav--auth ${props.toggle ? "open" : ''}`}>
      <div className="nav--auth__header">
        <div className="nav--auth__toggle"
             onClick={props.toggleNav}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="nav--auth__header__btns">
          <Link to={`/dashboard/${props.match.params.projectId}/${props.match.params.styleGuideId}`} className="nav--auth__header__btn">
          <i className="fas fa-mortar-pestle"></i>
            <span>Style Guide</span>
          </Link>
          <Link to={`/dashboard/${props.match.params.projectId}`} className="nav--auth__header__btn">
          <i className="fas fa-project-diagram"></i>
            <span>Project</span>
          </Link>
          <Link to="/dashboard" className="nav--auth__header__btn">
            <i className="fas fa-th"></i>
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
      <div className="nav--auth__body">
        <h4 className="section__heading--quatro">StyleGuide Sections</h4>
        <ul className="section__nav__list">
          {props.sections.map( section => {
            return(<li key={Global.createRandomKey()} >
              <NavLink activeClassName="active" className="section__nav__link" 
                    onClick={props.toggleNav} 
                    to={`/dashboard/${props.match.params.projectId}/${props.match.params.styleGuideId}/${section.sectionId}`}>{section.sectionTitle}</NavLink></li>)
          })}
        </ul>
        <h4 className="section__heading--quatro">What do you want to do with your section?</h4>
        <button type="button" className="btn primary breath">Edit</button>
        <button type="button" className="btn danger breath">Delete</button>
      </div>
    </nav>
  );
} 

export default SectionNav;