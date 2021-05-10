import {
  FETCH_COURSE_REQUEST,
  FETCH_COURSE_SUCCESS,
  FETCH_COURSE_FAILURE,
} from './courseType';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COURSE_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case FETCH_COURSE_FAILURE:
      return {
        loading: false,
        data: {},
        error: action.payload,
      };

    default:
      return state;
  }
};

export default courseReducer;
