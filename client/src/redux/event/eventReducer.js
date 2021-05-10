import {
  FETCH_EVENT_REQUEST,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAILURE,
} from './eventType';

const initialState = {
  loading: false,
  data: {},
  error: '',
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EVENT_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        error: '',
      };
    case FETCH_EVENT_FAILURE:
      return {
        loading: false,
        data: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default eventReducer;
