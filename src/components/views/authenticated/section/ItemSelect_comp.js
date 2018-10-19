import React, { Component } from 'react';

class ItemSelect extends Component {
  render() {
    return (
      <div className="modal__container">
        <section className="itemSelect">
          <ul className="itemSelect__list">
            <li className="itemSelect__item"
              onClick={this.props.createHeading}>
              <i className="fas fa-heading"></i>
              <span>Heading</span>
            </li>
            <li className="itemSelect__item"
              onClick={this.props.createTextBox}>
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
              onClick={this.props.createColorPallet}>
              <i className="fas fa-th-large"></i>
              <span>Pallet</span>
            </li>
            <li className="itemSelect__item">
              <i className="fas fa-th-large"></i>
              <span>Code</span>
            </li>
          </ul>
          <fieldset className="form__field">
            <button onClick={this.props.closeItem} 
            className="btn danger full breath" 
            type="button" >Cancel Select</button>
          </fieldset>
        </section>
      </div>
    );
  }
}

export default ItemSelect;