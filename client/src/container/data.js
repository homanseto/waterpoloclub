import { v4 as uuidv4 } from 'uuid';

export const navbarLists = ['about', 'login', 'courses', 'events'];

export const carouselsLists = [
  {
    id: uuidv4(),
    title: 'Children Lesson',
    contain: 'This radial gradient starts in the center.',
    class: 'grad1',
    active: 'active',
    link: '',
    dataBsSlideTo: 0,
  },
  {
    id: uuidv4(),
    title: 'Adult Lesson',
    contain: 'This radial gradient starts in the center.',
    class: 'grad2',
    active: '',
    link: '',
    dataBsSlideTo: 1,
  },
  {
    id: uuidv4(),
    title: 'Training',
    contain: 'This radial gradient starts in the center.',
    class: 'grad3',
    active: '',
    link: '',
    dataBsSlideTo: 2,
  },
];
