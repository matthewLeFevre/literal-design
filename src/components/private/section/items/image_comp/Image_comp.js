import React, { Component } from 'react';
import Globals from '../../../../services/Global_service';

const Global = new Globals();

class Image extends Component {
  constructor(props) {
    super(props);
    this.editImage = this.editImage.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      imageUrl: '',
      assetId: 0,
      itemOrder: 0,
      edit: false,
      select: false,
    }
  }
  componentDidMount() {
    this.setState({
      imageUrl: this.props.image.imageUrl,
      itemOrder: this.props.image.itemOrder,
      assetId: this.props.image.assetId,
    });
  }
  editImage() {
    this.setState( prevState => ({
      edit: !prevState.edit,
    }));
  }
  updateImage(){
    const data = {
      'sectionId': this.props.image.sectionId,
      'imageId': this.props.image.imageId,
      'apiToken': this.props.userData.apiToken,
      'imageUrl': this.state.imageUrl,
      'itemOrder': this.props.image.itemOrder,
    }
    const req = Global.createRequestBody('image', 'updateImage', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    });
  }
  deleteImage(){
    const data = {
      'sectionId': this.props.image.sectionId,
      'imageId': this.props.image.imageId,
      'apiToken': this.props.userData.apiToken,
    }
    const req = Global.createRequestBody('image', 'deleteImage', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if( res.status === 'success') {
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
    return( <fieldset className="section--edit__fieldset">
    {this.state.edit ? <label className="section--edit__label">Image</label> : ''}
      <div className="section--edit__group">
      <div className="section--edit__nav">
          <div className="section--edit__nav--btn grab">
            <i className="fas fa-th txt-blue"></i>
          </div>
          {this.state.edit 
            ? <div className="section--edit__nav--btn" onClick={this.editImage}>
                <span title="Close Editing"><i className="fas fa-times txt-red"></i></span> 
              </div>
            : ''}
          {this.state.edit ? ''
            : <div className="section--edit__nav--btn" onClick={this.editImage}>
                <span title="Edit Heading"><i className="fas fa-edit txt-green"></i></span>
              </div>}
        </div>
        
        {this.state.edit 
        ? <div>
          <label className="section--edit__label">ImageUrl</label> 
          <input type="text" 
            onChange={this.onChange}
            name="imageUrl"
            readOnly={this.state.edit ? false : true}
            className="section--edit__imgUrl" 
            defaultValue={this.props.image.imageUrl} />
            <div className="section--edit__img-container spacing--top--1">
              <img src={this.state.imageUrl} className="section--edit__img" alt={this.state.imageUrl} />
            </div>
          </div> 
          : <div className="section--edit__img-container">
              <img src={this.state.imageUrl} className="section--edit__img" alt={this.state.imageUrl} />
            </div>}
          { this.state.edit ? 
            <button type="button" className="section--edit__btn" onClick={this.deleteImage}>
              <i className="fas fa-times"></i>
            </button>
            : ''}
      </div>
      { this.state.edit ? <div className="section--edit__fieldset">
        <button type="button" 
          className="btn success breath" 
          onClick={this.updateImage}>Save</button>
      </div> : ''}
    </fieldset>)
  }
}

export default Image;