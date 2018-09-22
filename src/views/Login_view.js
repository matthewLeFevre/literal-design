import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Login extends Component {
  render() {
    return(
      <section className="col--12 page__full-height login">
        <form className="login__form">
          <h1 className="heading--primary">Logo</h1>
          <fieldset className="form__field">
            <label className="label--text">Username</label>
            <input type="text" placeholder="Username/Email" className="input--text full breath"/>
            <label className="label--text">Password</label>
            <input type="password" placeholder="Password" className="input--text full breath"/>
          </fieldset>
          <fieldset className="form__field">
            <button className="btn tiny action breath">Login</button>
            <Link className="btn tiny alt-action breath" to="/signup">Sign Up</Link>
          </fieldset>
          <fieldset className="form__field">
            <label className="label--text">Other ways to Login</label>
            <button className="btn icon tiny breath google"><i className="fab fa-google"></i> Google</button>
            <button className="btn icon tiny breath github"><i className="fab fa-github"></i> Github</button>
          </fieldset>
          <fieldset className="form__field">
            <Link className="tiny" to="">Terms of Use</Link>
            <Link className="tiny" to="">Privacy Policy</Link>
          </fieldset>
        </form>
      </section>
    );
  }
}

export default Login;