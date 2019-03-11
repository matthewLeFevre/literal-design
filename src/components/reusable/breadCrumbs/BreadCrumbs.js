import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { AppContext } from '../../context/appContext';

class BreadCrumbs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {userData, currentProject, currentStyleGuide} = this.context;
    return(
      <nav className="dash-crumbs col--12">
        <ul className="dash-crumbs__list">
          <li className="dash-crumbs__item">
            <span className="dash-crumbs__label">Dashboard</span>
            <Link to="/dashboard" className="dash-crumbs__link">
              <span className="dash-crumbs__icon"><i className="fas fa-th"></i></span>
              <span className="dash-crumbs__text">{userData.userName}</span>
            </Link>
          </li>
          {this.props.location.params.projectId 
            ?<li className="dash-crumbs__item">
              <span className="dash-crumbs__label">Project</span>
              <Link to={`/dashboard/${this.props.location.params.projectId}`} className="dash-crumbs__link">
                <span className="dash-crumbs__icon"><i className="fas fa-project-diagram"></i></span>
                <span className="dash-crumbs__text">{currentProject.projectTitle}</span>
              </Link>
            </li>
            : ''}
          {this.props.location.params.styleGuideId
            ? <li className="dash-crumbs__item">
                <span className="dash-crumbs__label">StyleGuide</span>
                <Link to={`/dashboard/${this.props.location.params.projectId}/${this.props.location.params.styleGuideId}`} className="dash-crumbs__link">
                  <span className="dash-crumbs__icon"><i className="fas fa-mortar-pestle"></i></span>
                  <span className="dash-crumbs__text">{currentStyleGuide.styleGuideTitle}</span>
                </Link>
              </li>
            : ''}
        </ul>
      </nav>
    );
  }
}
BreadCrumbs.contextType = AppContext;
export default BreadCrumbs;
