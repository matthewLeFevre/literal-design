import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import Globals from '../services/Global_service';
const Global = new Globals();
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      userNameOrEmail: null,
      userPassword: null,
    }
  }
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  handleLogin() {
    if( this.state.userNameOrEmail === null || this.state.userPassword === null) {
      this.props.handleAlert("Please fill in both username and password fields");
    } else {
      let data = {
        'userNameOrEmail': this.state.userNameOrEmail,
        'userPassword': this.state.userPassword,
      }

      const req = Global.createRequestBody('user', 'loginUser', data);

      fetch(Global.url, req)
      .then(res => res.json())
      .then(res => {
        if(res.status === 'failure') {
          this.props.handleAlert(res.message, 'failure');
        } else {
          this.props.handleAlert(res.message, 'success');
          this.props.onLogin(res.data);
        }
      })
    }
  }
  render() {
    if(this.props.userIsLoggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return(
      <section className="col--12 page__full-height login">
        <form className="login__form">
          <h1 className="primary-heading">Login</h1>
          <fieldset className="field">
            <label className="label">Email/Username</label>
            <input type="text" 
              onChange={this.handleInputChange} 
              name="userNameOrEmail" 
              className="input full breath bg-white"/>
            <label className="label">Password</label>
            <input type="password" 
              onChange={this.handleInputChange} 
              name="userPassword" 
              className="input full breath bg-white"/>
          </fieldset>
          <fieldset className="field">
            <button className="btn tiny action breath" type="button" onClick={this.handleLogin}>Login</button>
            <Link className="btn tiny alt-action breath" to="/signup">Sign Up</Link>
          </fieldset>
          {/* <fieldset className="form__field">
            <label className="label--text">Other ways to Login</label>
            <button className="btn icon tiny breath google"><i className="fab fa-google"></i> Google</button>
            <button className="btn icon tiny breath github"><i className="fab fa-github"></i> Github</button>
          </fieldset> */}
          <fieldset className="field">
            <Link className="tiny" to="/alphaterms">Terms of Use</Link>
            <Link className="tiny" to="/privacy">Privacy Policy</Link>
          </fieldset>
        </form>
      </section>
    );
  }
}

export default Login;