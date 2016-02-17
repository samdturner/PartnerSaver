import Immutable from 'immutable';
import redux from 'redux';

import * as actionTypes from '../constants/tasksConstants';

export const $$initialState = Immutable.fromJS({
  $$tasks: [],
  selectedSortType: 'deadline',
  isFetching: false,
  isSaving: false,
  fetchTasksError: false,
  saveTaskError: false
});

export default function tasksReducer($$state = $$initialState, action = null) {
  const { type, tasks, task, error } = action;

  switch(action.type) {
    case actionTypes.SET_IS_FETCHING:
      return $$state.merge({
        isFetching: true
      });

    case actionTypes.SET_IS_SAVING:
      return $$state.merge({
        isSaving: true
      });

    case actionTypes.FETCH_TASKS_SUCCESS:
      return $$state.merge({
        $$tasks: Immutable.fromJS(action.tasks),
        isFetching: false
      });

    case actionTypes.FETCH_TASKS_FAILURE:
      return $$state.merge({
        isFetching: false,
        fetchTasksError: true
      });

    case actionTypes.SET_SORT_TYPE:
      return $$state.merge({
        selectedSortType: action.newSortType
      });

    default: {
      return $$state;
    }
  }
}
