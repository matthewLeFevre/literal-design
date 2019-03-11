import React from 'react';
import User from '../../../../images/user.svg';
import UserSettings from '../settings/UserSettings';
import { AppContext } from '../../../context/appContext';
class UserOptions extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.state = {
      settings: false,
    }
  }
  toggleSettings () {
    this.setState(prevState => ({
      settings: !prevState.settings,
    }));
  }
  render() {
    const { userData } = this.context;
    return (
      <div>
        {this.state.settings ? <UserSettings toggleSettings={this.toggleSettings}/> : ''}
        <section className="user-info">
          {/* <h3>User Info</h3> */}
          <figure className="user__avatar">
            <div className="user__avatar__img__wrapper">
              <img className="user__avatar__img" src={User} alt={userData.userName}/>
            </div>
            <figcaption className="user__avatar__name__wrapper">
              <h4 className="user__avatar__name">{userData.userName}</h4>
              <ul className="user__avatar-info__list">
                <li><span className="user__avatar-info">Email:</span> {userData.userEmail}</li>
                <li><span className="user__avatar-info">Date Joined:</span> {new Date(userData.userJoined).toDateString()}</li>
                <li><span className="user__avatar-info">Account type:</span> Free {userData.userStatus.charAt(0).toUpperCase() + userData.userStatus.slice(1)}</li>
              </ul>
            </figcaption>
          </figure>
        </section>
        <fieldset className="field txt-center">
          <button type="button" onClick={this.toggleSettings} className="btn breath primary">Edit User Data</button>
        </fieldset>
      </div>
    );
  }
}
UserOptions.contextType = AppContext;
export default UserOptions;