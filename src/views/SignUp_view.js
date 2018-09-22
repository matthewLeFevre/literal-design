import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class SignUp extends Component {
  render() {
    return(
      <section className="col--12 page__full-height login">
      <form className="login__form">
        <fieldset className="form__field">
          <label className="label--text">Username</label>
          <input type="text" placeholder="Username/Email" className="input--text full breath"/>
          <label className="label--text">Password</label>
          <input type="password" placeholder="Password" className="input--text full breath"/>
          <label className="label--text">Confirm Password</label>
          <input type="password" placeholder="Password" className="input--text full breath"/>
        </fieldset>
        <fieldset className="form__field txt-center">
          <label className="label--text side">Agree to <Link to="/dashboard">Terms</Link></label>
          <input className="input--checkbox" id="terms" type="checkbox"/>
          <label className="label--checkbox" htmlFor="terms">
            <i className="fas fa-check input__check"></i>
          </label>
        </fieldset>
        <fieldset className="form__field">
          <Link to="/login" className="btn tiny alt-back breath">
            <i className="fas fa-arrow-left"></i> To Login
          </Link>
          <button className="btn tiny action breath">Create Account</button>
        </fieldset>
        <fieldset className="form__field">
          <label className="label--text">Other ways to Sign Up</label>
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

export default SignUp;