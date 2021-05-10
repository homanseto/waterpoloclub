import {
  FETCH_BOOKING_REQUEST,
  FETCH_BOOKING_SUCCESS,
  FETCH_BOOKING_FAILURE,
} from './bookingTypes';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOOKING_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case FETCH_BOOKING_FAILURE:
      return {
        loading: false,
        data: {},
        error: action.payload,
      };

    default:
      return state;
  }
};
export default bookingReducer;
