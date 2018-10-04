import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class StyleGuideHeader extends Component {
 
  render() {
    return(
      <header className="header--auth col--12">
        <div className="header--auth__nav__toggle"
             onClick={this.props.toggleNav}>
          <i className="fas fa-bars"></i>
        </div>
        <span className="header--auth__title">
          {this.props.styleGuide.styleGuideTitle}
        </span>
      </header>
    );
  }
}

export default StyleGuideHeader;

