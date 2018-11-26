import React, { Component } from 'react';

import Project from './ProjectBox_comp';
import ProjectSettings from './ProjectSettings_comp';
import UserNav from './UserNav_comp';
import UserHeader from './UserHeader_comp';

import Globals from '../../../services/Global_service';

const Global = new Globals();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.createProject = this.createProject.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
    this.projectSettings = this.projectSettings.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.state = {
      projectSettings: false,
      projectData: {},
      projects: [],
      toggle: false,
    }
  }

  toggleNav() {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }))
  }

  componentDidMount() {
    fetch(`${Global.url}?controller=project&action=getProjectsByUserId&userId=${this.props.userData.userId}`)
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
    let data = {'userId': this.props.userData.userId, 
      'projectTitle': "New Project", 
      'projectStatus':'public',
      'apiToken': this.props.userData.apiToken,
    };
    let body = Global.createBody('project', 'createProject', data);
    let req = Global.createRequest(body);

    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
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
        this.setState({
          projectSettings: false,
          projectData: {},
          projects: res.data
        });
      }
    });
  }

  deleteProject(e) {
    let projectId = e.target.value;
    let data = {'projectId': projectId, 'userId': this.props.userData.userId, 'apiToken': this.props.userData.apiToken};
    let body = Global.createBody('project', 'deleteProject', data);
    let req = Global.createRequest(body);

    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
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
      <section className="col--12 grid--nested">
      <UserHeader toggleNav={this.toggleNav} userData={this.props.userData}/>
      <UserNav toggleNav={this.toggleNav} toggle={this.state.toggle} userData={this.props.userData}/>
      {this.state.projectSettings 
        ? <ProjectSettings saveProject={this.saveProject} closeSettings={this.closeSettings} projectData={this.state.projectData} deleteProject={this.deleteProject}/>
        : ''}
        <div className="col--12 col--sml--6 dashboard__container" id="projects">
          
          <div className="dashboard__section__sub-heading">
            <h2 className="dashboard__section__sub-title">Projects</h2>
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





