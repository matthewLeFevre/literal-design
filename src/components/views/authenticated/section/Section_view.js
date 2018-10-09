import React, { Component } from 'react';
import {Link, NavLink} from 'react-router-dom';

import Globals from '../../../services/Global_service';
import SectionHeader from './SectionHeader_comp';

const Global = new Globals();

class SectionView extends Component {
  constructor(props) {
    super(props);
    this.toggleNav = this.toggleNav.bind(this);
    this.editSection = this.editSection.bind(this);
    this.cancelEditSection = this.cancelEditSection.bind(this);
    this.saveSection = this.saveSection.bind(this);
    this.handleSection = this.handleSection.bind(this);
    this.state = {
      items: [],
      sectionId: '',
      sectionTitle: '',
      itemOrder: '',
      sectionCreated: '',
      sectionDescription: '',
      edit: false,
      sections: [],
      save: false,
      toggle: false,
    }
  }

  componentDidMount() {
    // grabs the indivudual section
    fetch(`${Global.url}?controller=section&action=getSectionAndItemsBySectionId&sectionId=${this.props.match.params.sectionId}`)
    .then(res => res.json())
    .then(res => {
      console.log(res.data.section[0]);
      this.setState({
        items: res.data.items,
        sectionId: res.data.section[0].sectionId,
        sectionTitle: res.data.section[0].sectionTitle,
        sectionCreated: res.data.section[0].sectionCreated,
        sectionDescription: 'section descriptions are not yet implimented',
        itemOrder: res.data.section[0].itemOrder,
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
  
  toggleNav() {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }))
  }
  deleteSection(e) {
    let data = {'sectionId': e.target.value, 
                'styleGuideId': this.state.styleGuide.styleGuideId, 
                'apiToken': this.props.userData.apiToken};
    let body = Global.createBody('section', 'deleteSection', data);
    let req = Global.createRequest(body);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.setState({
          sections: res.data,
        });
      }
    })
  }

  handleSection(e) {
    let input = e.target.name;
    if(input === "sectionTitle"){
      this.setState({sectionTitle: e.target.value});
    } else {
      this.setState({section: {sectionDescription: e.target.value}});
    }
  }

  saveSection() {
    let data = {
      userId: this.props.userData.userId,
      sectionId: this.state.sectionId,
      sectionTitle: this.state.sectionTitle,
      // sectionDescription: this.state.sectionDescription,
      apiToken: this.props.userData.apiToken,
      itemOrder: this.state.itemOrder,
    }
    let req = Global.createRequestBody('section', 'updateSection', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.setState({
          section: res.data,
          edit: false,
        });
        fetch(`${Global.url}?controller=section&action=getSectionsByStyleGuideId&styleGuideId=${this.props.match.params.styleGuideId}`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            sections: res.data,
          });
        });
      }
    }); 
  }

  editSection() {
    console.log(this.state);
    this.setState({
      edit: true,
  });
  }

  cancelEditSection() {
    this.setState({
        edit: false,
    });
  }
  
  render() {
    return(
      <div className="col--12 grid--nested">
        <SectionHeader match={this.props.match} section={this.state} toggleNav={this.toggleNav}/>
        <SectionNav match={this.props.match} sections={this.state.sections} toggleNav={this.toggleNav} toggle={this.state.toggle} section={this.state.section}/>
        <form className="section--edit__view col--12 col--sml--8">
          <fieldset className="section--edit__fieldset">
            {this.state.edit ? <label className="section--edit__label">Section Title</label> : ''}
            <div className="section--edit__group">
              <input className={this.state.edit ? "section--edit__heading--field" : "section--edit__heading--field readonly"}
                      readOnly={this.state.edit ? false : true} 
                      onChange={this.handleSection}
                      name='sectionTitle'
                      defaultValue={this.state.sectionTitle}/>
            </div>
          </fieldset>
          <fieldset className="section--edit__fieldset">
            {this.state.edit ? <label className="section--edit__label">Section Description</label> : ''}
            <div className="section--edit__group">
            {/* Default values are not working on this text area :( curfuddles... */}
              <textarea className={this.state.edit ? "section--edit__description--field" : "section--edit__description--field readonly"} 
                        readOnly={this.state.edit ? false : true} 
                        placeholder="Edit to give this section a description"
                        onChange={this.handleSection}
                        >{this.state.sectionDescription}</textarea>
            </div>
          </fieldset>

          <fieldset className={`section--edit__fieldset ${this.state.edit ? 'edit' : ''}`}>
              <button type="button"
              className={`btn breath ${this.state.edit ?  'success': 'primary icon'}`} 
              onClick={this.state.edit ? this.saveSection : this.editSection}>
                {this.state.edit ? 'Save Section Info' : <span><i className="fas fa-edit"></i>&nbsp;Edit</span>}
              </button>
              {this.state.edit ? 
                <button type="button"
                className='btn breath danger'
                onClick={this.cancelEditSection}>
                  Cancel
                </button>
              :''}
              
          </fieldset>

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

class ItemSelect extends Component {
  render() {
    return (
      <section class="itemSelect">
        <ul className="itemSelect__list">
          <li className="itemSelect__item">
            <i className="fas fa-heading"></i>
            <span>Heading</span>
          </li>
          <li className="itemSelect__item">
            <i class="fas fa-vector-square"></i>
            <span>Textbox</span>
          </li>
          <li className="itemSelect__item">
            <i className="fas fa-font"></i>
            <span>Font</span>
          </li>
          <li className="itemSelect__item">
            <i className="fas fa-image"></i>
            <span>Image</span>
          </li>
          <li className="itemSelect__item">
            <i class="fas fa-th-large"></i>
            <span>Color Pallet</span>
          </li>
        </ul>
      </section>
    );
  }
}

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