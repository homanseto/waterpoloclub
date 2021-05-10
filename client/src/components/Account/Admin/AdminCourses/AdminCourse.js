import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './AdminCourse.css';
import { fetchAllCourses, deleteCourse, createCourse } from '../../../../redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';

const AdminCourses = () => {
  const dispatch = useDispatch();
  const courseChoice = useSelector((state) => state.courseChoice);
  const titleList = [...Object.keys(courseChoice), 'time', 'price', 'bookings'];
  const addCourseTitle = [...Object.keys(courseChoice), 'time', 'price'];
  const courseData = useSelector((state) => state.course);
  const coursesList =
    courseData.data.data === undefined ? [] : courseData.data.data;

  const [course, setCourse] = useState({
    type: '',
    level: '',
    location: '',
    week: '',
    time: '',
    price: '',
  });

  const handleCourse = (e) => {
    const { value, name } = e.target;
    setCourse((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCourseSumbit = (e) => {
    e.preventDefault();
    const updateCourses = async () => {
      await dispatch(
        createCourse(
          course.type,
          course.level,
          course.location,
          course.week,
          course.time,
          course.price
        )
      );
      await dispatch(fetchAllCourses());
    };
    updateCourses();
  };

  useEffect(() => {
    const loadCourses = async () => {
      await dispatch(fetchAllCourses());
    };
    loadCourses();
  }, []);

  const handleDeleteCourse = (id) => {
    const delmarked = async () => {
      await dispatch(deleteCourse(id));
      await dispatch(fetchAllCourses());
    };
    delmarked();
  };

  console.log(courseData);

  return (
    <div className="adminCourse">
      <h1>Edit Courses</h1>
      <form onSubmit={handleCourseSumbit}>
        <table className="table table-striped display-table">
          <thead>
            <tr>
              {addCourseTitle.map((title, i) => {
                return (
                  <th key={`${title}-${i}`} scope="col">
                    {title.toUpperCase()}
                  </th>
                );
              })}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {addCourseTitle.map((el, i) => {
              return (
                <td>
                  <input
                    className="course-input"
                    name={el}
                    type="text"
                    value={course[el.toString()]}
                    onChange={handleCourse}
                  ></input>
                </td>
              );
            })}
          </tbody>
        </table>
        <button className="admin-course-btn" type="submit">
          Submit
        </button>
      </form>
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
        {courseData.loading === true ? (
          <h1>Loading...</h1>
        ) : (
          <tbody>
            {coursesList.map((course, i) => {
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
                  <td>{course.bookings.length}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faMinusSquare}
                      onClick={() => handleDeleteCourse(course.id)}
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

export default AdminCourses;
