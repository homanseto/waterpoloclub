import {
  FETCH_BOOKING_REQUEST,
  FETCH_BOOKING_SUCCESS,
  FETCH_BOOKING_FAILURE,
} from './bookingTypes';

import axios from 'axios';

export const fetchBookingRequest = () => {
  return {
    type: FETCH_BOOKING_REQUEST,
  };
};

export const fetchBookingSuccess = (data) => {
  return {
    type: FETCH_BOOKING_SUCCESS,
    payload: { data },
  };
};

export const fetchBookingFailure = (error) => {
  return {
    type: FETCH_BOOKING_FAILURE,
    payload: error,
  };
};

export const makeBooking = (bookmarked) => {
  return async (dispatch) => {
    try {
      dispatch(fetchBookingRequest());
      const data = await axios.post('/api/bookings', {
        courseId: bookmarked,
      });
      dispatch(fetchBookingSuccess(data));
    } catch (err) {
      dispatch(fetchBookingFailure(err.response.data.message));
    }
  };
};

export const deleteBooking = (bookingId) => {
  return async (dispatch) => {
    try {
      console.log(bookingId);
      dispatch(fetchBookingRequest());
      await axios.delete(`/api/bookings/${bookingId}`);
      const newData = await axios.get('/api/bookings/bookedCourses');
      dispatch(fetchBookingSuccess(newData));
    } catch (err) {
      dispatch(fetchBookingFailure(err.response.data.message));
    }
  };
};

export const getBookedCourses = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchBookingRequest());
      const data = await axios.get('/api/bookings/bookedCourses');
      dispatch(fetchBookingSuccess(data));
    } catch (err) {
      dispatch(fetchBookingFailure(err.response.data.message));
    }
  };
};

export const paidBookedCourse = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchBookingRequest());
      const data = await axios.patch('/api/bookings/paid');
      dispatch(fetchBookingSuccess(data));
    } catch (err) {
      dispatch(fetchBookingFailure(err.response.data.message));
    }
  };
};
