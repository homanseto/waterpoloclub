import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGOUT,
} from './userType';

const initialState = {
  loading: false,
  data: {},
  isLoggedIn: false,
  error: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        isLoggedIn: action.payload.data.isLoggedIn,
        error: '',
      };
    case LOGOUT:
      return {
        loading: false,
        isLoggedIn: false,
        data: action.payload,
        error: '',
      };
    case FETCH_USER_FAILURE:
      return {
        loading: false,
        isLoggedIn: false,
        data: {},
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
