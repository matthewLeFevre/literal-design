import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import EditableTextBox from '../../reusable/EditableTextBox_comp';

import Globals from '../../services/Global_service';

const Global = new Globals();

class SectionView extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.saveCompleted = this.saveCompleted.bind(this);
    this.state = {
      components: [
        {type: "heading", text: "This is a heading", order: "1", id:"kljlaisfj"},
        {type: "text_box", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elitx ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", order: "2", id:"kljlaisfj"},
        {type: "text_box", text: "This is the content of my text box", order: "2", id:"kljlaisfj"},
        {type: "text_box", text: "This is the content of my text box", order: "2", id:"kljlaisfj"},
        {type: "color_pallet", order: "3", id:"kljlaisfj"},
        // {type: "image", src:"https://images.unsplash.com/photo-1537027277825-12f85d063e6e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=498521c2590a48c2ad84aa2d1c42ad62&auto=format&fit=crop&w=700&q=80", order:"4", id:"somethingrandom"}
      ],
      save: false,
    }

    this.saveData = this.saveData.bind(this);
  }

  saveData (e) {
    let value = e.target.value;
  }

  handleSave() { this.setState({save: true}); }

  saveCompleted() { 
    this.setState({save: false});
    this.props.history.goBack; 
  }

  render() {
    let editToggle = "";
    let addToggle ="";

    if(this.props.edit) {
      editToggle = <button type="button" onClick={this.handleSave} className="section__btn--edit btn primary icon tiny">
                    <i className="fas fa-save"></i>
                  </button>;
      addToggle = <button type="button" className="btn adder initial">
                    <i className="fas fa-plus-circle"></i>
                  </button>;
    } else {
      editToggle = <Link to={`${this.props.history.location.pathname}/edit`} className="section__btn--edit btn action icon tiny">
                    <i className="fas fa-pen"></i>
                  </Link>;
    }

    return(
      <div className="col--12">
        {editToggle}
        { this.state.components
          ? this.state.components.map(
            (component) => {
              switch(component.type) {
                case "heading":
                  return <SectionHeading save={this.state.save} saveCompleted={this.saveCompleted} edit={this.props.edit} key={Global.createRandomKey()} HeadingData={component} />;
                  break;
                case "text_box":
                  return <SectionTextBox save={this.state.save} saveCompleted={this.saveCompleted} edit={this.props.edit} key={Global.createRandomKey()} textBoxData={component} />;
                  break;
                case "color_pallet":
                  return <SectionColorPallet edit={this.props.edit} key={Global.createRandomKey()} colorPalletData={component} />;
                  break;
                case "font":
                  return <SectionFont edit={this.props.edit} key={Global.createRandomKey()} FontData={component} />;
                  break;
                case "code_component":
                  return <SectionCodeComponent edit={this.props.edit} key={Global.createRandomKey()} componentData={component} />;
                  break;
                case "image":
                  return <SectionImage edit={this.props.edit} key={Global.createRandomKey()} ImageData={component} />;
                  break;
                default:
                  return '';
                  break;
              }
            }
          )
        : ''}
        {addToggle}
      </div>
    );
  }
}

export default SectionView;

const SectionHeading = (props) => {
  if(!props.edit) {
    return (
      <div className="section__heading__wrapper">
        <h3 className="section__heading">{props.headingData.text}</h3>
      </div>
    );
  } else {
    return (
      <div className="section__heading__wrapper">
        <span className="section__tag">Heading</span>
        <input type="text" onChange={props.saveData}  className="mdm input--text full" defaultValue={props.data.text} />
      </div>
    );
  }
}

const SectionTextBox = (props) => {
  if(!props.edit) {
    return(
      <div className="section__text-box">
        {props.data.text}
      </div>
    );
  } else {
    return(
      <div className="section__text-box">
        <span className="section__tag">Text Box</span>
        <EditableTextBox data={props.data.text} saveData={props.saveData} />
      </div>
      
    );
  }
  
}
const SectionImage = (props) => {
  return <img className="section__img" src={props.data.src} />
}
class SectionColorPallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [
        {title: Global.createRandomKey(), order: "1", showTitle: true},
        {title: Global.createRandomKey(), order: "2", showTitle: true},
        {title: Global.createRandomKey(), order: "3", showTitle: true},
      ],
    }
  }
  render(){
    return (
    <div className="section__color-pallet"></div>
    )
  }
}
const SectionFont = (props) => {
  return (
  <div></div>);
}
const SectionCodeComponent = (props) => {
  return <div></div>
}
const SectionColorRow = (props) => {
  return <div></div>
}
const SectionColorSwatch = (props) => {
  return <div></div>
}
