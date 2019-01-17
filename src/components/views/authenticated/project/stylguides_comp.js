import React from 'react';
import {Link} from 'react-router-dom';

const StyleGuides = (props) => {
  let date = new Date(props.guide.styleGuideCreated);
  return(
    <li className="display-card">
      <Link to={`${props.history.location.pathname}/${props.guide.styleGuideId}`} className="display-card__body">
        <h4 className="display-card__title">{props.guide.styleGuideTitle}</h4>
        <span className="date">{date.toDateString()}</span>
      </Link>
      <button type="button" value={props.guide.styleGuideId} onClick={props.settings} className="display-card__settings">
      <i className="fas fa-cog"></i>
      </button>
    </li>
  );
}

export default StyleGuides;