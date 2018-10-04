import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Globals from '../../services/Global_service';
import StyleGuideHeader from '../../components/StyleGuideHeader_comp';

const Global = new Globals();

class StyleGuideView extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.createSection = this.createSection.bind(this);
    this.state = {
      sections: [],
      nextItemOrder: 0,
      styleGuide: {},
      toggle: false,
    }
  }
  toggleNav() {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }))
  }
  componentDidMount() {
    fetch(`${Global.url}?controller=styleGuide&action=getStyleGuideById&styleGuideId=${this.props.match.params.styleGuideId}`)
    .then(res => res.json())
    .then(res => {
        let itemOrder = 0;
        for(let section of res.data[1] ) {
          
          if( parseInt(section.itemOrder) > itemOrder) {
            itemOrder = parseInt(section.itemOrder);
          }
        } 
        itemOrder = itemOrder + 1;
        this.setState({
          styleGuide: res.data[0][0],
          sections: res.data[1],
          nextItemOrder: itemOrder,
        });
    });
  }
  createSection() {
    let data = {'styleGuideId': this.props.match.params.styleGuideId, 'sectionTitle': "New Section", "itemOrder": this.state.nextItemOrder, 'apiToken': this.props.userData.apiToken};
    let body = Global.createBody('section', 'createSection', data);
    let req = Global.createRequest(body);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.setState( prevState => ({
          sections: res.data,
          nextItemOrder: prevState.nextItemOrder + 1,
        }));
      }
    });
  }
  render() {
    return(
      <div className="col--12 grid--nested" id="projects">
        <StyleGuideHeader toggleNav={this.toggleNav} styleGuide={this.state.styleGuide} match={this.props.match}/>
        <StyleGuideNav match={this.props.match} toggleNav={this.toggleNav} toggle={this.state.toggle} StyleGuide={this.props.StyleGuide}/>
        <div className="col--12 col--sml--8">
          <div className="dashboard__section__sub-heading">
            <h3 className="dashboard__section__sub-title">Sections</h3>
          </div>
          <ul className="display-card__group">
            {this.state.sections.map(
              (guides) => {
                return <Sections history={this.props.history} key={Global.createRandomKey()} sectionData={guides} />
              }
            )}
            <li>
              <button onClick={this.createSection} type="button" className="btn adder initial">
                <i className="fas fa-plus-circle"></i>
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
    <li className="display-card">
      <div className="display-card__img__wrap">
        <img src="https://images.unsplash.com/photo-1519687231281-b25ebe1037c4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=53f92b745564a13d75475ce66455d209&auto=format&fit=crop&w=634&q=80" alt="#" className="display-card__img" />
      </div>
      <Link to={`${props.history.location.pathname}/${props.sectionData.sectionId}`} className="display-card__body">
        <h4 className="display-card__title">{props.sectionData.sectionTitle}</h4>
      </Link>
      <button type="button" data-id={props.title} data-type="project" onClick={props.dataTest} className="display-card__settings">
      <i className="fas fa-cog"></i>
      </button>
    </li>
  );
}

export default StyleGuideView;

const StyleGuideNav = (props) => {
  return(
    <nav className={`nav--auth ${props.toggle ? "open" : ''}`}>
      <div className="nav--auth__header">
        <div className="nav--auth__toggle"
             onClick={props.toggleNav}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="nav--auth__header__btns">
          <Link to={`/dashboard/${props.match.params.projectId}`} className="nav--auth__header__btn">
          <i className="fas fa-project-diagram"></i>
            <span>Project</span>
          </Link>
          <Link to="/dashboard" className="nav--auth__header__btn">
            <i className="fas fa-th"></i>
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
      <div className="nav--auth__body">
        <h4 className="section__heading--quatro">What do you want to do with your styleGuide?</h4>
        <button type="button" className="btn primary breath">Edit</button>
        <button type="button" className="btn danger breath">Delete</button>
      </div>
    </nav>
  );
}