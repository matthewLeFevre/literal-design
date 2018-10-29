import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Globals from '../services/Global_service';

const Global = new Globals();

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userIsRegistered: false,
      userName: null,
      userEmail: null,
      userPassword: null,
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
      window.alert("password or email have not been included")
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
          // this.props.handleAlert(data.message, "success");
          window.alert(data.message);
        } else {
          // this.props.handleAlert(data.message, "error");
          window.alert(data.message);
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
          <label className="label--text">Username - Required</label>
          <input type="text" 
            onChange={this.handleInputChange} 
            name="userName" 
            className="input--text full breath"/>
          <label className="label--text">Email - Required</label>
          <input type="text" 
            onChange={this.handleInputChange} 
            name="userEmail" 
            className="input--text full breath"/>
          <label className="label--text">Password - Required</label>
          <input type="password" 
            onChange={this.handleInputChange} 
            name="userPassword"
            className="input--text full breath"/>
          {/* <label className="label--text">Confirm Password</label>
          <input type="password" userPassword placeholder="Password" className="input--text full breath"/> */}
        </fieldset>
        <fieldset className="form__field txt-center">
          <label className="label--text side">Agree to <Link to="/dashboard">Terms</Link></label>
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
          <Link className="tiny" to="">Terms of Use</Link>
          <Link className="tiny" to="">Privacy Policy</Link>
        </fieldset>
      </form>
    </section>
    );
  }
}

export default SignUp;