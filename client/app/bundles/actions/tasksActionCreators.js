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

export function setFilter(name, value) {
  return {
    type: actionTypes.SET_FILTER,
    name,
    value
  }
}

export function setVisibleTasks() {
  return {
    type: actionTypes.SET_VISIBLE_TASKS,
  }
}

export function setSelectedTaskId(taskId) {
  return {
    type: actionTypes.SET_SELECTED_TASK_ID,
    selectedTaskId: taskId
  }
}

export function createNewTask(newTask) {
  return {
    type: actionTypes.CREATE_NEW_TASK,
    newTask
  }
}

export function setKeywordSearchTerm(keywordSearchTerm) {
  return {
    type: actionTypes.SET_KEYWORD_SEARCH_TERM,
    keywordSearchTerm
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
        .then(res => dispatch(setVisibleTasks()))
        .catch(res => dispatch(fetchTasksFailure(res.data)))
    )
  }
}

export function getTasks(params) {
  return dispatch => {
    dispatch(setIsFetching());
    return(
      requestsManager
        .fetchTasks(params)
        .then(res => dispatch(fetchTasksSuccess(res.data)))
        .then(res => dispatch(setVisibleTasks()))
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
        .then(res => dispatch(setVisibleTasks()))
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

export function updateFilter(name, value) {
  return dispatch => {
    dispatch(setFilter(name, value));
    dispatch(setVisibleTasks())
  }
}


export function postTask(task) {
  return dispatch => {
    return(
      requestsManager
        .postTask(task)
        .then(res => dispatch(createNewTask(res.data)))
    )
  }
}

export function fetchTasksByKeyword(params) {
  return dispatch => {
    dispatch(setIsFetching());
    dispatch(setKeywordSearchTerm(params.keywordSearchTerm));
    return(
      requestsManager
        .fetchTasks(params)
        .then(res => dispatch(fetchTasksSuccess(res.data)))
        .then(res => dispatch(setVisibleTasks()))
        .catch(res => dispatch(fetchTasksFailure(res.data)))
    )
  }
}
