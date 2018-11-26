import React from 'react';
import {Link} from 'react-router-dom';

const Home = (props) => {
  return (
    <section className="col--12">
      <div className="home__banner txt-center">
        <h1>Style Guides <span className="tiny">On the Web</span></h1>
        <Link to="login" className="btn mid alt-action outline spacing--2 home__banner__btn hoverable">Sign Up Free</Link>
      </div>
      {/* <div className="home__section bg-light">
        <div className="home__section__item">
          <h2 className="section__heading--secondary">Start using it today!</h2>
          <Link to="login" className="btn mid action breath spacing--2">FREE</Link>
        </div>
      </div> */}
    </section>
  )
}

export default Home;