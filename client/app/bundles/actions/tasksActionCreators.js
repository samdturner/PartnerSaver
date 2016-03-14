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

export function updateTask(task) {
  return {
    type: actionTypes.UPDATE_TASK,
    task
  }
}

export function removeTask(task) {
  return {
    type: actionTypes.REMOVE_TASK,
    task
  }
}

export function updateFilter(name, value) {
  return {
    type: actionTypes.UPDATE_FILTER,
    name,
    value
  }
}

export function getTasks(params) {
  return dispatch => {
    dispatch(setIsFetching());
    return(
      requestsManager
        .fetchTasks(params)
        .then(res => dispatch(fetchTasksSuccess(res.data)))
        .catch(res => dispatch(fetchTasksFailure(res.data)))
    )
  }
}

export function putTask(task) {
  return dispatch => {
    return(
      requestsManager
        .updateTask(task)
        .then(res => dispatch(updateTask(res.data)))
    )
  }
}

export function deleteTask(task) {
  return dispatch => {
    dispatch(removeTask(task));
    return(
      requestsManager
        .deleteTask(task)
        .then(res => dispatch(removeTask(res.data)))
    )
  }
}
