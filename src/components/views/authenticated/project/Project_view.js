import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Globals from '../../../services/Global_service';
import ProjectHeader from './ProjectHeader_comp';
import ProjectNav from './ProjectNav_comp';
import Settings from './settings_comp';
import StyleGuides from './stylguides_comp';

const Global = new Globals();

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.createStyleGuide = this.createStyleGuide.bind(this);
    this.deleteStyleGuide = this.deleteStyleGuide.bind(this);
    this.saveStyleGuide = this.saveStyleGuide.bind(this);
    this.styleGuideSettings = this.styleGuideSettings.bind(this);
    this.closeSettings = this.closeSettings.bind(this);
    this.state = {
      styleGuideSettings: false,
      styleGuideData: {},
      styleGuides: [],
      projectData: {},
      toggle: false,
    }
  }
  toggleNav() {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }))
  }
  componentDidMount() {
    fetch(`${Global.url}?controller=project&action=getProjectById&projectId=${this.props.match.params.projectId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        projectData: res.data[0][0],
        styleGuides: res.data[1]
      });
      
    });
  }
  styleGuideSettings(e) {
    let styleGuideId = e.target.value;
    for (let styleGuide of this.state.styleGuides) {
      if(styleGuide.styleGuideId === styleGuideId) {
        this.setState({
          styleGuideData: styleGuide,
          styleGuideSettings: true,
        });
      }
    }
  }
  closeSettings() {
    this.setState({
      styleGuideSettings: false,
      styleGuideData: {},
    });
  }
  createStyleGuide() {
    let data = {'projectId': this.props.match.params.projectId, 'styleGuideTitle': 'New Style Guide', 'styleGuideStatus': 'public', "apiToken": this.props.userData.apiToken};
    let body = Global.createBody('styleGuide', 'createStyleGuide', data);
    let req = Global.createRequest(body);

    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.setState({styleGuides: res.data});
      }
    });
  } 
  saveStyleGuide(styleGuideData) {
    let data = {'styleGuideId': this.state.styleGuideData.styleGuideId,
                'styleGuideTitle': styleGuideData.styleGuideTitle,
                'styleGuideStatus': styleGuideData.styleGuideStatus,
                'styleGuideDescription': styleGuideData.styleGuideDescription,
                'apiToken': this.props.userData.apiToken,
                'projectId': this.state.projectData.projectId}
    let body = Global.createBody('styleGuide', 'updateStyleGuide', data);
    let req = Global.createRequest(body);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.setState({
          styleGuideSettings: false,
          styleGuideData: {},
          styleGuides: res.data
        });
      }
    });
  }
  deleteStyleGuide(e) {
    let styleGuideId = e.target.value;
    let data = {'styleGuideId': styleGuideId, 'projectId':this.props.match.params.projectId, 'apiToken': this.props.userData.apiToken};
    let body = Global.createBody('styleGuide', 'deleteStyleGuide', data);
    let req = Global.createRequest(body);

    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.setState({
          styleGuideSettings: false,
          styleGuideData: {},
          styleGuides: res.data,
        });
      }
    });
  }

  render() {
    return (
      <div className="col--12 grid--nested" id="projects">
      <ProjectHeader toggleNav={this.toggleNav} projectData={this.state.projectData}/>
      <ProjectNav toggleNav={this.toggleNav} toggle={this.state.toggle} projectData={this.state.projectData}/>
      <div className="col--12 col--sml--6 dashboard__container">
        {this.state.styleGuideSettings 
          ? <Settings 
              save={this.saveStyleGuide}
              delete={this.deleteStyleGuide}
              closeSettings={this.closeSettings}
              data={this.state.styleGuideData}
            />
          : ''}
          <div className="dashboard__section__sub-heading">
            <h2 className="dashboard__section__sub-title">Style Guides</h2>
          </div>
          <ul className="display-card__group">
            {this.state.styleGuides.map(
              (guide) => {
                return <StyleGuides 
                    history={this.props.history} 
                    key={Global.createRandomKey()}  
                    guide={guide} 
                    settings={this.styleGuideSettings}
                  />
              }
            )}
            <li>
              <button onClick={this.createStyleGuide} type="button" className="btn adder initial">
                <i className="fas fa-plus-circle"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ProjectView;