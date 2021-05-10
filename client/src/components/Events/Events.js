import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Events.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { fetchEvents } from '../../redux';

const Events = (props) => {
  const dispatch = useDispatch();
  const eventsData = useSelector((state) => state.event);
  const eventsList =
    eventsData.data.data === undefined
      ? []
      : eventsData.data.data &&
        eventsData.data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

  useEffect(() => {
    const loadEvents = async () => {
      await dispatch(fetchEvents());

      // setDisplay(eventsList);
    };
    loadEvents();
  }, [dispatch]);

  return eventsData.loading ? (
    <FontAwesomeIcon icon={faSpinner} />
  ) : (
    <div className="event-card-block row">
      {eventsList.map((list) => {
        return (
          <NavLink
            to={`/events/${list._id}`}
            className="event-card col-lg-4 col-md-6"
            key={list._id}
            title={list.title}
          >
            <div className="card ">
              <img
                className="card-img-top event-image"
                src={`/images/events/${list.images[0]}`}
                alt="Card image cap"
              ></img>
              <div className="card-body">
                <h5 className="card-title event-title">{list.title}</h5>
                <p className="event-text">{list.content}</p>
                <p className="event-date">{`${new Date(list.date).getDate()}/${
                  new Date(list.date).getMonth() + 1
                }/${new Date(list.date).getFullYear()}`}</p>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Events;
