import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createEvent, fetchEvents, deleteEvent } from '../../../../redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import './AdminEvents.css';

const Events = () => {
  const dispatch = useDispatch();
  const titles = ['title', 'date'];
  const eventsData = useSelector((state) => state.event);
  const eventList =
    eventsData.data.data === undefined
      ? []
      : eventsData.data.data &&
        eventsData.data.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
  const [event, setEvent] = useState({
    title: '',
    date: '',
    content: '',
  });
  const [files, setFiles] = useState(null);

  const handleEvent = (e) => {
    const { value, name } = e.target;
    setEvent((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImages = (e) => {
    const files = e.target.files;
    setFiles(files);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const fd = new FormData();
    for (const file of files) {
      fd.append('files', file);
    }
    fd.append('title', event.title);
    fd.append('date', event.date);
    fd.append('content', event.content);
    const updateEvent = async () => {
      await dispatch(createEvent(fd));
    };
    updateEvent();
  };

  const handleDeleteEvent = (id) => {
    const delevent = async () => {
      await dispatch(deleteEvent(id));
      await dispatch(fetchEvents());
    };
    delevent();
  };

  useEffect(() => {
    const loadEvents = async () => {
      await dispatch(fetchEvents());
    };
    loadEvents();
  }, []);

  return (
    <div>
      <form
        className="adminEvents"
        onSubmit={handleUpdate}
        encType="multipart/form-data"
      >
        <h1>Events </h1>
        <div className="form-group">
          <label className="log-page-label">Event Title</label>
          <input
            name="title"
            value={event.title}
            type="text"
            className="form-control"
            onChange={handleEvent}
          ></input>
          <label className="log-page-label">Event Date</label>
          <input
            name="date"
            value={event.date}
            type="date"
            className="form-control"
            onChange={handleEvent}
          ></input>
          <label className="log-page-label">Event Content</label>
          <input
            name="content"
            value={event.content}
            type="text"
            className="form-control"
            onChange={handleEvent}
          ></input>
          <br></br>
          <input type="file" multiple onChange={handleImages}></input>
          <br></br>
          <br></br>
          <button type="submit" className="btn change-btn">
            Upload
          </button>
        </div>
      </form>
      <table className="table table-striped display-table">
        <thead>
          <tr>
            {titles.map((title, i) => {
              return (
                <th key={`${title}-${i}`} scope="col">
                  {title.toUpperCase()}
                </th>
              );
            })}
          </tr>
        </thead>
        {eventsData.loading === true ? (
          <h1>Loading...</h1>
        ) : (
          <tbody>
            {eventList.map((event, i) => {
              return (
                <tr key={event._id}>
                  <td>{event.title}</td>
                  <td>{`${new Date(event.date).getDate()}/${
                    new Date(event.date).getMonth() + 1
                  }/${new Date(event.date).getFullYear()}`}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faMinusSquare}
                      onClick={() => handleDeleteEvent(event._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Events;
