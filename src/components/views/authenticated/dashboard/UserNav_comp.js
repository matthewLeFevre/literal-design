import React from 'react';
import User from '../../../../images/user.svg';
const UserNav = (props) => {
  return(
    <nav className={`nav--auth ${props.toggle ? "open" : ''}`}>
      <div className="nav--auth__header">
        <div className="nav--auth__toggle"
             onClick={props.toggleNav}>
          <i className="fas fa-arrow-left"></i>
        </div>
      </div>
      <section className="user-info">
        <h3>User Info:</h3>
        <figure className="user__avatar">
          <div className="user__avatar__img__wrapper">
            <img className="user__avatar__img" src={User} alt={props.userData.userName}/>
          </div>
          <figcaption className="user__avatar__name__wrapper">
            <h4 className="user__avatar__name">{props.userData.userName}</h4>
          </figcaption>
        </figure>
      </section>
      <fieldset className="form__field txt-center">
         <button className="btn breath primary">Edit User Data</button>
      </fieldset>
    </nav>
  );
}

export default UserNav;