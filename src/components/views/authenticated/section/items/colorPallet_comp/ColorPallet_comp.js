import React, { Component } from 'react';
import Globals from '../../../../../services/Global_service';
import SwatchCreator from './SwatchCreator_comp';

const Global = new Globals();

class colorPallet extends Component {
  constructor(props) {
    super(props);
    this.deleteColorPallet = this.deleteColorPallet.bind(this);
    this.editColorPallet = this.editColorPallet.bind(this);
    this.createColorSwatch = this.createColorSwatch.bind(this);
    this.deleteColorSwatch = this.deleteColorSwatch.bind(this);
    this.toggleSwatch = this.toggleSwatch.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      itemOrder: 0,
      edit: false,
      swatch: false,
      hex: '',
      var: '',
      rgb: '',
      title: '',
    }
  }

  editColorPallet() {
    this.setState( prevState => ({
      edit: !prevState.edit,
    }));
  }

  componentDidMount() {
    this.setState({
      itemOrder: this.props.colorPallet.itemOrder,
    });
  }

  //thowing errors

  deleteColorPallet() {
    let data = {
      'colorPalletId': this.props.colorPallet.colorPalletId,
      'sectionId': this.props.colorPallet.sectionId,
      'apiToken': this.props.userData.apiToken,
    }
    let req = Global.createRequestBody('colorPallet', 'deleteColorPallet', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    });
  }

  createColorSwatch () {
    let data = {
      'colorPalletId': this.props.colorPallet.colorPalletId,
      'sectionId': this.props.colorPallet.sectionId,
      'apiToken': this.props.userData.apiToken,
      'itemOrder': "1",
      'colorSwatchTitle': this.state.title,
      'colorSwatchHex': this.state.hex,
      'colorSwatchRgb': this.state.rgb,
      'colorSwatchVar': this.state.var,
    }
    let req = Global.createRequestBody('colorPallet', 'createColorSwatch', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    });
  }

  deleteColorSwatch(e) {
    let data = {
      'colorSwatchId': e.target.value,
      'sectionId': this.props.colorPallet.sectionId,
      'apiToken': this.props.userData.apiToken,
    }
    let req = Global.createRequestBody('colorPallet', 'deleteColorSwatch', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    });
  }

  onChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  toggleSwatch () {
    this.setState( prevState => ({
      swatch: !prevState.swatch,
    }));
  }
  render(){
    console.log(this.props.colorPallet);
    return (
      <fieldset className="section--edit__fieldset colorPallet-edit">
      {this.state.edit ? <label className="section--edit__label">Color Pallet</label> : ''}
        <div className="section--edit__group">
          <div className="section--edit__nav">
            <div className="section--edit__nav--btn grab">
              <i className="fas fa-th txt-blue"></i>
            </div>
            {this.state.edit 
              ? <div className="section--edit__nav--btn" onClick={this.editColorPallet}>
                  <span title="Close Editing"><i className="fas fa-times txt-red"></i></span> 
                </div>
              : ''}
            {this.state.edit ? ''
              : <div className="section--edit__nav--btn" onClick={this.editColorPallet}>
                  <span title="Edit colorPallet"><i className="fas fa-edit txt-green"></i></span>
                </div>}
          </div>
          <div className={`section--edit__colorPallet ${this.state.edit ? 'editing' : ''}`} >
              <div className="section--edit__colorGroup">
                {this.props.colorPallet.colorSwatches.map( swatch => {
                  return (<ColorSwatch edit={this.state.edit} deleteSwatch={this.deleteColorSwatch} key={Global.createRandomKey()} swatch={swatch} />);
                })}
                {this.state.edit 
                  ? <button type="button" 
                    title="Create New Color Swatch"
                    className="swatch-create__btn" 
                    onClick={this.toggleSwatch}>
                      <i className="fas fa-plus-circle"></i>
                    </button> : ''}
              </div>
          </div>
          { this.state.edit ? 
            <button type="button" title="delete colorPallet" className="section--edit__btn" onClick={this.deleteColorPallet}>
              <i className="fas fa-times"></i>
            </button>
            : ''}
        </div>
        {this.state.swatch ? <SwatchCreator onChange={this.onChange} toggleSwatch={this.toggleSwatch} createSwatch={this.createColorSwatch}/> : ''}
      </fieldset>
    );
  }
}

export default colorPallet;

const ColorSwatch = (props) => {
  return (
     props.swatch.colorSwatchHex ? <figure className="section--edit__colorSwatch">
      <div className="section--edit__colorSwatch__fill" style={{backgroundColor: props.swatch.colorSwatchHex}}></div>
      <figcaption className="section--edit__colorSwatch__detail">
        { props.swatch.colorSwatchTitle ? <span className="section--edit__colorSwatch__title">{props.swatch.colorSwatchTitle}</span> : ''}
        <span className="section--edit__colorSwatch__hex">{props.swatch.colorSwatchHex}</span>
        { props.swatch.colorSwatchVar ? <span  className="section--edit__colorSwatch__var">{props.swatch.colorSwatchVar}</span> : ''}
        { props.swatch.colorSwatchRgb ? <span  className="section--edit__colorSwatch__rgb">{props.swatch.colorSwatchRgb}</span> : ''}
        { props.edit ? <button type="button" 
                               className="btn breath danger tiny spacing--1" 
                               value={props.swatch.colorSwatchId} 
                               onClick={props.deleteSwatch}>Delete</button> : ''}
      </figcaption>
    </figure> : <div />
  );
}



