// import React from 'react';
import { NavLink } from 'react-router-dom';
import './CallToAction.css';

const CallToAction = () => {
  return (
    <div className="cta">
      <h1 className="big-heading">Find your suitable courses</h1>
      <NavLink to="/courses">
        <button type="button" className="btn btn-lg cta-btn">
          READ MORE
        </button>
      </NavLink>
    </div>
  );
};

export default CallToAction;
