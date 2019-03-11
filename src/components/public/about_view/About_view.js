import React from 'react';
import dashboardImg from '../../../images/dashboard.JPG';

const AboutView = () => {
  return (
    <section className="col--12 page__full-view">
      <article className="format_text">
        <h1>About</h1>
        <p>Leinary is a tool that allows you to to dynaically create style guides for print or digital pojects. Add images, color pallets and a variety of other components to compile a guide you will be able to reference when expanding your projects and adding content.</p>
        <p>Currently only a fraction of the services that will be avaliable in the final tool are avaliabe see them outlined bellow.</p>
        <h2>Leinary</h2>
        <ul>
          <li><a href="#projects" title="">Create an unlimited number of projects</a></li>
          <li><a href="#styleguides" title="">Build style guides</a></li>
          <li><a href="#sections" title="">Add sections</a></li>
          <li><a href="#components" title="">Use components</a></li>
        </ul>

        <h3 id="projects">Create an unlimited number of projects</h3>

        <figure className="standout">
          <div className="container">
            <img src={dashboardImg} />
          </div>
        </figure>

        <p>Projects are documented entries for your clients, brands or oddly enough your projects. Thie main function is to hold styleguides however in the future more purposes will be implimented such as shareing.</p>

        <h3 id="styleguides">Build Style Guides</h3>

        <p>Style Guides form the basis for Leinary they house sections which are kind of like pages and components in those sections that really make up the main content of your style guides.</p>

        <p>by default Style Guides are public when they are created and allow other people to see them that do not have a leinary account. This means that you can make your style guide available to clients, project stakeholders and the average joe.</p>

        <p>Style guides are not meant to house trade secrets or confidential information so shareing yoru style guide is encouraged and can help other people learn how to create worthwhile style guides of their own.</p>

        <h3 id="sections">Add Sections to Styleguides</h3>

        <p>Sections are like pages. They have titles and descriptions and you can add components to them. Sections can be tailored to a specific type of style guide like a <em>color guide</em> or one section can house all the information for your entire style guide.</p>

        <h3 id="components">Use Components</h3>
        
        <p>Simply put components are the prebuilt containers for all of your style guide assets. Only a limited number of components currently exist but more will be created. If you would like a more detailed description of each component please visit the style guide (soon to be created).</p>

      </article>
    </section>
  );
}

export default AboutView;