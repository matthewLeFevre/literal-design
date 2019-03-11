import React from 'react';
import {Link} from 'react-router-dom';

const AlphaView = () => {
  return (
    <section className="col--12 page__full-view">
      <article className="format_text">
        <h1>Getting Started With Leinary Alpha</h1>
        <p>Thank you for showing interest in Leinary and welcome to the Alpha orientation.</p>
        <p>If you are interested in participating in Leinary Alpha but you do not have an Alpha key keep reading. If you already have an alpha key please skip down to <a href="#registering">activiating your account with an alpha key section</a>.</p>
        <h2>Obtaining an Alpha Key</h2>
        <p>Leinary is in a very infant stage and is not yet ready to be widely distributed, however if you are particularly interested in Leinary and you want to help contribute there are many opportunities to help.</p>
        <p>To start helping you need to create a new account to do this you need to request an alpha key. This can be done by contacting Leinary and requesting a key. Contact options will be avaliabe in the near future.</p>
        <h2 id="registering">Activiating an account with an Alpha Key</h2>
        <p>Since you now have your alpha key you can visit the <Link to="/signup">Signup</Link> page and create a new account with your alpha key. Before finishing your registration be sure to read the <Link to="/alphaTerms">Alpha Terms of Service</Link>, <Link to="/privacyPolicy">Privacy Policy</Link>, and  the <a href="duties">Alpha Testers</a> section of this oreintation.</p>
        <h2 id="duties">Alpha Testers</h2>
        <p>Once you have created your account you are requested to give feedback on your expereince as you use the application. Some of your responsibilities will be to report bugs and undesirable behaviors, suggest new features as well as feature enhacements.</p>
      </article>
    </section>
  );
}

export default AlphaView;