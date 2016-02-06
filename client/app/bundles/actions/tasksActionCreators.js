import requestsManager from 'libs/requestsManager';
import * as actionTypes from '../constants/commentsConstants';

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

export function fetchTasks() {
  return dispatch => {
    dispatch(setIsFetching());
    return (
      requestsManager
        .fetchTasks()
        .then(res => dispatch(fetchTasksSuccess(res.data)))
        .catch(res => dispatch(fetchTasksFailure(res.data)))
    )
  }
}
