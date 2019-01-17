import React from 'react';
import {Link} from 'react-router-dom';

const Privacy = (props) => {
  return (
    <section className="col--12 page__full-view">
      <article className="format_text">
        <h1>Privacy Policy</h1>
        <p><strong>Disclaimer:</strong> This is a makeshift policy and will be updated and brought up to standards as soon as avaliable.</p>
        <p>Leinary is a style guide creation tool that requires users create and account with at least an email, username, and password. The passwords will be stored in a database and will be hashed so as to prevent threat actors from imediatly viewing plain text passwords upon gaining access to the database.</p>
        <h2>Personal information</h2>
        <p>As with any website the threat of losing personal information is present. Leinary assumes no responsibility for any theaft of personal information for those participating in this closed alpha version of the software. Due to the nature of alpha testing data that is created by the user will not be saved permently and exist for only the duration of the alpha testing stage.</p>
        <h2>Account Creation</h2>
        <p>As an account creator your awknoledge that the information that you supply and that you create will be deleted. You alsow awknowledge the possible vulnerability of the data being stolen.</p>
      </article>
    </section>
  );
}

export default Privacy;