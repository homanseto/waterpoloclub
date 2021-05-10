import {
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE,
} from './eventType';

import axios from 'axios';

export const fetchEventRequest = () => {
  return {
    type: FETCH_EVENT_REQUEST,
  };
};

export const fetchEventSuccess = (data) => {
  return {
    type: FETCH_EVENT_SUCCESS,
    payload: { data },
  };
};

export const fetchEventFailure = (error) => {
  return {
    type: FETCH_EVENT_FAILURE,
    payload: error,
  };
};

export const fetchEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchEventRequest());
      const data = await axios.get('/api/events');
      const res = await data.data.data;
      dispatch(fetchEventSuccess(res));
    } catch (err) {
      dispatch(fetchEventFailure(err));
    }
  };
};

export const deleteEvent = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchEventRequest());
      await axios.delete(`/api/events/${id}`);
      const newCoursesList = await axios.get('/api/events');
      const res = await newCoursesList.data.data;
      dispatch(fetchEventSuccess(res));
    } catch (err) {
      dispatch(fetchEventFailure(err));
    }
  };
};

export const createEvent = (fd) => {
  return async (dispatch) => {
    try {
      dispatch(fetchEventRequest());
      await axios.post('/api/events', fd);
      const data = await axios.get('/api/events');
      const res = await data.data.data;
      console.log(res);
      dispatch(fetchEventSuccess(res));
    } catch (err) {
      dispatch(fetchEventFailure(err));
    }
  };
};
