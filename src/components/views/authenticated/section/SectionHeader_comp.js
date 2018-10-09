import React, { Component } from 'react';

class SectionHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    }
  }

  render() {
    return(
      <header className="header--auth col--12">
        <div className="header--auth__nav__toggle"
             onClick={this.props.toggleNav}>
          <i className="fas fa-bars"></i>
        </div>
        <span className="header--auth__title">
          {this.props.section.sectionTitle}
        </span>
      </header>
    );
  }
}

export default SectionHeader;

