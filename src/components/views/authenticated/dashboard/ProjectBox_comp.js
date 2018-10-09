import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const Project = (props) => {
  let date = new Date(props.project.projectCreated);
  return(
    <li className="display-card">
      <Link to={`/dashboard/${props.project.projectId}`} className="display-card__body">
        <h4 className="display-card__title">{props.project.projectTitle}</h4>
        <span className="date">{date.toDateString()}</span>
      </Link>
      <button type="button" value={props.project.projectId} onClick={props.projectSettings} className="display-card__settings">
      <i className="fas fa-cog"></i>
      </button>
    </li>
  );
}

export default Project;