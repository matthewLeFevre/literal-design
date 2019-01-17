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
    let projectStatus = false;
    if(this.props.projectData.projectStatus === 'public') {
      projectStatus = true;
    }
    console.log(projectStatus);
    this.setState({
      projectTitle: this.props.projectData.projectTitle,
      projectStatus: this.props.projectData.projectStatus,
      projectPublic: projectStatus
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
          console.log("fired");
          this.setState({projectStatus: 'public',
                         projectPublic: true}, () => console.log(this.state.projectStatus));
        } else {
          this.setState({projectStatus: 'private',
                         projectPublic: false}, () => console.log(this.state.projectStatus));
        }
      break;
      default:
      break;
    }
  }

  sendProject() {this.props.saveProject(this.state);}
  
  render(){
    return(
      <div className="settings__view">
        <div className="settings__close" onClick={this.props.closeSettings}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <section className="settings">
          <form className="form">
            <h1 className="form__title">{this.props.projectData.projectTitle} Settings</h1>
            <fieldset className="field">
              <label className="label">Title</label>
              <input onChange={this.handelProjectChange} type="text" name="projectTitle" className="input mid full" defaultValue={this.props.projectData.projectTitle}/>
            </fieldset>
            <fieldset className="field">
              <label className="label">Description</label>
              <textarea onChange={this.handelProjectChange} type="text" name="projectDescription" className="input--textarea initial full" defaultValue={this.props.projectData.projectDescription}/>
            </fieldset>
            <fieldset className="field">
              <div className="notice note bg-white">
                <i className="fas fa-comment note notice__icon note"/>
                <span className="notice__status">Note</span>
                <p className="notice__message">The public private feature for projects is not avaliable at this time.</p>
              </div>
            </fieldset>
            <fieldset className="field">
              <label className="label side">Public</label>
              <input type="checkbox" className="input--checkbox" 
                    disabled
                    id="status" defaultChecked={this.state.projectPublic ? true : false} 
                    onChange={this.handelProjectChange}/>
              <label htmlFor="status" className="label--checkbox" />
            </fieldset>
            <fieldset className="field">
              <button className="btn alt-action breath" type="button" onClick={this.sendProject} value={this.props.projectData.projectId}>Save</button>
              <button className="btn danger breath" type="button" onClick={this.props.deleteProject} value={this.props.projectData.projectId}>Delete</button>
            </fieldset>
          </form>
        </section>
      </div>
    );
  }
}

export default ProjectSettings;