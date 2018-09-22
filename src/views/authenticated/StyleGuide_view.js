import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Globals from '../../services/Global_service';

const Global = new Globals();

class StyleGuideView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: [
        {title: "Introduction"},
        {title: "Color Guide"},
        {title: "Typography Guide"},
      ],
    }
  }
  render() {
    return(
      <div className="col--12 dashboard__section" id="projects">
        <div className="dashboard__section__heading">
          <h2 className="dashboard__section__title">{this.props.match.params.styleGuideTitle}</h2>
        </div>
        <div className="dashboard__section__sub-heading">
          <h3 className="dashboard__section__sub-title">Sections</h3>
        </div>
        <ul className="display-card__group">
          {this.state.sections.map(
            (guides) => {
              return <Sections history={this.props.history} key={Global.createRandomKey()} title={guides.title} dataTest={this.dataTest} />
            }
          )}
          <li>
            <button type="button" className="btn adder initial">
              <i className="fas fa-plus-circle"></i>
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

const Sections = (props) => {
  console.log(props.history);
  return(
    <li className="display-card">
      <div className="display-card__img__wrap">
        <img src="https://images.unsplash.com/photo-1519687231281-b25ebe1037c4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=53f92b745564a13d75475ce66455d209&auto=format&fit=crop&w=634&q=80" alt="#" className="display-card__img" />
      </div>
      <Link to={`${props.history.location.pathname}/${props.title}`} className="display-card__body">
        <h4 className="display-card__title">{props.title}</h4>
      </Link>
      <button type="button" data-id={props.title} data-type="project" onClick={props.dataTest} className="display-card__settings">
      <i className="fas fa-cog"></i>
      </button>
    </li>
  );
}

export default StyleGuideView;