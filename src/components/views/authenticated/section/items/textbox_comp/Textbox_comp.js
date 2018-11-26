import React, { Component } from 'react';
import Globals from '../../../../../services/Global_service';

const Global = new Globals();

class TextBox extends Component {
  constructor(props) {
    super(props);
    this.deleteTextBox = this.deleteTextBox.bind(this);
    this.updateTextBox = this.updateTextBox.bind(this);
    this.onChange = this.onChange.bind(this);
    this.textBoxText = React.createRef();
    this.cancelEditTextBox = this.cancelEditTextBox.bind(this);
    this.editTextBox = this.editTextBox.bind(this);

    this.state ={
      textBoxText: '',
      itemOrder: 0,
      edit: false,
    }
  }

  editTextBox() {
    this.setState({
      edit: true,
    })
  }

  cancelEditTextBox() {
    this.setState({
        edit: false,
    });
  }

  componentDidMount() {
    this.setState({
      textBoxText:this.props.textBox.textBoxText,
      itemOrder: this.props.textBox.itemOrder,
    }, () => this.textBoxText.current.innerHTML = Global.htmlDecode(this.state.textBoxText));
  }

  deleteTextBox() {
    let data = {
      'textBoxId': this.props.textBox.textBoxId,
      'sectionId': this.props.textBox.sectionId,
      'apiToken': this.props.userData.apiToken,
    }
    let req = Global.createRequestBody('textBox', 'deleteTextBox', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    })
  }

  updateTextBox() {
    let data = {
      'textBoxId': this.props.textBox.textBoxId,
      'sectionId': this.props.textBox.sectionId,
      'apiToken': this.props.userData.apiToken,
      'textBoxText': this.textBoxText.current.innerHTML,
      'itemOrder': this.state.itemOrder,
    }
    let req = Global.createRequestBody('textBox', 'updateTextBox', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      console.log(res.data);
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    })
  }

  onChange(e) {
    this.setState({
      textBoxText: this.textBoxText.current.innerHTML,
    });
  }

  handleEdit(e) {
    let action = e.target.value;
    if (action === 'createlink') {
      let url = prompt('Enter the link here: ', 'http://');
      document.execCommand(action, false, url);
    } else {
      document.execCommand(action, false, null);
    }
  }

  render(){
    return (
      <fieldset className="section--edit__fieldset">
      {this.state.edit ? <label className="section--edit__label">Textbox</label> : ''}
        <div className="section--edit__group">
          <div className="section--edit__nav">
            <div className="section--edit__nav--btn grab">
              <i className="fas fa-th txt-blue"></i>
            </div>
            {this.state.edit 
              ? <div className="section--edit__nav--btn" onClick={this.state.edit ? this.cancelEditTextBox : this.editTextBox}>
                  <span title="Close Editing"><i className="fas fa-times txt-red"></i></span> 
                </div>
              : ''}
            {this.state.edit ? ''
              : <div className="section--edit__nav--btn" onClick={this.state.edit ? this.cancelEditTextBox : this.editTextBox}>
                  <span title="Edit Textbox"><i className="fas fa-edit txt-green"></i></span>
                </div>}
          </div>
          <div className={`section--edit__textBox ${this.state.edit ? 'editing' : ''}`} 
          onInput={this.onChange} 
          contentEditable={this.state.edit ? true : false} 
          ref={this.textBoxText}
          >
          </div>
          { this.state.edit ? 
            <button type="button" title="delete textbox" className="section--edit__btn" onClick={this.deleteTextBox}>
              <i className="fas fa-times"></i>
            </button>
          : ''}
        </div>
          <div className={this.state.edit ? "textbox-edit__toolbar" : "display-none"}>
            <p className="textbox-edit__button icon primary">Formatting</p>
            <button value="bold" onClick={this.handleEdit} type="button" className="textbox-edit__button icon primary"><i className=' fas fa-bold'></i></button>
            <button value="italic" onClick={this.handleEdit} type="button" className="textbox-edit__button icon primary"><i className=' fas fa-italic'></i></button>
            <button value="underline" onClick={this.handleEdit} type="button" className="textbox-edit__button icon primary"><i className=' fas fa-underline'></i></button>
            <button value="insertUnorderedList" onClick={this.handleEdit} type="button" className="textbox-edit__button icon primary"><i className="fas fa-list-ul"></i></button>
            <button value="insertOrderedList" onClick={this.handleEdit} type="button" className="textbox-edit__button icon primary"><i className="fas fa-list-ol"></i></button>
            <button value="createlink" onClick={this.handleEdit} type="button" className="textbox-edit__button icon primary"><i className="fas fa-link"></i></button>
          </div>
        { this.state.edit ? <div className="section--edit__fieldset">
          <button type="button" 
            className="btn success breath" 
            onClick={this.updateTextBox}>Save</button>
        </div> : ''}
      </fieldset>
    );
  }
}

export default TextBox;

