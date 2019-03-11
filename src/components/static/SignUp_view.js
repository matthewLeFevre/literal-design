import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Request from '../../service/reqService';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userIsRegistered: false,
      userName: '',
      userEmail: '',
      userPassword: '',
      alphaKey: "alphaUser2019",
      key: '',
      terms: false,
    }

    this.toggleTerms = this.toggleTerms.bind(this);
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

  toggleTerms() {
    this.setState((prevState) => ({
      terms: !prevState.terms,
    }))
  }

  handleRegister() {
    if(this.state.userEmail == null || this.state.userPassword == null || this.state.terms === false || this.state.key !== "alphaUser2019") {
      this.props.handleAlert("Password, email and username are required. Agreeing to terms of use is also required as well as the alpha key.", "error");
    } else {
      const data = {
          userEmail: this.state.userEmail,
          userPassword: this.state.userPassword,
          userName: this.state.userName
      };
      const req = Request.createRequestBody('user', 'registerUser', data);
      fetch(Request.reqUrl, req)
      .then(res => res.json())
      .then(res => {
        if(res.status === "success") {
          this.props.handleAlert(res.message, "success");
          this.setState((prevstate) => ({
            userPassword: '',
            userEmail: '',
            userName: '',
          }));
        } else {
          this.props.handleAlert(res.message, "failure");
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
        <fieldset className="field">
          <label className="label">Username</label>
          <input type="text" 
            onChange={this.handleInputChange} 
            name="userName" 
            className="input full breath"
            value={this.state.userName}/>
          <label className="label">Email - Required for login</label>
          <input type="text" 
            onChange={this.handleInputChange} 
            name="userEmail" 
            className="input full breath"
            value={this.state.userEmail}/>
          <label className="label">Password</label>
          <input type="password" 
            onChange={this.handleInputChange} 
            name="userPassword"
            className="input full breath"
            value={this.state.userPassword}/>
          <label className="label">Alpha Key</label>
          <input type="password" 
            onChange={this.handleInputChange} 
            name="key"
            className="input full breath"
            value={this.state.key}/>
          {/* <label className="label--text">Confirm Password</label>
          <input type="password" userPassword placeholder="Password" className="input--text full breath"/> */}
        </fieldset>
        <fieldset className="field">
            <label className="label side">Agree to <Link to="/dashboard">Alpha Terms</Link></label>
            <input className="input--checkbox" onChange={this.toggleTerms} id="terms" type="checkbox"/>
            <label className="label--checkbox" htmlFor="terms"></label>
        </fieldset>
        <fieldset className="field">
          <button className="btn tiny action breath" type="button" onClick={this.handleRegister}>Create Account</button>
          <Link to="/login" className="btn tiny alt-action breath">Login</Link>
        </fieldset>
        {/* <fieldset className="field">
          <label className="label">Other ways to Sign Up</label>
          <button className="btn icon tiny breath google"><i className="fab fa-google"></i> Google</button>
          <button className="btn icon tiny breath github"><i className="fab fa-github"></i> Github</button>
        </fieldset> */}
        <fieldset className="field">
          <Link className="tiny policy__links" to="/alphaterms">Terms of Use</Link>
          <Link className="tiny policy__links" to="/privacy">Privacy Policy</Link>
        </fieldset>
      </form>
    </section>
    );
  }
}

export default SignUp;