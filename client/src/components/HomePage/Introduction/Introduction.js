// import React from 'react';
import './Introduction.css';
import group from '../../../images/homepage_intro/group.jpg';

const Introduction = () => {
  return (
    <div className="row into-row">
      <div className="col-lg-6 into-contain">
        <h3 className="into-text">
          freeCodeCamp is a proven path to your first software developer job.
          More than 40,000 people have gotten developer jobs after completing
          this – including at big companies like Google and Microsoft. If you
          are new to programming, we recommend you start at the beginning and
          earn these certifications in order. To earn each certification, build
          its 5 required projects and get all their tests to pass. You can add
          these certifications to your résumé or LinkedIn.
        </h3>
      </div>
      <div className="col-lg-6">
        <img className="group-image" src={group} alt="group-image"></img>
      </div>
    </div>
  );
};

export default Introduction;
