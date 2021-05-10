import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGOUT,
} from './userType';
import axios from 'axios';

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: { data },
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

export const logOutSuccess = (data) => {
  return {
    type: LOGOUT,
    payload: data,
  };
};

export const fetchUser = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserRequest());
      const data = await axios.post('/users/login', {
        email,
        password,
      });
      console.log(data);
      dispatch(fetchUserSuccess({ ...data, isLoggedIn: true }));
      localStorage.setItem('email', data.data.data?.user.email);
      localStorage.setItem('username', data.data.data?.user.name);
      localStorage.setItem('role', data.data.data?.user.role);
      localStorage.setItem('id', data.data.data?.user.id);
      localStorage.setItem('isLoggedIn', true);
    } catch (err) {
      dispatch(fetchUserFailure(err.response.data.message));
    }
  };
};

export const signUpUser = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    try {
      console.log(username);
      dispatch(fetchUserRequest());
      const data = await axios.post('/users/signup', {
        name: username,
        email: email,
        password: password,
        passwordConfirm: confirmPassword,
      });
      console.log(data);
      dispatch(fetchUserSuccess({ ...data, isLoggedIn: true }));
      localStorage.setItem('email', data.data.data?.user.email);
      localStorage.setItem('username', data.data.data?.user.name);
      localStorage.setItem('role', data.data.data?.user.role);
      localStorage.setItem('id', data.data.data?.user.id);
      localStorage.setItem('isLoggedIn', true);
    } catch (err) {
      dispatch(fetchUserFailure(err.response.data.message));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const data = await axios.get('/users/logout');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.removeItem('id');
      localStorage.setItem('isLoggedIn', false);
      dispatch(logOutSuccess(data));
    } catch (err) {
      dispatch(fetchUserFailure(err.response.data.message));
    }
  };
};

export const updateMe = (username, email) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserRequest());
      const data = await axios.patch('/users/updateMe', {
        name: username,
        email: email,
      });
      dispatch(fetchUserSuccess(data));
      localStorage.setItem('email', data.data.data?.user.email);
      localStorage.setItem('username', data.data.data?.user.name);
    } catch (err) {
      dispatch(fetchUserFailure(err));
    }
  };
};

export const updatePassword = (passwordCurrent, password, passwordConfirm) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserRequest());
      const data = await axios.patch('/users/updateMyPassword', {
        passwordCurrent,
        password,
        passwordConfirm,
      });
      dispatch(fetchUserSuccess(data));
    } catch (err) {
      dispatch(fetchUserFailure(err));
    }
  };
};
