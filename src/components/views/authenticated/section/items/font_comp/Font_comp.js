import React, { Component } from 'react';
import Globals from '../../../../../services/Global_service';

const Global = new Globals();

class Font extends Component {
  constructor(props) {
    super(props);
    this.editFont = this.editFont.bind(this);
    this.updateFont = this.updateFont.bind(this);
    this.deleteFont = this.deleteFont.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      fontFamily: "",
      fontUrl: "",
      itemOrder: 0,
      edit: false
    }
  }
  componentDidMount() {
    const fontFamily = Global.htmlDecode(this.props.font.fontFamily)
    this.setState({
      fontFamily: fontFamily,
      fontUrl: this.props.font.fontUrl,
      itemOrder: this.props.font.itemOrder,
    });
  }
  editFont() {
    this.setState( prevState => ({
      edit: !prevState.edit,
    }));
  }
  updateFont(){
    const data = {
      'sectionId': this.props.font.sectionId,
      'fontId': this.props.font.fontId,
      'apiToken': this.props.userData.apiToken,
      'fontUrl': this.state.fontUrl,
      'fontFamily': this.state.fontFamily,
      'itemOrder': this.props.font.itemOrder,
    }
    const req = Global.createRequestBody('font', 'updateFont', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    });
  }
  deleteFont(){
    const data = {
      'sectionId': this.props.font.sectionId,
      'fontId': this.props.font.fontId,
      'apiToken': this.props.userData.apiToken,
    }
    const req = Global.createRequestBody('font', 'deleteFont', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    });
  }
  onChange(e){
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  render(){
    return(<fieldset className="section--edit__fieldset">
    {this.state.edit ? <label className="section--edit__label">Font</label> : ''}
      <div className="section--edit__group">
      <div className="section--edit__nav">
          <div className="section--edit__nav--btn grab">
            <i className="fas fa-th txt-blue"></i>
          </div>
          {this.state.edit 
            ? <div className="section--edit__nav--btn" onClick={this.editFont}>
                <span title="Close Editing"><i className="fas fa-times txt-red"></i></span> 
              </div>
            : ''}
          {this.state.edit ? ''
            : <div className="section--edit__nav--btn" onClick={this.editFont}>
                <span title="Edit Heading"><i className="fas fa-edit txt-green"></i></span>
              </div>}
        </div>          
          {this.state.edit 
          ? <div className="font-edit__fieldset">
            <label className="section--edit__label">Font Url</label>
            <input type="text" 
            name="fontUrl"
            onChange={this.onChange}
            readOnly={this.state.edit ? false : true}
            className='font-edit__input'
            defaultValue={this.state.fontUrl} />
            <label className="section--edit__label">Font Family</label> 
            <input type="text" 
              name="fontFamily"
              onChange={this.onChange}
              readOnly={this.state.edit ? false : true}
              className={`font-edit__input`} 
              defaultValue={this.state.fontFamily} /></div> : ''}

          {!this.state.edit 
            ? <div className="font-edit__fieldset">
              <style>
                @import url({this.state.fontUrl});
              </style>
              
              <span className="font-edit__text" style={{fontFamily: this.state.fontFamily}}>A B C D E F G 1 2 3 4 5 ! @ # $ %</span>
            </div> :''}
        { this.state.edit ? 
          <button type="button" className="section--edit__btn" onClick={this.deleteFont}>
            <i className="fas fa-times"></i>
          </button>
          : ''}
      </div>
      { this.state.edit ? <div className="section--edit__fieldset">
        <button type="button" 
          className="btn success breath" 
          onClick={this.updateFont}>Save</button>
      </div> : ''}
    </fieldset>)
  }
}

export default Font;