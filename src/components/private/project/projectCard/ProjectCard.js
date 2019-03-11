import React  from 'react';
import {Link} from 'react-router-dom';
import { AppContext } from '../../../context/appContext';

const Project = (props) => {
  return(
    <AppContext.Consumer>
    {(context) => (<li className="project-card">
      <Link to={`/dashboard/${props.project.projectId}`} 
            onClick={context.setCurrentProject} 
            data-project={JSON.stringify(props.project)} 
            title="Work on this project" 
            className="project-card__link">
        <div>
          <h4 className="project-card__title">{props.project.projectTitle}</h4>
          <span className="project-card__date">{new Date(props.project.projectCreated).toDateString()}</span>
        </div>
        <div className="project-card__options">
        <label
          title="Current Project Status"
          className={`btn tiny spacing--right--1 show--tiny ${props.project.projectStatus === "public" ? "success" : "primary"} breath`}>
          {props.project.projectStatus}
        </label>
      </div>
      </Link>
    </li>)}
    </AppContext.Consumer>    
  );
}

export default Project;