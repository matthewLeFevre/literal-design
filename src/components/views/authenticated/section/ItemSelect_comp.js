import React, { Component } from 'react';
import Globals from '../../../services/Global_service';
const Global = new Globals();

class ItemSelect extends Component {
  constructor(props) {
    super(props);
    this.createTextBox = this.createTextBox.bind(this);
    this.createHeading = this.createHeading.bind(this);
    this.createColorPallet = this.createColorPallet.bind(this);
  }

    /**
   * Creates a textbox
   */
  createTextBox() {
    let data = {
      'sectionId': this.props.sectionId,
      'textBoxText': "...",
      'itemOrder': this.props.nextOrder,
      'apiToken': this.props.userData.apiToken,
    }
    let req = Global.createRequestBody('textBox', 'createTextBox', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    })
  }

  /**
   * Creates a new heading
   */
  createHeading() {
    let data = {
      'sectionId': this.props.sectionId,
      'headingText': '...',
      'itemOrder': this.props.nextOrder,
      'apiToken': this.props.userData.apiToken,
    }
    let req = Global.createRequestBody('heading', 'createHeading', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    })
  }

  /**
   * Creates a color Pallet
   */
  createColorPallet() {
    let data = {
      'sectionId': this.props.sectionId,
      'itemOrder': this.props.nextOrder,
      'apiToken': this.props.userData.apiToken,
    }
    let req = Global.createRequestBody('colorPallet', 'createColorPallet', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    })
  }

  /**
   * @todo Create Font 
   * @todo Create code block
   * @todo Create Notification
   */

  render() {
    return (
      <div className="modal__container">
        <section className="itemSelect">
          <ul className="itemSelect__list">
            <li className="itemSelect__item"
              onClick={this.createHeading}>
              <i className="fas fa-heading"></i>
              <span>Heading</span>
            </li>
            <li className="itemSelect__item"
              onClick={this.createTextBox}>
              <i className="fas fa-vector-square"></i>
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
            <li className="itemSelect__item"
              onClick={this.createColorPallet}>
              <i className="fas fa-th-large"></i>
              <span>Pallet</span>
            </li>
            <li className="itemSelect__item">
              <i className="fas fa-th-large"></i>
              <span>Code</span>
            </li>
          </ul>
          <fieldset className="form__field">
            <button onClick={this.props.toggleItem} 
            className="btn danger full breath" 
            type="button" >Cancel Select</button>
          </fieldset>
        </section>
      </div>
    );
  }
}

export default ItemSelect;