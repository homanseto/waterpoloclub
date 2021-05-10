import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import {
  updateMe,
  updatePassword,
  getBookedCourses,
  deleteBooking,
  paidBookedCourse,
} from '../../../redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faSpinner } from '@fortawesome/free-solid-svg-icons';

import './User.css';
import axios from 'axios';

const User = (props) => {
  const dispatch = useDispatch();
  const stripePromise = loadStripe(
    'pk_test_51If4fXGoKGurxrDRXQlBZTc0d2NcUI3VXnaaPSXzS27qkKVHB2xuCqtppEFHkQkkuycHNqIHCvjJKuAurVRAuroh007U6nYMJZ'
  );
  const getUsername = localStorage.getItem('username');
  const getUserEmail = localStorage.getItem('email');
  const bookingData = useSelector((state) => state.booking);
  const bookedList =
    bookingData.data.data === undefined ? [] : bookingData.data.data;
  const bookedCourses =
    bookedList.bookings === undefined ? [] : bookedList.bookings;
  const bookedCourseTotalAmount =
    bookedList.price === undefined ? '' : bookedList.price;
  const courseChoice = useSelector((state) => state.courseChoice);
  const titleList = [...Object.keys(courseChoice), 'time', 'price'];

  const [account, setAccount] = useState({
    userName: getUsername || null,
    email: getUserEmail || null,
  });

  const [passwordUpdate, setPasswordUpdate] = useState({
    oldPassword: '',
    newPassword: '',
    newConfirmPassword: '',
  });

  const handleAccount = (e) => {
    const { value, name } = e.target;
    setAccount((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleInformationUpdate = (e) => {
    e.preventDefault();
    dispatch(updateMe(account.userName, account.email));
  };

  const handlePassword = (e) => {
    const { value, name } = e.target;
    setPasswordUpdate((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updatePassword(
        passwordUpdate.oldPassword,
        passwordUpdate.newPassword,
        passwordUpdate.newConfirmPassword
      )
    );
  };

  const handleDeleteBooking = (id) => {
    const delmarked = async () => {
      await dispatch(deleteBooking(id));
      await dispatch(getBookedCourses());
    };
    delmarked();
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;
    const response = await axios.post('/api/bookings/checkout-session');
    const session = await response.data.session;
    await dispatch(paidBookedCourse());
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  };

  const titleHTML = (
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
  );

  useEffect(() => {
    const loadCourses = async () => {
      await dispatch(getBookedCourses());
    };
    loadCourses();
  }, [fetch]);

  return (
    <div>
      <div className="row">
        <form className="user" onSubmit={handleInformationUpdate}>
          <h1>Account Information</h1>
          <div className="form-group">
            <label className="log-page-label">Username</label>
            <input
              name="userName"
              type="test"
              className="form-control"
              value={account.userName}
              onChange={handleAccount}
            ></input>
            <label className="log-page-label">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={account.email}
              onChange={handleAccount}
            ></input>
            <br></br>
            <button type="submit" className="btn change-btn">
              Change Information
            </button>
          </div>
        </form>
        <form className="user" onSubmit={handlePasswordUpdate}>
          <h1>Account Password</h1>
          <div className="form-group">
            <label className="log-page-label">Old Password</label>
            <input
              name="oldPassword"
              type="password"
              className="form-control"
              value={passwordUpdate.oldPassword}
              onChange={handlePassword}
            ></input>
            <label className="log-page-label">New Password</label>
            <input
              name="newPassword"
              type="password"
              className="form-control"
              value={passwordUpdate.newPassword}
              onChange={handlePassword}
            ></input>
            <label className="log-page-label">Confirm New Password</label>
            <input
              name="newConfirmPassword"
              type="password"
              className="form-control"
              value={passwordUpdate.newConfirmPassword}
              onChange={handlePassword}
            ></input>
            <br></br>
            <button type="submit" className="btn change-btn">
              Change Password
            </button>
          </div>
        </form>
      </div>
      <h2>Book Marked</h2>
      {bookingData.loading ? (
        <h1>Loading...</h1>
      ) : (
        <table className="table table-striped display-table">
          {titleHTML}
          {bookedList.results === 0 || bookedCourses === undefined ? (
            <tbody>
              <tr>
                <td colSpan="7">No Bookmarked Courses</td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {bookedCourses.map((booking, i) => {
                return booking.course === undefined ? (
                  <tbody>
                    <tr>
                      <td colSpan="7">No Bookmarked Courses</td>
                    </tr>
                  </tbody>
                ) : (
                  <tr key={booking.course.id}>
                    <td>
                      {booking.course.type[0].toUpperCase() +
                        booking.course.type.slice(1)}
                    </td>
                    <td>
                      {booking.course.level[0].toUpperCase() +
                        booking.course.level.slice(1)}
                    </td>
                    <td>
                      {booking.course.location[0].toUpperCase() +
                        booking.course.location.slice(1)}
                    </td>
                    <td>
                      {booking.course.week[0].toUpperCase() +
                        booking.course.week.slice(1)}
                    </td>
                    <td>{booking.course.time}</td>
                    <td>{booking.course.price}</td>
                    <td>
                      {booking.paid === false ? (
                        <FontAwesomeIcon
                          icon={faMinusSquare}
                          onClick={() => handleDeleteBooking(booking.id)}
                        />
                      ) : (
                        <a>Paid</a>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      )}
      <h3>Totoal Price:{bookedCourseTotalAmount}</h3>
      <button type="submit" className="btn change-btn" onClick={handleCheckOut}>
        Purchcase
      </button>
    </div>
  );
};

export default User;
