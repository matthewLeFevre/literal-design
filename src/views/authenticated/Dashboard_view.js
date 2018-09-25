import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Globals from '../../services/Global_service';

const Global = new Globals();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.createProject = this.createProject.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.projectSettings = this.projectSettings.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.state = {
      projectSettings: false,
      projectData: {},
      projects: [],
    }
  }

  componentDidMount() {
    fetch(`${Global.url}?controller=project&action=getProjectsByUserId&userId=1`)
    .then(res => res.json())
    .then(res => {
      this.setState({ projects: res.data});
    })
  }

  projectSettings(e) {
    let projectId = e.target.value;
    for (let project of this.state.projects) {
      if(project.projectId === projectId) {
        this.setState({
          projectData: project,
          projectSettings: true,
        });
      }
    }
  }

  closeSettings() {
    this.setState({
      projectSettings: false,
      projectData: {},
    });
  }

  createProject() {
    let data = {'userId': this.props.userData.userId, 'projectTitle': "New Project", 'projectStatus':'public'};
    let body = Global.createBody('project', 'createProject', data);
    let req = Global.createRequest(body);

    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        console.log(res.data);
        this.setState({projects: res.data});
      }
    });
  }

  saveProject(projectData) {
    let data = {'projectId': this.state.projectData.projectId, 
                'projectTitle': projectData.projectTitle, 
                'projectStatus': projectData.projectStatus, 
                'projectDescription': projectData.projectDescription,
                'apiToken': this.props.userData.apiToken,
                'userId': this.props.userData.userId
              };
    let body = Global.createBody('project', 'updateProject', data);
    let req = Global.createRequest(body);

    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        console.log(res.data);
        this.setState({
          projectSettings: false,
          projectData: {},
          projects: res.data
        });
      }
    });
  }

  deleteProject(e) {
    console.log(e.target.value);
    let projectId = e.target.value;
    let data = {'projectId': projectId, 'userId': this.props.userData.userId, 'apiToken': this.props.userData.apiToken};
    let body = Global.createBody('project', 'deleteProject', data);
    let req = Global.createRequest(body);

    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      if(res.status === 'success') {
        this.setState({
          projectSettings: false,
          projectData: {},
          projects: res.data,
        });
      }
    })
  }

  render() {
    return(
      <section className="col--12 page__full-height grid--nested">
      {this.state.projectSettings 
        ? <ProjectSettings saveProject={this.saveProject} closeSettings={this.closeSettings} projectData={this.state.projectData} deleteProject={this.deleteProject}/>
        : ''}
        <div className="col--12 dashboard__section" id="projects">
          <div className="dashboard__section__heading">
            <h2 className="dashboard__section__title">Projects</h2>
          </div>
          <ul className="display-card__group">
            {this.state.projects.map(
              (project) => {
                return <Project projectSettings={this.projectSettings} 
                                key={Global.createRandomKey()} 
                                project={project} 
                                dataTest={this.dataTest} />
              }
            )}
            <li>
              <button type="button" onClick={this.createProject} className="btn adder initial">
                <i className="fas fa-plus-circle"></i>
              </button>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default Dashboard;

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

class ProjectSettings extends Component {
  constructor(props) {
    super(props);
    this.changeProject = this.changeProject.bind(this);
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
  changeProject(e) {
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
        <div className="settings__close" onClick={this.props.closeSettings}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <form className="settings__form">
          <h3 className="section__heading--tertiary txt-white">Project Settings</h3>
          <fieldset className="form__field">
            <label className="label--text txt-white">Title</label>
            <input onChange={this.changeProject} type="text" name="projectTitle" className="input--text mid full" defaultValue={this.props.projectData.projectTitle}/>
          </fieldset>
          <fieldset className="form__field">
            <label className="label--text txt-white">Description</label>
            <textarea onChange={this.changeProject} type="text" name="projectDescription" className="input--textarea initial" defaultValue={this.props.projectData.projectDescription}/>
          </fieldset>
          <fieldset className="form__field">
            <label className="label--text txt-white">Public</label>
            <label className="label--switch breath">
              {projectStatus
                ? <input name="projectStatus"
                    checked              
                    onChange={this.changeProject} 
                    className="input--switch" type="checkbox" />
                : <input name="projectStatus"              
                  onChange={this.changeProject} 
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