import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Globals from '../services/Global_service';

const Global = new Globals();

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userIsRegistered: false,
      userName: '',
      userEmail: '',
      userPassword: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    
    this.setState({
      [name]: value
    });
  }

  handleRegister() {
    if(this.state.userEmail == null || this.state.userPassword == null) {
      this.props.handleAlert("Password, email and username are required.", "error");
    } else {
      const data = {
          userEmail: this.state.userEmail,
          userPassword: this.state.userPassword,
          userName: this.state.userName
      };
      const req = Global.createRequestBody('user', 'registerUser', data);
      fetch(Global.url, req)
      .then(response => response.json())
      .then(data => {
        if(data.status === "success") {
          this.props.handleAlert(data.message, "success");
          this.setState((prevstate) => ({
            userPassword: '',
            userEmail: '',
            userName: '',
          }));
        } else {
          this.props.handleAlert(data.message, "failure");
          this.setState((prevstate) => ({
            userPassword: '',
          }));
        }
      });
    }
  }

  render() {
    return(
      <section className="col--12 page__full-height login">
      <form className="login__form">
        <h1 className="primary-heading">SignUp</h1>
        <fieldset className="form__field">
          <label className="label--text">Username</label>
          <input type="text" 
            onChange={this.handleInputChange} 
            name="userName" 
            className="input--text full breath"
            value={this.state.userName}/>
          <label className="label--text">Email - Required for login</label>
          <input type="text" 
            onChange={this.handleInputChange} 
            name="userEmail" 
            className="input--text full breath"
            value={this.state.userEmail}/>
          <label className="label--text">Password</label>
          <input type="password" 
            onChange={this.handleInputChange} 
            name="userPassword"
            className="input--text full breath"
            value={this.state.userPassword}/>
          <label className="label--text">Alpha Key</label>
          <input type="password" 
            onChange={this.handleInputChange} 
            name="userPassword"
            className="input--text full breath"
            value={this.state.userPassword}/>
          {/* <label className="label--text">Confirm Password</label>
          <input type="password" userPassword placeholder="Password" className="input--text full breath"/> */}
        </fieldset>
        <fieldset className="form__field txt-center">
          <label className="label--text side">Agree to <Link to="/dashboard">Alpha Terms</Link></label>
          <input className="input--checkbox" id="terms" type="checkbox"/>
          <label className="label--checkbox" htmlFor="terms">
            <i className="fas fa-check input__check"></i>
          </label>
        </fieldset>
        <fieldset className="form__field">
          <button className="btn tiny action breath" type="button" onClick={this.handleRegister}>Create Account</button>
          <Link to="/login" className="btn tiny alt-action breath">Login</Link>
        </fieldset>
        {/* <fieldset className="form__field">
          <label className="label--text">Other ways to Sign Up</label>
          <button className="btn icon tiny breath google"><i className="fab fa-google"></i> Google</button>
          <button className="btn icon tiny breath github"><i className="fab fa-github"></i> Github</button>
        </fieldset> */}
        <fieldset className="form__field">
          <Link className="tiny policy__links" to="">Terms of Use</Link>
          <Link className="tiny policy__links" to="">Privacy Policy</Link>
        </fieldset>
      </form>
    </section>
    );
  }
}

export default SignUp;