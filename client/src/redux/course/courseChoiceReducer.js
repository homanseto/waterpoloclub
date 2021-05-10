import { FETCH_COURSE_CHOICE } from './courseType';

const initialState = {
  type: ['select', 'children', 'adult', 'training'],
  level: ['select', 'beginner', 'intermediate', 'advanced'],
  location: ['select', 'mei_foo', 'sham_shui_po', 'kowloon_park', 'tai_wo_hau'],
  week: [
    'select',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ],
};

const courseChoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_CHOICE:
      return {
        ...state,
      };
  }
  return state;
};

export default courseChoiceReducer;
