import React, { Component } from 'react';

const Home = (props) => {
  return (
    <section className="col--12">
      <div className="home__banner">
        <h1>Style Guides <span>On the Web</span></h1>
      </div>
      <div className="home__section bg-light">
        <div className="home__section__item">
          <h2 className="section__heading--secondary">Start using it today!</h2>
          <button className="btn mid action breath spacing--2">FREE</button>
        </div>
      </div>
    </section>
  )
}

export default Home;