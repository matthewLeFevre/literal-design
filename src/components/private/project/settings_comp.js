import React from 'react';

/*
Settings expects to recieve the following:
-close function
-save function
-delete function
-item data
*/
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
    this.changeRequest = this.changeRequest.bind(this);
    // this.changeStyleGuide = this.changeStyleGuide.bind(this);
    this.state = {
      styleGuideTitle: '',
      styleGuideDescription: '',
      styleGuideStatus: 'private',
    }
  }

  componentDidMount() {
    this.setState({
      styleGuideTitle: this.props.data.styleGuideTitle,
      styleGuideStatus: this.props.data.styleGuideStatus,
    })
  }

  // saves the changes in state to the style guide
  sendRequest(){ this.props.save(this.state);}

  // stores changes made in the form to the state.
  changeRequest(e){
    let name = e.target.name;
    let target = e.target;
    switch(name) {
      case 'styleGuideTitle':
        this.setState({styleGuideTitle: target.value});
      break;
      case 'styleGuideDescription':
        this.setState({styleGuideDescription: target.value});
      break;
      case 'styleGuideStatus':
        if(target.checked) {
          this.setState({styleGuideStatus: 'public'});
        } else {
          this.setState({styleGuideStatus: 'private'});
        }
      break;
      default:
      break;
    }
  }

  render() {
    let styleGuideStatus = false;
    if(this.state.styleGuideStatus === 'public') {
      styleGuideStatus = true;
    }
    return(
      <div className="settings__view">
        <div className="settings__close" onClick={this.props.closeSettings}>
          <i className="fas fa-arrow-left"></i>
        </div>
        <section className="settings">
          <form className="form">
            <h1 className="form__title">{this.props.data.styleGuideTitle} Settings</h1>
            <fieldset className="field">
              <label className="label">Title</label>
              <input onChange={this.changeRequest} type="text" name="styleGuideTitle" className="input mid full" defaultValue={this.props.data.styleGuideTitle}/>
            </fieldset>
            <fieldset className="field">
              <label className="label">Description</label>
              <textarea onChange={this.changeRequest} type="text" name="styleGuideDescription" className="input--textarea initial full" defaultValue={this.props.data.styleGuideDescription}/>
            </fieldset>
            <fieldset className="field">
              <label className="label">Public</label>
              <label className="label--switch breath">
                {styleGuideStatus
                  ? <input name="styleGuideStatus"
                      checked              
                      onChange={this.changeRequest} 
                      className="input--switch" type="checkbox" />
                  : <input name="styleGuideStatus"              
                    onChange={this.changeRequest} 
                    className="input--switch" type="checkbox" />}
                
                <span className="input--switch__slider"></span>
              </label>
            </fieldset>
            <fieldset className="field">
              <button className="btn alt-action breath" type="button" onClick={this.sendRequest} value={this.props.data.styleGuideId}>Save</button>
              <button className="btn danger breath" type="button" onClick={this.props.delete} value={this.props.data.styleGuideId}>Delete</button>
            </fieldset>
          </form>
        </section>
      </div>
    );
  }
}

export default Settings;