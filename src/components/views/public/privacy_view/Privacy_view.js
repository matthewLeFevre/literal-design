import React from 'react';
import {Link} from 'react-router-dom';

const Privacy = (props) => {
  return (
    <section className="col--12 page__full-view">
      <article className="format_text">
        <h1>Privacy Policy</h1>
        <p><strong>Disclaimer:</strong> This is a makeshift policy and will be updated and brought up to standards as soon as avaliable.</p>
        <p>Due to the nature of this web app being very new and still in the construction phase we discourage the use of any valid information and instead incourage Alpha users to put in fake yet rememberable email addresses on registration. There currently is no email validation for accounts but there will be eventually.</p>
        <p>All information that this website is used to publish will eventually be deleted. We encourage all that use leinary to backup what they create before the end of alpha.</p>
        <p>If it is discovered that a user is exploiting anything to do with this web app that user will be removed from alpha and be unable to ever use the web app in an capacity.</p>
      </article>
    </section>
  );
}

export default Privacy;