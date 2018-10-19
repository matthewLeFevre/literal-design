import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Globals from '../../../services/Global_service';
import ProjectHeader from './ProjectHeader_comp';

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
      console.log(res.data[0][0]);
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
    let data = {'projectId': this.props.match.params.projectId, 'styleGuideTitle': 'New Style Guide', 'styleGuideStatus': 'public'};
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
      <div className="col--12 col--sml--6">
        {this.state.styleGuideSettings 
          ? <Settings 
              save={this.saveStyleGuide}
              delete={this.deleteStyleGuide}
              closeSettings={this.closeSettings}
              data={this.state.styleGuideData}
            />
          : ''}
          <div className="dashboard__section__sub-heading">
            <h3 className="dashboard__section__sub-title">Style Guides</h3>
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

const StyleGuides = (props) => {
  let date = new Date(props.guide.styleGuideCreated);
  return(
    <li className="display-card">
      <div className="display-card__img__wrap">
        <img src="https://images.unsplash.com/photo-1519687231281-b25ebe1037c4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=53f92b745564a13d75475ce66455d209&auto=format&fit=crop&w=634&q=80" alt="#" className="display-card__img" />
      </div>
      <Link to={`${props.history.location.pathname}/${props.guide.styleGuideId}`} className="display-card__body">
        <h4 className="display-card__title">{props.guide.styleGuideTitle}</h4>
        <span className="date">{date.toDateString()}</span>
      </Link>
      <button type="button" value={props.guide.styleGuideId} onClick={props.settings} className="display-card__settings">
      <i className="fas fa-cog"></i>
      </button>
    </li>
  );
}

/*
Settings expects to recieve the following:
-close function
-save function
-delete function
-item data
*/
class Settings extends Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
    this.changeRequest = this.changeRequest.bind(this);
    // this.changeStyleGuide = this.changeStyleGuide.bind(this);
    this.state = {
      styleGuideTitle: '',
      styleGuideDescription: '',
      styleGuideStatus: 'private',
    }
  }

  componentDidMount() {
    this.setState({
      styleGuideTitle: this.props.data.styleGuideTitle,
      styleGuideStatus: this.props.data.styleGuideStatus,
    })
  }

  // saves the changes in state to the style guide
  sendRequest(){ this.props.save(this.state);}

  // stores changes made in the form to the state.
  changeRequest(e){
    let name = e.target.name;
    let target = e.target;
    switch(name) {
      case 'styleGuideTitle':
        this.setState({styleGuideTitle: target.value});
      break;
      case 'styleGuideDescription':
        this.setState({styleGuideDescription: target.value});
      break;
      case 'styleGuideStatus':
        if(target.checked) {
          this.setState({styleGuideStatus: 'public'});
        } else {
          this.setState({styleGuideStatus: 'private'});
        }
      break;
    }
  }

  render() {
    let styleGuideStatus = false;
    if(this.state.styleGuideStatus === 'public') {
      styleGuideStatus = true;
    }
    return(
      <div className="settings__container">
      <div className="settings__close" onClick={this.props.closeSettings}>
        <i className="fas fa-arrow-left"></i>
      </div>
      <form className="settings__form">
      <h3 className="section__heading--tertiary txt-white">{this.props.data.styleGuideTitle} Settings</h3>
          <fieldset className="form__field">
            <label className="label--text txt-white">Title</label>
            <input onChange={this.changeRequest} type="text" name="styleGuideTitle" className="input--text mid full" defaultValue={this.props.data.styleGuideTitle}
            />
          </fieldset>
          <fieldset className="form__field">
            <label className="label--text txt-white">Description</label>
            <textarea onChange={this.changeRequest} type="text" name="styleGuideDescription" className="input--textarea initial" defaultValue={this.props.data.styleGuideDescription}/>
          </fieldset>
          <fieldset className="form__field">
            <label className="label--text txt-white">Public</label>
            <label className="label--switch breath">
              {styleGuideStatus
                ? <input name="styleGuideStatus"
                    checked              
                    onChange={this.changeRequest} 
                    className="input--switch" type="checkbox" />
                : <input name="styleGuideStatus"              
                  onChange={this.changeRequest} 
                  className="input--switch" type="checkbox" />}
              
              <span className="input--switch__slider"></span>
            </label>
          </fieldset>
          <fieldset className="form__field">
            <button className="btn alt-action breath" type="button" onClick={this.sendRequest} value={this.props.data.styleGuideId}>Save</button>
            <button className="btn danger breath" type="button" onClick={this.props.delete} value={this.props.data.styleGuideId}>Delete</button>
          </fieldset>
        </form>
    </div>
    );
  }
}

const ProjectNav = (props) => {
  console.log(props);
  return(
    <nav className={`nav--auth ${props.toggle ? "open" : ''}`}>
      <div className="nav--auth__header">
        <div className="nav--auth__toggle"
             onClick={props.toggleNav}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <Link to="/dashboard" className="nav--auth__header__btn">
          <i className="fas fa-th"></i>
          <span>Dashboard</span>
        </Link>
      </div>
      <div className="nav--auth__body">
        <h4 className="section__heading--quatro">What do you want to do with your project?</h4>
        <button type="button" className="btn primary breath">Edit</button>
        <button type="button" className="btn danger breath">Delete</button>
        <p>{props.projectData.projectDescription}</p>
      </div>
    </nav>
  );
}