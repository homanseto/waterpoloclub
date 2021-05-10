import {
  FETCH_COURSE_REQUEST,
  FETCH_COURSE_SUCCESS,
  FETCH_COURSE_FAILURE,
  FETCH_COURSE_CHOICE,
} from './courseType';

import axios from 'axios';

export const fetchCourseRequest = () => {
  return {
    type: FETCH_COURSE_REQUEST,
  };
};

export const fetchCourseSuccess = (data) => {
  return {
    type: FETCH_COURSE_SUCCESS,
    payload: { data },
  };
};

export const fetchCourseFailure = (error) => {
  return {
    type: FETCH_COURSE_FAILURE,
    payload: error,
  };
};

export const fetchAllCourses = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchCourseRequest());
      const data = await axios.get('/api/courses');
      const res = await data.data.data;

      dispatch(fetchCourseSuccess(res));
    } catch (err) {
      dispatch(fetchCourseFailure(err.response.data.message));
    }
  };
};

export const fetchSortedCourse = (type, level, location, week) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCourseRequest());
      const data = await axios.get(
        `/api/courses?${type}${level}${location}${week}`
      );
      console.log(data);
      const res = await data.data.data;
      dispatch(fetchCourseSuccess(res));
    } catch (err) {
      dispatch(fetchCourseFailure(err.response.data.message));
    }
  };
};

export const deleteCourse = (id) => {
  return async (dispatch) => {
    try {
      dispatch(fetchCourseRequest());
      await axios.delete(`/api/courses/${id}`);
      const newCoursesList = await axios.get('/api/courses');
      const res = await newCoursesList.data.data;
      dispatch(fetchCourseSuccess(res));
    } catch (err) {
      dispatch(fetchCourseFailure(err.response.data.message));
    }
  };
};

export const fetchCourseChoice = () => {
  return {
    type: FETCH_COURSE_CHOICE,
  };
};

export const createCourse = (type, level, location, week, time, price) => {
  return async (dispatch) => {
    console.log(type);
    try {
      dispatch(fetchCourseRequest());
      const data = await axios.post('/api/courses', {
        type,
        level,
        location,
        week,
        time,
        price,
      });
    } catch (err) {
      dispatch(fetchCourseFailure(err.response.data.message));
    }
  };
};
