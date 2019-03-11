import React  from 'react';
import {Link} from 'react-router-dom';
import { AppContext } from '../../../context/appContext';

const StyleGuide = (props) => {
  return(
    <AppContext.Consumer>
      {(context) => (
        <li className="project-card">
          <Link 
            to={`${props.history.location.pathname}/${props.styleGuide.styleGuideId}`} 
            className="project-card__link"
            title="Work on this StyleGuide"
            onClick={context.setCurrentStyleGuide}
            data-styleguide={JSON.stringify(props.styleGuide)}>
            <div>
              <h4 className="project-card__title">{props.styleGuide.styleGuideTitle}</h4>
              <span className="project-card__date">{new Date(props.styleGuide.styleGuideCreated).toDateString()}</span>
            </div>
            <div className="project-card__options">
              <button 
                type="button" 
                data-styleguide-status={props.styleGuide.styleGuideStatus}
                value={props.styleGuide.styleGuideId} 
                onClick={props.changeStyleGuideStatus}
                className={`btn tiny spacing--right--1 ${props.styleGuide.styleGuideStatus === "public" ? "success": "primary"} show--tiny breath`}>
                {props.styleGuide.styleGuideStatus}
              </button>
            </div>
          </Link>
        </li>
      )}
    </AppContext.Consumer>
    
  );
}

export default StyleGuide;