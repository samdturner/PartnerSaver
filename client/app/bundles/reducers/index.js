// import commentsReducer from './commentsReducer';
// import { $$initialState as $$commentsState } from './commentsReducer';

import tasksReducer from './tasksReducer';
import { $$initialState as $$tasksState } from './tasksReducer';

export default {
  $$store: tasksReducer
};

export const initalStates = {
  $$tasksState
};
