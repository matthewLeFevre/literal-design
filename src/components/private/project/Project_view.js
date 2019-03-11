import React, { Component } from 'react';
import StyleGuides from './projectCard/styleGuideCard';
import Breadcrumbs from '../../reusable/breadCrumbs/BreadCrumbs';
import OptionsPanel from '../dashboard/options/OptionsPanel';
import { AppContext } from '../../context/appContext';
import Request from '../../../service/reqService';
import Utility from '../../../service/utilService';

class ProjectView extends Component {
  constructor(props) {
    super(props);
    this.createStyleGuide = this.createStyleGuide.bind(this);
  }

  componentDidMount() {
    const {currentProject, userData, updateState} = this.context;
    fetch(`${Request.reqUrl}?controller=styleGuide&action=getStyleGuidesByProjectId&projectId=${currentProject.projectId}&apiToken=${userData.apiToken}`)
    .then(res => res.json())
    .then(res => {
      updateState("styleGuides", res.data);
    })
  }


  createStyleGuide() {
    const {userData, updateState} = this.context;
    let data = {'projectId': this.props.match.params.projectId, 'styleGuideTitle': 'New Style Guide', 'styleGuideStatus': 'public', "apiToken": userData.apiToken};
    let req = Request.createRequestBody('styleGuide', 'createStyleGuide', data);
    fetch(Request.reqUrl, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        updateState('styleGuides', res.data);
      }
    });
  } 


  render() {
    const {currentProject, styleGuides} = this.context
    return (
      <div className="col--12 grid--nested--sml">
        <Breadcrumbs 
          project = {currentProject}
          location={this.props.match}/>
        <OptionsPanel 
          project = {currentProject}
          optionTitle="Project"
          location={this.props.match}/>

      <div className="col--sml--8 col--mdm--9  dashboard__container">

          <div className="dashboard__section__sub-heading">
            <h2 className="dashboard__section__sub-title">Style Guides</h2>
          </div>
          <ul className="display-card__group">
            {styleGuides.map(
              (guide) => {
                return <StyleGuides 
                    history={this.props.history} 
                    key={Utility.createRandomKey()}  
                    styleGuide={guide} 
                    deleteStyleGuide={this.deleteStyleGuide}
                    styleGuideSettings={this.styleGuideSettings}
                    changeStyleGuideStatus={this.changeStyleGuideStatus}
                  />
              }
            )}
            <li>
              <button onClick={this.createStyleGuide} type="button" className="btn adder initial">
                Create a new style guide
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

ProjectView.contextType = AppContext;

export default ProjectView;