import React from 'react';
import Globals from '../services/Global_service';
import {Link} from 'react-router-dom';

const Global = new Globals();

class StyleGuidesView extends React.Component {
  constructor(props) {
    super(props);
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      styleGuides: [],
      search: ''
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
  updateSearch(e) {
    let search = e.target.value;
    this.setState({
      search: search,
    })
  }
  render() {
    return (
      <section className="col--12">
        <div className="search__bar bg-light">
          <label className="form__label">Search StyleGuides</label>
          <input type="text" className="input--text spacing--left--1" onChange={this.updateSearch} placeholder="Lienary Guide..." />
        </div>
        <div className="styleGuides__container">
        {this.state.styleGuides.map( guide => {
          if(this.state.search !== ''){
            if(guide.styleGuideTitle.includes(this.state.search)){
              let date = new Date(guide.styleGuideCreated);
              return (
                <Link to={`/styleguides/detail/${guide.styleGuideId}`} className="styleGuides__entry" key={Global.createRandomKey()}>
                  <div>
                    <h2 className="styleGuides__entry__title">{guide.styleGuideTitle}</h2>
                    <span className="styleGuides__entry__date">{date.toDateString()}</span>
                  </div>
                  <p className="styleGuides__entry__description"><strong>Description :</strong> {guide.styleGuideDescription}</p>
                </Link>
              );
            } else {
              return '';
            }
          } else {
            let date = new Date(guide.styleGuideCreated);
            return (
              <Link to={`/styleguides/detail/${guide.styleGuideId}`} className="styleGuides__entry" key={Global.createRandomKey()}>
                <div>
                  <h2 className="styleGuides__entry__title">{guide.styleGuideTitle}</h2>
                  <span className="styleGuides__entry__date">{date.toDateString()}</span>
                </div>
                <p className="styleGuides__entry__description"><strong>Description :</strong> {guide.styleGuideDescription}</p>
              </Link>
            );
          }
        })}
        </div>
      </section>
    );
  }
}

export default StyleGuidesView;