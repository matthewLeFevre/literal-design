import React from 'react';
import {Link} from 'react-router-dom';
import Globals from '../../../services/Global_service';

const Global = new Globals();

const SectionPublicNav = (props) => {
  return (
    <nav className="section--public__nav">
      <div className="section--public__nav-header">
        <h1 className="styleGuide__title"><Link to={`/styleguides/detail/${props.match.params.styleGuideId}`}>{props.styleGuideTitle}</Link></h1>
        <span className="section--public__nav-toggle" onClick={props.toggleNav}>
          <i className="fas fa-bars" />
        </span>
      </div>
      <div className={props.sectionNavToggle ? "section--public__nav-body open" : "section--public__nav-body"}>
        <ul className="section--public__nav-list">
          {props.allSections.map((section) => {
            return(
              <li className="section--public__nav-item" key={Global.createRandomKey()}>
                <Link to={`/styleguides/detail/${props.match.params.styleGuideId}/${section.sectionId}`} className="section--public__nav-link"><i className="section--public__nav-arrow fas fa-chevron-right"/>&nbsp;{section.sectionTitle}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  )
}

export default SectionPublicNav;