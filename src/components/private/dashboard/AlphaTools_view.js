import React from 'react';
import AlphaTester from '../../../images/Leinary Alpha Tester Welcome.mp4';

const AlphaTools = (props) => {
  return(
    <section className="col--12 page__full-view">
      <article className="format_text">
      <h1>Welcome Alpha Testers</h1>
      <figure>
        <div className="container">
          <iframe src="https://www.youtube.com/embed/Fm-gfez43FM?rel=0&amp;showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </figure>
      <h2>TL;DW</h2>
      </article>
    </section>
  );
}

export default AlphaTools;