import React from 'react';
import logo from '../../images/leinary logo.svg';
import {Link} from 'react-router-dom';

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <ul className="footer-group">
          <li className="footer-group__item--logo">
            <img className="footer-group__logo" src={logo} alt="Leinary Logo"/>
          </li>
          <li className="footer-group__item">
            <a href="#" className="footer-group__link">contact@leinary.com</a>
          </li>
          <li className="footer-group__item">
            <a href="#" className="footer-group__link">Terms of use</a>
          </li>
          <li className="footer-group__item">
            <Link to="/privacy" className="footer-group__link">Privacy Policy</Link>
          </li>
        </ul>
        <ul className="footer-group">
          <li className="footer-group__item">
            <h4 className="footer-group__title">Info</h4>
          </li>
          <li className="footer-group__item">
            <Link to="/about" className="footer-group__link">About</Link>
          </li>
          <li className="footer-group__item">
            <Link to="/alpha" className="footer-group__link">Alpha</Link>
          </li>
          <li className="footer-group__item">
            <a href="#" className="footer-group__link">The Team</a>
          </li>
          <li className="footer-group__item">
            <Link to="/contact" className="footer-group__link">Contact</Link>
          </li>
        </ul>
        <ul className="footer-group">
          <li className="footer-group__item">
            <h4 className="footer-group__title">Help</h4>
          </li>
          <li className="footer-group__item">
            <a href="#" className="footer-group__link">FAQ</a>
          </li>
          <li className="footer-group__item">
            <a href="#" className="footer-group__link">Contribute</a>
          </li>
          <li className="footer-group__item">
            <a href="#" className="footer-group__link">Documentation</a>
          </li>
        </ul>
        <ul className="footer-group">
          <li className="footer-group__item">
            <h4 className="footer-group__title">Leinary</h4>
          </li>
          <li className="footer-group__item">
            <a href="#" className="footer-group__link">Pricing</a>
          </li>
          <li className="footer-group__item">
            <a href="#" className="footer-group__link">Style Guide</a>
          </li>          
        </ul>
      </div>
      {/* copyright and version number social media powered by etc */}
      <div className="footer"></div>
    </footer>
  )
}

export default Footer;