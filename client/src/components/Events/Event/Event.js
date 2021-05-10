import React, { useState } from 'react';
import { SRLWrapper } from 'simple-react-lightbox';
import { useSelector } from 'react-redux';
import './Event.css';

const options = {};

const Event = (props) => {
  const eventsData = useSelector((state) => state.event);
  const eventsList =
    eventsData.data.data === undefined ? [] : eventsData.data.data;
  const { id } = props.match.params;
  const event = eventsList.find((el) => el._id === id);

  return (
    <div className="photo-gallery event-image-block">
      <div className="container">
        <div className="intro">
          <h2 className="text-center">{event.title}</h2>
          <p className="text-center">{event.content}</p>
        </div>
        <SRLWrapper options={options}>
          <div className="row ">
            {event.images.map((image, i) => {
              return (
                <div
                  className="col-sm-6 col-md-4 col-lg-3 item"
                  key={`${image}-${i}`}
                >
                  <a href={`/images/events/${image}`}>
                    <img
                      className="img-fluid"
                      src={`/images/events/${image}`}
                    ></img>
                  </a>
                </div>
              );
            })}
          </div>
        </SRLWrapper>
      </div>
    </div>
  );
};

export default Event;
