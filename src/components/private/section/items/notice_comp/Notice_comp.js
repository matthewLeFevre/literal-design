import React, { Component } from 'react';
import Globals from '../../../../services/Global_service';

const Global = new Globals();

class Notice extends Component {
  constructor(props) {
    super(props);
    this.editNotice = this.editNotice.bind(this);
    this.updateNotice = this.updateNotice.bind(this);
    this.deleteNotice = this.deleteNotice.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      noticeText: "",
      noticeType: "",
      itemOrder: 0,
      edit: false
    }
  }
  componentDidMount() {
    const noticeText = Global.htmlDecode(this.props.notice.noticeText);
    const noticeType = this.props.notice.noticeType;
    let noticeStyle = '';
    let noticeTitle = '';
    let noticeIcon = '';
    switch (noticeType) {
      case "success":
        noticeStyle = "notice editing positive";
        noticeIcon = <i className="fas fa-thumbs-up notice__icon txt-green" />;
        noticeTitle = "Success";
      break;
      case "danger":
        noticeStyle = "notice editing negative";
        noticeIcon = <i className="fas fa-times-circle notice__icon txt-red"/>;
        noticeTitle = "Danger";
      break;
      case "info":
        noticeStyle = "notice editing neutral";
        noticeTitle = "info";
        noticeIcon = <i className="fas fa-info-circle notice__icon txt-blue" />;
      break;
      case "warning":
        noticeStyle = "notice editing warning";
        noticeTitle = "Warning";
        noticeIcon = <i className="fas fa-exclamation-circle notice__icon txt-yellow"/>;
      break;
      case "tip":
        noticeStyle = "notice editing tip";
        noticeTitle = "Tip";
        noticeIcon = <i className="fas fa-hand-peace notice__icon txt-purple"/>;
      break;
      case "note":
        noticeStyle = "notice editing note";
        noticeTitle = "Note";
        noticeIcon = <i className="fas fa-comment note notice__icon txt-purple"/>;
      break;
    }

    this.setState({
      noticeText: noticeText,
      noticeType: this.props.notice.noticeType,
      noticeStyle: noticeStyle,
      noticeTitle: noticeTitle,
      noticeIcon: noticeIcon,
      itemOrder: this.props.notice.itemOrder,
    });
  }
  editNotice() {
    this.setState( prevState => ({
      edit: !prevState.edit,
    }));
  }
  updateNotice(){
    const data = {
      'sectionId': this.props.notice.sectionId,
      'noticeId': this.props.notice.noticeId,
      'apiToken': this.props.userData.apiToken,
      'noticeType': this.state.noticeType,
      'noticeText': this.state.noticeText,
      'itemOrder': this.props.notice.itemOrder,
    }
    const req = Global.createRequestBody('notice', 'updateNotice', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      if(res.status === 'success') {
        this.props.updateItems(res.data);
      }
    });
  }
  deleteNotice(){
    const data = {
      'sectionId': this.props.notice.sectionId,
      'noticeId': this.props.notice.noticeId,
      'apiToken': this.props.userData.apiToken,
    }
    const req = Global.createRequestBody('notice', 'deleteNotice', data);
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
    {this.state.edit ? <label className="section--edit__label">Notice</label> : ''}
      <div className="section--edit__group">
      <div className="section--edit__nav">
          <div className="section--edit__nav--btn grab">
            <i className="fas fa-th txt-blue"></i>
          </div>
          {this.state.edit 
            ? <div className="section--edit__nav--btn" onClick={this.editNotice}>
                <span title="Close Editing"><i className="fas fa-times txt-red"></i></span> 
              </div>
            : ''}
          {this.state.edit ? ''
            : <div className="section--edit__nav--btn" onClick={this.editNotice}>
                <span title="Edit Heading"><i className="fas fa-edit txt-green"></i></span>
              </div>}
        </div>          
          {this.state.edit 
          ? <div className="notice-edit__fieldset">
            <label className="section--edit__label">Notice Type</label>
            <select className='notice-edit__select' readOnly={this.state.edit ? false : true} name="noticeType" onChange={this.onChange}>
              <option value="note">Note</option>
              <option value="info">Info</option>
              <option value="tip">Tip</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Error</option>
            </select>
            <label className="section--edit__label">Notice Text</label> 
            <input type="text" 
              name="noticeText"
              onChange={this.onChange}
              readOnly={this.state.edit ? false : true}
              className={`notice-edit__input`} 
              defaultValue={this.state.noticeText} /></div> 
          : <div className="notice-edit__fieldset">
              <NoticeItem type={this.state.noticeType} text={this.state.noticeText} icon={this.state.noticeIcon} title={this.state.noticeTitle} style={this.state.noticeStyle}/>
            </div>}

        { this.state.edit ? 
          <button type="button" className="section--edit__btn" onClick={this.deleteNotice}>
            <i className="fas fa-times"></i>
          </button>
          : ''}
      </div>
      { this.state.edit ? <div className="section--edit__fieldset">
        <button type="button" 
          className="btn success breath" 
          onClick={this.updateNotice}>Save</button>
      </div> : ''}
    </fieldset>)
  }
}

const NoticeItem = (props) => {
  return (
    <div className={props.style}>
	    {props.icon}
	    <span className="notice__status">{props.title}</span>
	    <p className="notice__message">{props.text}</p>
    </div>
  );
}

export default Notice;