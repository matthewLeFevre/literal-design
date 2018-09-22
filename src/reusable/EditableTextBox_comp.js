import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Globals from '../services/Global_service';

const Global = new Globals();

class EditableTextBox extends Component {
  constructor(props) {
    super(props);
    this.textBoxBody = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.dataChange = this.dataChange.bind(this);
    this.saveTextBox = this.saveTextBox.bind(this);
    this.state = {
      textBoxText: '',
    }
  }

  componentDidMount(){}
  componentWillReceiveProps(){
    if(this.props.save) {
      this.saveTextBox();
    }
  }

  /*
  Make a request to update the created textbox
  On success complete save On failure throw an error
  */
  saveTextBox() {
    let data = {
      textBoxId: this.props.textBoxData.textBoxId,
      textBoxText: this.state.textBoxText,
      apiToken: this.props.userData.apiToken
    }
    let body = Global.createBody('section', 'updateTextBox'. data);
    let req = Global.createRequest(body);

    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.saveCompleted();
      } else {
        // throw some sort of error
      }
    });
  }

  dataChange() {
    this.setState({textBoxText: this.textBoxBody.current.innerHTML});
  }
  handleChange(e) {
    let action = e.target.value;
    if (action === 'h2' ||
      action === 'h3' ||
      action === 'p') {
      document.execCommand('formatBlock', false, action);
    } else if (action === 'image') {
      this.toggleBodyImageSelect();
    } else if (action === 'createlink') {
      let url = prompt('Enter the link here: ', 'http://');
      document.execCommand(action, false, url);
    } else {
      document.execCommand(action, false, null);
    }
  }
  
  render() {
    return(
    <div>
      <EditableTextToolbar handleChange={this.handleChange} />
      <div 
        ref={this.textBoxBody}
        contentEditable
        name="textBoxContent"
        className="section__text-box__editor"
        onInput={this.dataChange}>{this.props.textBoxData}</div>
    </div>
    );
  }
}

export default EditableTextBox;

class EditableTextToolbar extends Component {
  render() {
    return (
      <div className="section__editor__toolbar">
        <button className="section__editor__toolbar__btn" 
          onClick={this.props.handleChange}
          value="bold">
          <i className=' fas fa-bold'></i>
        </button>
        <button className="section__editor__toolbar__btn" 
          onClick={this.props.handleChange}
          value="italic">
          <i className=' fas fa-italic'></i>
        </button>
        <button className="section__editor__toolbar__btn" 
          onClick={this.props.handleChange}
          value="underline">
          <i className=' fas fa-underline'></i>
        </button>
        <button className="section__editor__toolbar__btn" 
          onClick={this.props.handleChange}
          value="insertOrderedList">
          <i className="fas fa-list-ol"></i>
        </button>
        <button className="section__editor__toolbar__btn" 
          onClick={this.props.handleChange}
          value="insertunorderedList">
          <i className="fas fa-list-ul"></i>
        </button>
        <button className="section__editor__toolbar__btn" 
          onClick={this.props.handleChange}
          value="createlink">
          <i className="fas fa-link"></i>
        </button>
        <button className="section__editor__toolbar__btn" 
          onClick={this.props.handleChange}
          value="unlink">
          <i className="fas fa-unlink"></i>
        </button>
      </div>
    );
  }
}