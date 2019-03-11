import React from 'react';
import Globals from '../../services/Global_service';
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
      <section className="col--12 page__full-height">
        <div className="search__bar bg-light">
          <label className="form__label">Search StyleGuides</label>
          <input type="text" className="input spacing--left--1" onChange={this.updateSearch} placeholder="Lienary Guide..." />
        </div>
        <div className="styleGuides__container">
        {this.state.styleGuides.map( guide => {
          if(this.state.search !== ''){
            if(guide.styleGuideTitle.includes(this.state.search)){
              let date = new Date(guide.styleGuideCreated);
              return (
                <div className="styleGuides__entry" key={Global.createRandomKey()}>
                <Link to={`/styleguides/detail/${guide.styleGuideId}`} className="styleGuide__entry__link" key={Global.createRandomKey()}>
                <div>
                    <h2 className="styleGuides__entry__title">{guide.styleGuideTitle}</h2>
                    <span className="styleGuides__entry__date">{date.toDateString()}</span>
                  </div>
                  { guide.styleGuideDescription 
                    ?<div>
                    <h3 className="txt-theme-red sml spacing--top--1">Description:</h3>
                      <p className="styleGuides__entry__description">{guide.styleGuideDescription}</p>
                    </div> : ''}
                </Link>
                <div className="styleGuide__entry__author">
                  <h4 className="sml"> Author:&nbsp;
                    <Link to="/login">{guide.userName}</Link>
                  </h4>
                </div>
              </div>
              );
            } else {
              return '';
            }
          } else {
            let date = new Date(guide.styleGuideCreated);
            return (
              <div className="styleGuides__entry" key={Global.createRandomKey()}>
                <Link to={`/styleguides/detail/${guide.styleGuideId}`} className="styleGuide__entry__link" key={Global.createRandomKey()}>
                <div>
                    <h2 className="styleGuides__entry__title">{guide.styleGuideTitle}</h2>
                    <span className="styleGuides__entry__date">{date.toDateString()}</span>
                  </div>
                  { guide.styleGuideDescription ?<div>
                    <h3 className="txt-theme-red sml spacing--top--1">Description:</h3>
                      <p className="styleGuides__entry__description">{guide.styleGuideDescription}</p>
                    </div> : ''}
                </Link>
                <div className="styleGuide__entry__author">
                  <h4 className="sml"> Author:&nbsp;
                    <Link to="/login">{guide.userName}</Link>
                  </h4>
                </div>
              </div>
                  
            );
          }
        })}
        </div>
      </section>
    );
  }
}

export default StyleGuidesView;