import React from 'react';
import Globals from '../services/Global_service';

const Global = new Globals();

class StyleGuidesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleGuides: [],
    }
  }
  componentDidMount() {
    fetch(`${Global.url}?controller=styleGuide&action=getPublicStyleGuides`)
    .then(res => res.json()) 
    .then(res => {
      console.log(res);
      this.setState({
        styleGuides: res.data,
      });
    })
  }
  render() {
    return (
      <section className="col--12">
        <div className="search__bar bg-theme-red">
          <label className="form__label">Search StyleGuides</label>
          <input type="text" className="input--text spacing--left--1" placeholder="Lienary Guide..." />
        </div>
        <div className="styleGuides__container">
        {this.state.styleGuides.map( guide => {
            let date = new Date(guide.styleGuideCreated);
            return (
              <a href="#" className="styleGuides__entry" key={Global.createRandomKey()}>
                <h2 className="styleGuides__entry__title">{guide.styleGuideTitle}</h2>
                <span className="styleGuides__entry__date">{date.toDateString()}</span>
                <p className="styleGuides__entry__description">{guide.styleGuideDescription}</p>
              </a>
            );
          })}
        </div>
      </section>
    );
  }
}

export default StyleGuidesView;