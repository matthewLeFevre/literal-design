import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';

import EditableTextBox from '../../reusable/EditableTextBox_comp';

import Globals from '../../services/Global_service';
import SectionHeader from '../../components/SectionHeader_comp';

const Global = new Globals();

class SectionView extends Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      items: [],
      section: {},
      sections: [],
      save: false,
      toggle: false,
    }
  }

  toggleNav() {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }))
  }

  addItem(e) {
    let item = e.target.value;

  }

  componentDidMount() {
    // grabs the indivudual section
    fetch(`${Global.url}?controller=section&action=getSectionAndItemsBySectionId&sectionId=${this.props.match.params.sectionId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        items: res.data.items,
        section: res.data.section[0],
      });
    });

    // Grabs all other sections
    fetch(`${Global.url}?controller=section&action=getSectionsByStyleGuideId&styleGuideId=${this.props.match.params.styleGuideId}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        sections: res.data,
      });
    });
  }
  render() {
    return(
      <div className="col--12 grid--nested">
        <SectionHeader match={this.props.match} section={this.state.section} toggleNav={this.toggleNav}/>
        <SectionNav match={this.props.match} sections={this.state.sections} toggleNav={this.toggleNav} toggle={this.state.toggle} section={this.state.section}/>
        <form className="section--edit__view col--12 col--sml--8">
          <h2>{this.state.section.sectionTitle}</h2>
          { this.state.items.map((item) =>{
            if(item.itemType === "heading") {
              return <HeadingEdit heading={item}  key={Global.createRandomKey()}/>;
            } else if(item.itemType === "textBox") {
              return <TextBoxEdit textBox={item}  key={Global.createRandomKey()}/>;
            } else if(item.itemType === "image") {
              return (<ImageEdit image={item}  key={Global.createRandomKey()}/>);
            } else if(item.itemType === "colorPallet") {
              return <ColorPalletEdit colorPallet={item} key={Global.createRandomKey()}/>;
            } else if(item.itemType === "font") {
              return <FontEdit font={item}  key={Global.createRandomKey()}/>;
            }
          })
          
        }
          <button onClick={this.createSection} type="button" className="btn adder initial">
            <i className="fas fa-plus-circle"></i>
          </button>
        </form>
      </div>
    );
  }
}

export default SectionView;

const HeadingEdit = (props) => {
  return (
    <fieldset className="section--edit__fieldset">
      <label className="section--edit__label">Heading</label>
      <div className="section--edit__group">
        <input type="text" className="section--edit__heading" defaultValue={props.heading.headingText} />
        <button type="button" className="section--edit__btn">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </fieldset>
  );
}
const TextBoxEdit = (props) => {
  return (
    <fieldset className="section--edit__fieldset">
      <label className="section--edit__label">Textbox</label>
      <div className="section--edit__group">
        <div className="section--edit__textBox" contentEditable defaultValue={props.textBox.textBoxText}></div>
        <button type="button" className="section--edit__btn">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </fieldset>
  );
}
const FontEdit = (props) => {}
const ImageEdit = (props) => {}
const ColorPalletEdit = (props) => {}

const SectionNav = (props) => {
  return(
    <nav className={`nav--auth ${props.toggle ? "open" : ''}`}>
      <div className="nav--auth__header">
        <div className="nav--auth__toggle"
             onClick={props.toggleNav}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <div className="nav--auth__header__btns">
          <Link to={`/dashboard/${props.match.params.projectId}/${props.match.params.styleGuideId}`} className="nav--auth__header__btn">
          <i className="fas fa-mortar-pestle"></i>
            <span>Style Guide</span>
          </Link>
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
        <h4 className="section__heading--quatro">StyleGuide Sections</h4>
        <ul className="section__nav__list">
          {props.sections.map( section => {
            return(<li key={Global.createRandomKey()} >
              <NavLink activeClassName="active" className="section__nav__link" 
                    onClick={props.toggleNav} 
                    to={`/dashboard/${props.match.params.projectId}/${props.match.params.styleGuideId}/${section.sectionId}`}>{section.sectionTitle}</NavLink></li>)
          })}
        </ul>
        <h4 className="section__heading--quatro">What do you want to do with your section?</h4>
        <button type="button" className="btn primary breath">Edit</button>
        <button type="button" className="btn danger breath">Delete</button>
      </div>
    </nav>
  );
}