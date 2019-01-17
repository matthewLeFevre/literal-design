import React  from 'react';
import {Link} from 'react-router-dom';

const Project = (props) => {
  let date = new Date(props.project.projectCreated);
  return(
    <li className="project-card">
      <Link to={`/dashboard/${props.project.projectId}`} className="project-card__body">
        <h4 className="project-card__title">{props.project.projectTitle}</h4>
        <span className="date">{date.toDateString()}</span>
      </Link>
      <button type="button" value={props.project.projectId} onClick={props.projectSettings} className="project-card__settings">
      <i className="fas fa-cog"></i>
      </button>
    </li>
  );
}

export default Project;