import React from 'react';
import { AppContext } from '../../../context/appContext';

class ProjectOptions extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    const {toggle} = this.context;
    return (
      <div>
        <section className="options-item">
          <h3 className="options-item__title">{this.props.project.projectTitle}</h3>
          <span className="options-item__date"><span className="bold">Date Created:</span> {new Date(this.props.project.projectCreated).toDateString()}</span>
          <p>{this.props.project.projectDescription
              ? this.props.project.projectDescription
              : ''}</p>
          <fieldset className="field txt-center">
            <button type="button" 
                    data-project={JSON.stringify(this.props.project)}
                    data-toggle="projectSettings" 
                    onClick={toggle} 
                    className="btn breath primary full">Edit Project</button>
          </fieldset>
        </section>
      </div>
    );
  }
}
ProjectOptions.contextType = AppContext;
export default ProjectOptions;