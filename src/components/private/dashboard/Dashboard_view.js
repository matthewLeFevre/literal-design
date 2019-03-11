import React, { Component } from 'react';

import Project from '../project/projectCard/ProjectCard';
import Breadcrumbs from '../../reusable/breadCrumbs/BreadCrumbs';
import OptionsPanel from './options/OptionsPanel';
import Globals from '../../services/Global_service';
import Request from '../../../service/reqService';
import {AppContext} from '../../context/appContext';

const Global = new Globals();

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.createProject = this.createProject.bind(this);
    this.state = {
      toggleUserSettings: false,
    }
  }
  componentDidMount() {
    let {updateState, projects, userData} = this.context;
    if(projects.length < 1) {
      fetch(`${Global.url}?controller=project&action=getProjectsByUserId&userId=${userData.userId}`)
      .then(res => res.json())
      .then(res => {
        updateState("projects", res.data);
      })
    }
  }

  toggleUserSettings() {
    this.setState((prevState) =>({
      toggleUserSettings: !prevState.toggleUserSettings,
    }))
  }

  createProject() {
    const {userData, updateState} = this.context;
    let data = {'userId': userData.userId, 
      'projectTitle': "New Project", 
      'projectStatus':'private',
      'apiToken': userData.apiToken,
    };
    let body = Request.createBody('project', 'createProject', data);
    let req = Request.createRequest(body);

    fetch(Request.reqUrl, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        updateState('projects', res.data);
      }
    });
  }


  render() {
    let {projects} = this.context;
    return(
      <section className="col--12 grid--nested--sml">

      <Breadcrumbs 
        userData={this.props.userData} 
        location={this.props.match}/>
      <OptionsPanel 
        location={this.props.match.path}
        optionTitle="Dashboard"/>

        <div className="col--sml--8 col--mdm--9  dashboard__container" id="projects">
          
          <div className="dashboard__section__sub-heading">
            <h2 className="dashboard__section__sub-title">Projects</h2>
          </div>
          <ul className="project-card__group">
            {projects.map(
              (project) => {
                return <Project projectSettings={this.projectSettings} 
                                deleteProject={this.deleteProject}
                                changeProjectStatus={this.changeProjectStatus}
                                key={Global.createRandomKey()} 
                                project={project} 
                                dataTest={this.dataTest} />
              }
            )}
            <li>
              <button type="button" onClick={this.createProject} className="btn adder initial">
                Create a new project
              </button>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

Dashboard.contextType = AppContext;

export default Dashboard;





