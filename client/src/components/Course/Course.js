import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Course.css';
import {
  faPlusSquare,
  faSpinner,
  faChevronCircleDown,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchSortedCourse, makeBooking } from '../../redux';

const Course = (props) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('id');
  const coursesData = useSelector((state) => state.course);
  const courseBooking = useSelector((state) => state.booking);
  const courseChoice = useSelector((state) => state.courseChoice);
  const [type, setType] = useState('');
  const [level, setLevel] = useState('');
  const [location, setLocation] = useState('');
  const [week, setWeek] = useState('');

  const titleList = [...Object.keys(courseChoice), 'time', 'price'];
  const resultCourses = coursesData.data;

  const handleTypeSelect = (clicked, e) => {
    const selected = clicked === 'select' ? '' : `type=${clicked}`;
    setType(selected);
    e.preventDefault();
  };
  const handleLevelSelect = (clicked, e) => {
    const selected = clicked === 'select' ? '' : `&level=${clicked}`;
    setLevel(selected);
    e.preventDefault();
  };
  const handleLocationSelect = (clicked, e) => {
    const selected = clicked === 'select' ? '' : `&location=${clicked}`;
    setLocation(selected);
    e.preventDefault();
  };
  const handleWeekSelect = (clicked, e) => {
    const selected = clicked === 'select' ? '' : `&week=${clicked}`;
    setWeek(selected);
    e.preventDefault();
  };

  const functionArray = [
    handleTypeSelect,
    handleLevelSelect,
    handleLocationSelect,
    handleWeekSelect,
  ];
  const selectedArray = [
    type.slice(5),
    level.slice(7),
    location.slice(10),
    week.slice(6),
  ];

  let typeEmpty = false;

  const handleSearch = (e) => {
    e.preventDefault();
    const search =
      type === ''
        ? (typeEmpty = true)
        : dispatch(fetchSortedCourse(type, level, location, week));
    return search;
  };

  const handleBookMarked = (id) => {
    const reRender = async () => {
      await dispatch(makeBooking(id));

      await dispatch(fetchSortedCourse(type, level, location, week));
    };
    reRender();
  };

  useEffect(() => {});

  const dropdown = (item, i) => {
    return (
      <div className="dropdown">
        <button
          className="btn dropdown-btn "
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {selectedArray[i] === ''
            ? 'Select'
            : selectedArray[i][0].toUpperCase() + selectedArray[i].slice(1)}
          <FontAwesomeIcon
            className="caretDownIcon"
            icon={faChevronCircleDown}
          />
        </button>
        <div
          className="dropdown-menu dropdown-list"
          aria-labelledby="dropdownMenuButton"
        >
          {courseChoice[item].map((list, key) => {
            return (
              <a
                className="dropdown-item"
                href="#"
                value={list}
                onClick={(e) => functionArray[i](list, e)}
                key={`${list}${key}`}
              >
                {list[0].toUpperCase() + list.slice(1)}
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="course-page">
      <h1 className="course-heading">Search your course</h1>
      <div className="course-table">
        <div className="row course-title-row">
          {Object.keys(courseChoice).map((list, i) => {
            return list === 'type' ? (
              <div
                className="col-lg-3 col-md-6 course-title"
                key={`${list}-${i}`}
              >
                {list[0].toLocaleUpperCase() + list.slice(1) + '*'}
                {dropdown(list, i)}
              </div>
            ) : (
              <div
                className="col-lg-3  col-md-6 course-title"
                key={`${list}-${i}`}
              >
                {list[0].toLocaleUpperCase() + list.slice(1)}
                {dropdown(list, i)}
              </div>
            );
          })}
        </div>
        <div className="row search-row">
          <h2 className="hints col-lg-6 col-md-6 col-sm-6">
            Type cannot be empty
          </h2>
          <div className="search-btn-col col-lg-6 col-md-6 col-sm-6">
            <button
              type="button"
              className="btn search-btn"
              onClick={handleSearch}
            >
              <FontAwesomeIcon icon={faSearch} /> Search
            </button>
          </div>
        </div>
      </div>

      <h1 className="error-message">{courseBooking && courseBooking.error}</h1>
      <table className="table table-striped display-table">
        <thead>
          <tr>
            {titleList.map((title, i) => {
              return (
                <th key={`${title}-${i}`} scope="col">
                  {title.toUpperCase()}
                </th>
              );
            })}
            <th></th>
          </tr>
        </thead>
        {Object.entries(coursesData.data).length === 0 || typeEmpty === true ? (
          <tbody>
            <tr>
              <td colSpan="7">No Search Results</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {resultCourses.data.map((course, i) => {
              return (
                <tr key={course._id}>
                  <td>{course.type[0].toUpperCase() + course.type.slice(1)}</td>
                  <td>
                    {course.level[0].toUpperCase() + course.level.slice(1)}
                  </td>
                  <td>
                    {course.location[0].toUpperCase() +
                      course.location.slice(1)}
                  </td>
                  <td>{course.week[0].toUpperCase() + course.week.slice(1)}</td>
                  <td>{course.time}</td>
                  <td>{course.price}</td>
                  <td>
                    {course.bookings
                      .map((booking) => booking.user.id)
                      .includes(userId) ? (
                      <p>bookmarked</p>
                    ) : courseBooking.loading ? (
                      <FontAwesomeIcon icon={faSpinner} />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPlusSquare}
                        onClick={() => handleBookMarked(course.id)}
                      />
                    )}
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

export default Course;
