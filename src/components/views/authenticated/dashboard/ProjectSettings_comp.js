import React, { Component } from 'react';

class ProjectSettings extends Component {
  constructor(props) {
    super(props);
    this.handelProjectChange = this.handelProjectChange.bind(this);
    this.sendProject = this.sendProject.bind(this);
    this.state= {
      projectTitle: '',
      projectDescription: '',
      projectStatus: 'private',
    };
  }

  componentDidMount() {
    this.setState({
      projectTitle: this.props.projectData.projectTitle,
      projectStatus: this.props.projectData.projectStatus,
    })
  }

  handelProjectChange(e) {
    let name = e.target.name;
    let target = e.target;
    switch(name) {
      case 'projectTitle':
        this.setState({projectTitle: target.value});
      break;
      case 'projectDescription':
        this.setState({projectDescription: target.value});
      break;
      case 'projectStatus':
        if(target.checked) {
          this.setState({projectStatus: 'public'});
        } else {
          this.setState({projectStatus: 'private'});
        }
      break;
      default:
      break;
    }
  }

  sendProject() {this.props.saveProject(this.state);}
  
  render(){
    let projectStatus = false;
    if(this.state.projectStatus === 'public') {
      projectStatus = true;
    }
    return(
      <div className="settings__container">
        <div className="settings__header">
          <div className="settings__close" onClick={this.props.closeSettings}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <h3 className="header--auth__title">{this.props.projectData.projectTitle} Settings</h3>
        </div>
        
        <form className="settings__form">
          <fieldset className="form__field">
            <label className="label--text txt-white">Title</label>
            <input onChange={this.handelProjectChange} type="text" name="projectTitle" className="input--text mid full" defaultValue={this.props.projectData.projectTitle}/>
          </fieldset>
          <fieldset className="form__field">
            <label className="label--text txt-white">Description</label>
            <textarea onChange={this.handelProjectChange} type="text" name="projectDescription" className="input--textarea initial" defaultValue={this.props.projectData.projectDescription}/>
          </fieldset>
          <fieldset className="form__field">
            <label className="label--text txt-white">Public</label>
            <label className="label--switch breath">
              {projectStatus
                ? <input name="projectStatus"
                    checked              
                    onChange={this.handelProjectChange} 
                    className="input--switch" type="checkbox" />
                : <input name="projectStatus"              
                  onChange={this.handelProjectChange} 
                  className="input--switch" type="checkbox" />}
              
              <span className="input--switch__slider"></span>
            </label>
          </fieldset>
          <fieldset className="form__field">
            <button className="btn alt-action breath" type="button" onClick={this.sendProject} value={this.props.projectData.projectId}>Save</button>
            <button className="btn danger breath" type="button" onClick={this.props.deleteProject} value={this.props.projectData.projectId}>Delete</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default ProjectSettings;