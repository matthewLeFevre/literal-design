import React, { Component } from 'react';
import Globals from '../../../services/Global_service';
const Global = new Globals();

class ItemSelect extends Component {
  constructor(props) {
    super(props);
    this.createTextBox = this.createTextBox.bind(this);
    this.createHeading = this.createHeading.bind(this);
    this.createColorPallet = this.createColorPallet.bind(this);
    this.createFont = this.createFont.bind(this);
    this.createImage = this.createImage.bind(this);
    this.createNotice = this.createNotice.bind(this);
    this.createCode = this.createCode.bind(this);
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
   * Create a Font
   */

  createFont() {
    let data = {
      'sectionId': this.props.sectionId,
      'itemOrder': this.props.nextOrder,
      'apiToken': this.props.userData.apiToken,
      'fontUrl': '...',
      'fontFamily': '...'
    }
    let req = Global.createRequestBody('font', 'createFont', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    })
  }

  /**
   * Create Image
   */

  createImage() {
    let data = {
      'sectionId': this.props.sectionId,
      'itemOrder': this.props.nextOrder,
      'apiToken': this.props.userData.apiToken,
      'imageUrl': 'https://images.unsplash.com/photo-1455612693675-112974d4880b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1bfd8c33e1555c36e3de6e95303503d7&auto=format&fit=crop&w=1050&q=80',
    }
    let req = Global.createRequestBody('image', 'createImage', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    })
  }

  /**
   * Create Notice
   */
  createNotice() {
    let data = {
      'sectionId': this.props.sectionId,
      'itemOrder': this.props.nextOrder,
      'apiToken': this.props.userData.apiToken,
      'noticeText': 'New notice',
    }
    let req = Global.createRequestBody('notice', 'createNotice', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    })
  }
  /**
   * Create Code
   */
  createCode() {
    let data = {
      'sectionId': this.props.sectionId,
      'itemOrder': this.props.nextOrder,
      'apiToken': this.props.userData.apiToken,
      'codeLanguage': 'html',
      'codeMarkup': 'Choose your language above and get to it!'
    }
    let req = Global.createRequestBody('code', 'createCode', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    })
  }
  /**
   * Create Component
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
            <li className="itemSelect__item"
                onClick={this.createFont}>
              <i className="fas fa-font"></i>
              <span>Font</span>
            </li>
            <li className="itemSelect__item"
                onClick={this.createImage}>
              <i className="fas fa-image"></i>
              <span>Image</span>
            </li>
            <li className="itemSelect__item"
              onClick={this.createColorPallet}>
              <i className="fas fa-th-large"></i>
              <span>Pallet</span>
            </li>
            <li className="itemSelect__item"
              onClick={this.createNotice}>
              <i className="fas fa-comments"></i>
              <span>Notice</span>
            </li>
            <li className="itemSelect__item"
                onClick={this.createCode}>
              <i className="fas fa-code"></i>
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