import React from 'react';
import Request from '../../../../service/reqService';
import {AppContext} from '../../../context/appContext';
import {Redirect} from 'react-router-dom';

class ProjectSettings extends React.Component {
  constructor(props) {
    super(props);
    this.saveProject = this.saveProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      toDashboard: false,
      projectId: '',
      projectTitle: '',
      projectStatus: '',
      projectDescription: ''
    };

  }

  componentDidMount() {
    let {currentProject} = this.context;
    this.setState({
      projectId: currentProject.projectId,
      projectTitle: currentProject.projectTitle,
      projectStatus: currentProject.projectStatus,
      projectDescription: currentProject.projectDescription
    })
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  saveProject() {
    const {userData, handleAlert, updateState} = this.context;
    let data = {'projectId': this.state.projectId, 
                'projectTitle': this.state.projectTitle, 
                'projectStatus': this.state.projectStatus, 
                'projectDescription': this.state.projectDescription,
                'apiToken': userData.apiToken,
                'userId': userData.userId
              };

    let req = Request.createRequestBody('project', 'updateProject', data);

    fetch(Request.reqUrl, req)
    .then(res => res.json())
    .then(res => {
      handleAlert(res.message, res.status);
      if(res.status === 'success') {
        updateState('projects', res.data);
        res.data.forEach(project => {
          project.projectId === this.state.projectId
          ? updateState("currentProject", project)
          : '';
        });
      }
    });
  }
  deleteProject(e) {
    const {userData, handleAlert, updateState, toggle} = this.context;

    let data = {'projectId': this.state.projectId, 
                'userId': userData.userId, 
                'apiToken': userData.apiToken};

    let req = Request.createRequestBody('project', 'deleteProject', data);
    
    fetch(Request.reqUrl, req)
    .then(res => res.json())
    .then(res => {
      handleAlert(res.message, res.status);
      if(res.status === 'success') {
        updateState('projects', res.data);
        this.setState({toDashboard: true});
        toggle(undefined, "options");
        toggle(undefined, "projectSettings");
      }
    });
  }

  render(){
    const {toggle, currentProject} = this.context;
    if(this.state.toDashboard === true) {
      return <Redirect to="/dashboard" />
    }
    return(
      <div className="modal">
        <div className="card--normal">
          <header className="card-header">
            <h2 className="mdm">Project Settings</h2>
          </header>
          <div className="card-body">
            <form className="grid">
              <fieldset className="field full col--12">
                <label className="label">Project Title</label>
                <input name="projectTitle"
                      type="text" 
                      onChange={this.handleInputChange} 
                      defaultValue={this.state.projectTitle} 
                      className="input main full"/>
              </fieldset>
              <fieldset className="field full col--12">
                <label className="label">Project Description</label>
                <textarea name="projectDescription" 
                          onChange={this.handleInputChange} 
                          className="input--textarea full" 
                          value={this.state.projectDescription}/>
              </fieldset>
              <fieldset className="field full col--6">
                <label className="label">Publishing Status</label>
                <select name="projectStatus"onChange={this.handleInputChange} defaultValue={this.state.projectStatus} className="input--select">
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </fieldset>
              <fieldset className="field full col--6">
              <label className="label">Permanent</label>
                <button 
                  value={currentProject.projectId} 
                  type="button"
                  className="tiny danger btn breath full" 
                  data-toggle="projectSettings"
                  onClick={this.deleteProject}>Delete project</button>
              </fieldset>
            </form>
          </div>
          <footer className="card-footer">
              <button type="button" onClick={this.saveProject} className="btn primary breath icon sml">save</button>
              <button type="button" data-toggle="projectSettings" onClick={toggle} className="btn danger breath icon sml">Close</button>
          </footer>
        </div>
      </div>
    );
  }
}
ProjectSettings.contextType = AppContext;

export default ProjectSettings;