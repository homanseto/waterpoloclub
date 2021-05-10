import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './LatestNews.css';
import { fetchEvents } from '../../../redux';

const LatestNews = (props) => {
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
    };
    loadEvents();
  }, [dispatch]);

  return (
    <div>
      <h2 className="news-heading">EVENTS</h2>
      {eventsList.slice(0, 5).map((list) => {
        return (
          <div className="row news-list-row" key={list._id}>
            <div className="col-lg-4">{`${new Date(list.date).getDate()}/${
              new Date(list.date).getMonth() + 1
            }/${new Date(list.date).getFullYear()}`}</div>
            <NavLink
              to={`/events/${list._id}`}
              className="col-lg-8 news-list-link"
              key={list._id}
            >
              {list.title}
            </NavLink>
          </div>
        );
      })}
      <NavLink to="/events">
        <button type="button" className="btn btn-lg news-btn">
          VIEW ALL
        </button>
      </NavLink>
    </div>
  );
};

export default LatestNews;
