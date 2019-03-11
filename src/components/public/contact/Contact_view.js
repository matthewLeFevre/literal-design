import React from 'react';

const Contact = (props) => {
  return (
    <section className="col--12 page__full-view">
      <article className="format_text">
        <form className="form">
          <h1 className="form__title">Contact Leinary</h1>
          <p><strong>Disclaimer:</strong> Since we are currently in alpha testing we do not have a formal way to be contacted by none alpha testers. If you are an alpha tester you will be made awair of ways to contact Leinary.</p>
          <fieldset className="field">
            <lable className="label">Email:</lable>
            <input className="input full breath" type="text" />
          </fieldset>
          <fieldset className="field">
            <lable className="label">Message:</lable>
            <textarea className="input--textarea full"></textarea>
          </fieldset>
        </form>
      </article>
    </section>
  );
}

export default Contact;