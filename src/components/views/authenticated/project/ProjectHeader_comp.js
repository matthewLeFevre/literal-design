import React, { Component } from 'react';

class ProjectHeader extends Component {
  render() {
    return(
      <header className="header--auth col--12">
        <div className="header--auth__nav__toggle"
             onClick={this.props.toggleNav}>
          <i className="fas fa-bars"></i>
        </div>
        <span className="header--auth__title">
          {this.props.projectData.projectTitle}
        </span>
      </header>
    );
  }
}

export default ProjectHeader;

