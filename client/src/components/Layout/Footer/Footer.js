import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
// import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconLists = [faFacebook, faInstagram, faWhatsapp, faEnvelopeSquare];

const Footer = () => {
  return (
    <footer id="footer">
      {iconLists.map((icon, i) => {
        return (
          <FontAwesomeIcon
            key={`${icon}-0${i}`}
            icon={icon}
            size="2x"
            className="home"
          />
        );
      })}
    </footer>
  );
};

export default Footer;
