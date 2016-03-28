import tasksReducer from './tasksReducer';
import partnersReducer from './partnersReducer';
import { $$initialState as $$tasksState } from './tasksReducer';
import { $$initialState as $$partnersState } from './partnersReducer';

export default {
  $$tasksStore: tasksReducer,
  $$partnersStore: partnersReducer
};

export const initalStates = {
  $$tasksState,
  $$partnersState
};
