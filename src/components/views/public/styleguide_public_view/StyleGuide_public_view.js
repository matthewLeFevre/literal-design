import React from 'react';
import Globals from '../../../services/Global_service';
import {Link} from 'react-router-dom';

const Global = new Globals();

class StyleGuideLiveView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleGuide: {},
      sections: []
    }
  }
  componentDidMount() {
    fetch(`${Global.url}?controller=styleGuide&action=getStyleGuideById&styleGuideId=${this.props.match.params.styleGuideId}`)
    .then(res => res.json()) 
    .then(res => {
      this.setState({
        styleGuide: res.data[0][0],
        sections: res.data[1]
      });
    }) 
  }
  render() {
    return (
      <section className="col--12 page__full-height styleGuide--live__container">
        <div className="styleGuide--live__view">
          <div className="styleGuide--live__information">
            <h1>{this.state.styleGuide.styleGuideTitle}</h1>
            <p>{this.state.styleGuide.styleGuideDescription}</p>
          </div>
          <div className="sections__container">
            <ul className="styleGuide--live__list">
                {this.state.sections.map( section => {
                  return (<li key={Global.createRandomKey()}>
                    <Link to={`/styleguides/detail/${this.props.match.params.styleGuideId}/${section.sectionId}`}>{section.sectionTitle}</Link>
                  </li>);
                })}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

export default StyleGuideLiveView;