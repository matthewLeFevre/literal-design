import React, { Component } from 'react';
import Globals from '../../../../services/Global_service';

const Global = new Globals();

class Heading extends Component {
  constructor(props) {
    super(props);
    this.deleteHeading = this.deleteHeading.bind(this);
    this.updateHeading = this.updateHeading.bind(this);
    this.onChange = this.onChange.bind(this);
    this.editHeading = this.editHeading.bind(this);
    this.state = {
      headingText: '',
      itemOrder: 0,
      edit: false,
    }
  }

  componentDidMount() {
    this.setState({
      headingText: this.props.heading.headingText,
      itemOrder: this.props.heading.itemOrder,
    });
  }

  editHeading() {
    this.setState( prevState => ({
      edit: !prevState.edit,
    }));
  }

  onChange(e) {
    this.setState({
      headingText: e.target.value,
    });
  }

  updateHeading(){
    let data = {
      'headingId': this.props.heading.headingId,
      'sectionId': this.props.heading.sectionId,
      'headingText': this.state.headingText,
      'itemOrder': this.state.itemOrder,
      'apiToken': this.props.userData.apiToken,
    };
    let req = Global.createRequestBody('heading', 'updateHeading', data);
    fetch(Global.url, req) 
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    });
  }

  deleteHeading(){
    let data = {
      'headingId': this.props.heading.headingId,
      'sectionId': this.props.heading.sectionId,
      'apiToken': this.props.userData.apiToken,
    };
    let req = Global.createRequestBody('heading', 'deleteHeading', data);
    fetch(Global.url, req) 
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    });
  }

  render(){
    return (
      <fieldset className="section--edit__fieldset">
      {this.state.edit ? <label className="section--edit__label">Heading</label> : ''}
        <div className="section--edit__group">
        <div className="section--edit__nav">
            <div className="section--edit__nav--btn grab">
              <i className="fas fa-th txt-blue"></i>
            </div>
            {this.state.edit 
              ? <div className="section--edit__nav--btn" onClick={this.editHeading}>
                  <span title="Close Editing"><i className="fas fa-times txt-red"></i></span> 
                </div>
              : ''}
            {this.state.edit ? ''
              : <div className="section--edit__nav--btn" onClick={this.editHeading}>
                  <span title="Edit Heading"><i className="fas fa-edit txt-green"></i></span>
                </div>}
          </div>
          <input type="text" 
            onChange={this.onChange}
            readOnly={this.state.edit ? false : true}
            className={`section--edit__heading ${this.state.edit ? 'editing' : ''}`} 
            defaultValue={this.props.heading.headingText} />
          <button type="button" className="section--edit__btn" onClick={this.deleteHeading}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        { this.state.edit ? <div className="section--edit__fieldset">
          <button type="button" 
            className="btn success breath" 
            onClick={this.updateHeading}>Save</button>
        </div> : ''}
      </fieldset>
    );
  }
}

export default Heading;