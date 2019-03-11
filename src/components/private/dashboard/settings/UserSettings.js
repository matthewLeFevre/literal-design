import React from 'react';
import Globals from '../../../services/Global_service';
import {AppContext} from '../../../context/appContext';

const Global = new Globals();

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      userName: null,
      userEmail: null,
      userPassword: null
    };
  }
  /**
   * I really do not like putting props into state
   * but this is the simplest solution I could 
   * come up with at the moment.
   *  
   * @todo: come back to this
   */
  componentDidMount() {
    let {userData} = this.context;
    this.setState({
      userName: userData.userName,
      userEmail: userData.userEmail,
      userPassword: userData.userPassword,
    });
  }
  deleteUser() {
    let {userData, handleAlert, onLogout} = this.context;
    let data = {
      userId: userData.userId,
      apiToken: userData.apiToken,
    }
    let req = Global.createRequestBody('user', 'deleteUser', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      handleAlert(res.message, res.status);
      onLogout();
    }); 
  }
  updateUser() {
    let {userData, handleAlert, onLogin} = this.context;
    let data = {
      userName: this.state.userName,
      userEmail: this.state.userEmail,
      userId: userData.userId,
      apiToken: userData.apiToken
    }
    let req = Global.createRequestBody('user', 'updateUserInfo', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      handleAlert(res.message, res.status);
      if(res.status === "success") {
        onLogin(res.data, "update");
        this.props.toggleSettings();
      }
    });
  }
  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  render() {
    return(
      <div className="modal">
        <div className="card--mdm">
          <header className="card-header">
            <h2 className="mdm">User Settings</h2>
          </header>
          <div className="card-body">
            <form className="grid--padded--sml">
              <fieldset className="field full col--sml--6">  
                <label className="label">UserName</label>
                <input type="text" onChange={this.handleInputChange} name="userName" defaultValue={this.state.userName} className="input full" />
              </fieldset>
              <fieldset className="field full col--sml--6">  
                <label className="label">Email</label>
                <input type="text" onChange={this.handleInputChange} name="userEmail" defaultValue={this.state.userEmail} className="input full" />
              </fieldset>
              <fieldset className="field full col--sml--6">  
                <label className="label">Current Password</label>
                <input type="text" className="input full" disabled />
                <label className="label">New Password</label>
                <input type="text" className="input full" disabled />
                <label className="label">Confirm New Password</label>
                <input type="text" className="input full" disabled />
              </fieldset>
              <fieldset className="field full col--sml--6"> 
                <label className="label">Delete Account</label>
                <button type="button" onClick={this.deleteUser} className="btn full breath danger">Delete</button> 
              </fieldset>
              
            </form>
          </div>
          <footer className="card-footer">
            <fieldset className="field full">  
              <button type="button" className="btn primary breath sml" onClick={this.updateUser}>Save</button>
              <button type="button" className="btn danger breath sml" onClick={this.props.toggleSettings}>Close</button>
            </fieldset>
          </footer>
        </div>
      </div>
    );
  }
}
UserSettings.contextType = AppContext;
export default UserSettings;