import React from 'react';
import {Link} from 'react-router-dom';

const Home = (props) => {
  return (
    <section className="col--12">
      <div className="home__banner txt-center">
        {/* <h1>Style Guides <span className="tiny">On the Web</span></h1> */}
        <h1>Alpha Testers Welcome!</h1>
        <p>Leinary is a tool that will help streamline your design workflow. Be one of the first to try it out! If you are interested in becoming an alpha tester or have been given an alpha tester key you are welcome to: </p>
        <Link to="/alpha" className="btn mid alt-action outline spacing--2 home__banner__btn hoverable">Get Started!</Link>
      </div>
    </section>
  )
}

export default Home;