import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Request from '../../../service/reqService';
import Utility from '../../../service/utilService';
import OptionsPanel from '../dashboard/options/OptionsPanel';
import Breadcrumbs from '../../reusable/breadCrumbs/BreadCrumbs';
import { AppContext } from '../../context/appContext';

class StyleGuideView extends Component {
  constructor(props) {
    super(props);
    this.createSection = this.createSection.bind(this);
    this.deleteSection = this.deleteSection.bind(this);
    this.state = {
      nextItemOrder: 0,
    }
  }
  componentDidMount() {
    const {currentStyleGuide, updateState} = this.context;
    fetch(`${Request.reqUrl}?controller=section&action=getSectionsByStyleGuideId&styleGuideId=${currentStyleGuide.styleGuideId}`)
    .then(res => res.json())
    .then(res => {
      let nextOrder = this.nextOrder(res.data);
      updateState("sections", res.data);
      this.setState({ nextItemOrder: nextOrder });
    });
  }

  nextOrder (items) {
    let nextOrder = 0;
    items.forEach(item => {
      item.itemOrder > nextOrder ? nextOrder = item.itemOrder : '';
    })
    nextOrder++;
    return nextOrder;
  }

  createSection() {
    const {currentStyleGuide, userData, updateState} = this.context;
    let data = {'styleGuideId': currentStyleGuide.styleGuideId, 
                'sectionTitle': "New Section", 
                "itemOrder": this.state.nextItemOrder, 
                'apiToken': userData.apiToken};
    let body = Request.createBody('section', 'createSection', data);
    let req = Request.createRequest(body);
    fetch(Request.reqUrl, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        let nextOrder = this.nextOrder(res.data);
        updateState('sections', res.data);
        this.setState( prevState => ({
          nextItemOrder: nextOrder,
        }));
      }
    });
  }

  deleteSection(e) {
    const {currentStyleGuide, updateState, userData} = this.context;
    let data = {'sectionId': e.target.value, 
                'styleGuideId': currentStyleGuide.styleGuideId, 
                'apiToken': userData.apiToken};
    let body = Request.createBody('section', 'deleteSection', data);
    let req = Request.createRequest(body);
    fetch(Request.reqUrl, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        updateState('sections', res.data);
      }
    })
  }
  render() {
    const {currentStyleGuide, sections} = this.context;
    return(
      <div className="col--12 grid--nested--sml">
      <Breadcrumbs 
        styleGuide={currentStyleGuide}
        location={this.props.match}/>
      <OptionsPanel
        styleGuide = {currentStyleGuide}
        optionTitle = "StyleGuide"
        location = {this.props.match} />

        <div className="col--sml--8 col--mdm--9 dashboard__container">
          <div className="dashboard__section__sub-heading">
            <h2 className="dashboard__section__sub-title">Sections</h2>
          </div>
          <ul className="display-card__group">
            {sections.map(
              (section) => {
                return <Sections 
                  deleteSection={this.deleteSection} 
                  history={this.props.history} 
                  key={Utility.createRandomKey()} 
                  section={section} />
              }
            )}
            <li>
              <button onClick={this.createSection} type="button" className="btn adder initial">
                Create a new section
              </button>
            </li>
          </ul>
        </div>
      </div>
        
    );
  }
}

const Sections = (props) => {
  return(
    <AppContext.Consumer>
      {context => (
        <li className="display-card">
        <Link 
          to={`${props.history.location.pathname}/${props.section.sectionId}`} 
          title="Work on section" 
          onClick={context.setCurrentSection}
          data-section={JSON.stringify(props.section)}
          className="display-card__body">
          <h4 className="display-card__title">{props.section.sectionTitle}</h4>
        </Link>
        <button type="button" 
          value={props.section.sectionId}
          onClick={props.deleteSection} 
          title="Delete Section"
          className="display-card__delete">
          <i className="fas fa-times"></i>
        </button>
      </li>
      )}
    </AppContext.Consumer>
    
  );
}
StyleGuideView.contextType = AppContext;
export default StyleGuideView;

// const StyleGuideNav = (props) => {
//   return(
//     <nav className={`nav--auth ${props.toggle ? "open" : ''}`}>
//       <div className="nav--auth__header">
//         <div className="nav--auth__toggle"
//              onClick={props.toggleNav}>
//           <i className="fas fa-arrow-left"></i>
//         </div>
//         <div className="nav--auth__header__btns">
//           <Link to={`/dashboard/${props.match.params.projectId}`} className="nav--auth__header__btn">
//           <i className="fas fa-project-diagram"></i>
//             <span>Project</span>
//           </Link>
//           <Link to="/dashboard" className="nav--auth__header__btn">
//             <i className="fas fa-th"></i>
//             <span>Dashboard</span>
//           </Link>
//         </div>
//       </div>
//       <div className="nav--auth__body">
//         <h4 className="section__heading--quatro">What do you want to do with your styleGuide?</h4>
//         <button type="button" className="btn primary breath">Edit</button>
//         <button type="button" className="btn danger breath">Delete</button>
//       </div>
//     </nav>
//   );
// }