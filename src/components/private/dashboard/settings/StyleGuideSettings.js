import React from 'react';
import Request from  '../../../../service/reqService';
import {AppContext} from '../../../context/appContext';
import {Redirect} from 'react-router-dom';

class StyleGuideSettings extends React.Component {
  constructor(props) {
    super(props);
    this.saveStyleGuide = this.saveStyleGuide.bind(this);
    this.deleteStyleGuide = this.deleteStyleGuide.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      toProject: false,
      styleGuideId: '',
      styleGuideTitle: '',
      styleGuideStatus: '',
      styleGuideDescription: '',
    }
  }

  componentDidMount() {
    let {currentStyleGuide} = this.context;
    this.setState({
      styleGuideId: currentStyleGuide.styleGuideId,
      styleGuideTitle: currentStyleGuide.styleGuideTitle,
      styleGuideStatus: currentStyleGuide.styleGuideStatus,
      styleGuideDescription: currentStyleGuide.styleGuideDescription,
    });
  }

  handleInput(e){
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  saveStyleGuide() {
    const {userData, handleAlert, updateState, currentProject} = this.context;
    let data = {'styleGuideId': this.state.styleGuideId,
                'styleGuideTitle': this.state.styleGuideTitle,
                'styleGuideStatus': this.state.styleGuideStatus,
                'styleGuideDescription': this.state.styleGuideDescription ? this.state.styleGuideDescription : "",
                'apiToken': userData.apiToken,
                'projectId': currentProject.projectId};

    let req = Request.createRequestBody('styleGuide', 'updateStyleGuide', data);

    fetch(Request.reqUrl, req)
    .then(res => res.json())
    .then(res => {
      handleAlert(res.message, res.status);
      if(res.status === 'success') {
        updateState('styleGuides', res.data);
        res.data.forEach(styleGuide => {
          styleGuide.styleGuideId === this.state.styleGuideId
          ? updateState('currentStyleGuide', styleGuide)
          : ''
        });
      }
    });
  }

  deleteStyleGuide() {
    const {currentProject, userData, handleAlert, updateState, toggle} = this.context;

    let data = {'styleGuideId': this.state.styleGuideId, 
                'projectId': currentProject.projectId, 
                'apiToken': userData.apiToken};

    let req = Request.createRequestBody('styleGuide', 'deleteStyleGuide', data);
    fetch(Request.reqUrl, req)
    .then(res => res.json())
    .then(res => {
      handleAlert(res.message, res.status);
      if(res.status === 'success') {
        updateState('styleGuides', res.data);
        this.setState({toProject: true});
        toggle(undefined, "options");
        toggle(undefined, "styleGuideSettings");
      }
    });
  }



  render() {
    const {toggle, currentStyleGuide, currentProject} = this.context;
    if(this.state.toProject === true) {
      return <Redirect to={`/dashboard/${currentProject.projectId}`}/>
    }
    return(
      <div className="modal">
        <div className="card--normal">
          <header className="card-header">
            <h2 className="mdm">StyleGuide Settings</h2>
          </header>
          <div className="card-body">
            <form className="grid">
              <fieldset className="field full col--12">
                <label className="label">StyleGuide Title</label>
                <input name="styleGuideTitle"type="text" onChange={this.handleInput} defaultValue={this.state.styleGuideTitle} className="input main full"/>
              </fieldset>
              <fieldset className="field full col--12">
                <label className="label">StyleGuide Description</label>
                <textarea name="styleGuideDescription"onChange={this.handleInput} className="input--textarea full" value={this.state.styleGuideDescription}/>
              </fieldset>
              <fieldset className="field full col--6">
                <label className="label">Publishing Status</label>
                <select name="styleGuideStatus"onChange={this.handleInput} defaultValue={this.state.styleGuideStatus} className="input--select">
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </fieldset>
              <fieldset className="field full col--6">
              <label className="label">Permanent</label>
                <button 
                  value={this.props.styleGuideId} 
                  type="button"
                  className="tiny danger btn breath full" 
                  onClick={this.deleteStyleGuide}>Delete project</button>
              </fieldset>
            </form>
          </div>
          <footer className="card-footer">
              <button type="button" onClick={this.saveStyleGuide} className="btn primary breath icon sml">save</button>
              <button type="button" data-toggle="styleGuideSettings" onClick={toggle} className="btn danger breath icon sml">Close</button>
          </footer>
        </div>
      </div>
    );
  }
}

StyleGuideSettings.contextType = AppContext;

export default StyleGuideSettings;