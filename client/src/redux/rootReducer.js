import { combineReducers } from 'redux';
import userReducer from '../redux/user/userReducer';
import courseReducer from '../redux/course/courseReducer';
import courseChoiceReducer from '../redux/course/courseChoiceReducer';
import eventReducer from '../redux/event/eventReducer';
import bookingReducer from '../redux/booking/bookingReducer';

const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
  courseChoice: courseChoiceReducer,
  event: eventReducer,
  booking: bookingReducer,
});

export default rootReducer;
