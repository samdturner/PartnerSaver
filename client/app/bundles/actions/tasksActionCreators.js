import requestsManager from 'libs/requestsManager';
import * as actionTypes from '../constants/tasksConstants';

export function setIsFetching() {
  return {
    type: actionTypes.SET_IS_FETCHING
  }
}

export function setIsSaving() {
  return {
    type: actionTypes.SET_IS_SAVING
  }
}

export function fetchTasksSuccess(tasks) {
  return {
    type: actionTypes.FETCH_TASKS_SUCCESS,
    tasks
  }
}

export function fetchTasksFailure(error) {
  return {
    type: actionTypes.FETCH_TASKS_FAILURE,
    error
  }
}

export function setSortType(newSortType) {
  return {
    type: actionTypes.SET_SORT_TYPE,
    newSortType
  }
}

export function sortTasks(params) {
  return dispatch => {
    dispatch(setIsFetching());
    dispatch(setSortType(params.selectedSortType));
    return(
      requestsManager
        .fetchTasks(params)
        .then(res => dispatch(fetchTasksSuccess(res.data)))
        .catch(res => dispatch(fetchTasksFailure(res.data)))
    )
  }
}

export function updateTask($$task) {
  return {
    type: actionTypes.UPDATE_TASK,
    $$task
  }
}
