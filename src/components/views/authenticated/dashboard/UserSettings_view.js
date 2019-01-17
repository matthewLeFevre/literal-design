import React from 'react';
import Globals from '../../../services/Global_service';

const Global = new Globals();

class UserSettings extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.state = {
      userEmail: '',
      userName: '',
      userPassword: '',
      currentPassword: '',
      newPassword: '',
      copyNewPassword: ''
    };
   }

   handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  updateUserDetails() {}

  deleteUser() {
    let data = {
      userId: this.props.userData.userId,
      apiToken: this.props.userData.apiToken,
    }
    let req = Global.createRequestBody('user', 'deleteUser', data);
    fetch(Global.url, req)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.props.handleAlert(res.message, res.status);
      this.props.onLogout();
    }); 
  }
   
  render() {
    return(
      <div className="user-settings__view">
        <section className="user-settings">
          <form className="form">
            <h1 className="form__title">User Settings</h1>
            <h2 className="form__sub-heading">Change Account Details</h2>
            <fieldset className="field">
              <div className="notice note bg-white">
                <i className="fas fa-comment note notice__icon note"/>
                <span className="notice__status">Note</span>
                <p className="notice__message">This feature is not avaliable at this time.</p>
              </div>
            </fieldset>
            <fieldset className="field">
              <label className="label">Email</label>
              <input disabled type="email" onChange={this.handleInputChange} name="userEmail" defaultValue={this.props.userData.userEmail} className="input breath main full"/>
              <label className="label">Username</label>
              <input disabled type="text" onChange={this.handleInputChange} name="userName" defaultValue={this.props.userData.userName} className="input breath main full"/>
            </fieldset>
            <fieldset className="field">
              <button type="button" onClick={this.updateUserDetails} className="btn action">Update Info</button>
            </fieldset>
            <h2 className="form__sub-heading">Change Password</h2>
            <fieldset className="field">
              <div className="notice note bg-white">
                <i className="fas fa-comment note notice__icon note"/>
                <span className="notice__status">Note</span>
                <p className="notice__message">This feature is not avaliable at this time.</p>
              </div>
            </fieldset>
            <fieldset className="field">
              <label className="label">Current Password</label>
              <input disabled type="text" onChange={this.handleInputChange} className="input breath main full" name="currentPassword" />
              <label className="label">New Password</label>
              <input disabled type="text" onChange={this.handleInputChange} className="input breath main full" name="newPassword" />
              <label className="label">Confirm New Password</label>
              <input disabled type="text" onChange={this.handleInputChange} className="input breath main full" name="copyNewPassword" />
            </fieldset>
            <fieldset className="field">
              <button type="button" onClick={this.updateUserPassword} className="btn action">Change Password</button>
            </fieldset>
            <h2 className="form__sub-heading txt-red">Delete Account</h2>
            <fieldset className="field">
              <div className="notice negative bg-white">
                <i className="fas fa-times-circle notice__icon txt-red"/>
                <span className="notice__status">Danger</span>
                <p className="notice__message">This will delete everything you have created!</p>
              </div>
            </fieldset>
            <fieldset className="field">
              <button type="button" onClick={this.deleteUser} className="btn danger">Delete account</button>
            </fieldset>
            <fieldset className="field">
              <button type="button" onClick={this.props.toggleUserSettings} className="btn primary full breath">Close Settings</button>
            </fieldset>
          </form>
        </section>
      </div>
    );
  }
}

export default UserSettings;