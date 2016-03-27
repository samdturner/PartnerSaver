import Immutable from 'immutable';
import redux from 'redux';

import moment from 'moment';

import * as actionTypes from '../constants/tasksConstants';

export const $$initialState = Immutable.fromJS({
  $$tasks: [],
  isFetching: false,
  isSaving: false,
  fetchTasksError: false,
  saveTaskError: false,
  $$filters: {
    $$category: new Immutable.Set([0, 1]),
    $$months: new Immutable.Set([1, 2, 3])
  },
  selectedSortType: 'deadline',
  selectedTaskId: null,
  keywordSearchTerm: ''
});

var isCategoryIncluded = ($$task, $$category) => {
  const category = $$task.get('category');

  return $$category.has(parseInt(category));
}

var isMonthIncluded = ($$task, $$months) => {
  const deadline = $$task.get('deadline');
  const month = moment(deadline, 'YYYY-MM-DD').format('M');

  return $$months.has(parseInt(month));
}

var isTaskVisible = ($$task, $$filters) => {
  let isIncluded = true;

  if(!isMonthIncluded($$task, $$filters.get('$$months'))) {
    isIncluded = false;
  }

  if(!isCategoryIncluded($$task, $$filters.get('$$category'))) {
    isIncluded = false;
  }

  return $$task.set('isIncluded', isIncluded);
}

var setVisibleTasks = function($$tasks, $$filters) {
  return $$tasks.map(function($$task) {
    return isTaskVisible($$task, $$filters)
  })
}

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
      return $$state.merge(
        {
          isFetching: false,
          fetchTasksError: true
        }
      );

    case actionTypes.SET_SORT_TYPE:
      return $$state.set('selectedSortType', action.newSortType);

    case actionTypes.UPDATE_TASK:
      const $$updatedTask = Immutable.fromJS(action.task);
      const updatedTaskId = $$updatedTask.get('id');
      const $$updatedTasks = $$state.get('$$tasks').map(function($$task) {
        if(updatedTaskId === $$task.get('id')) {
          return isTaskVisible($$updatedTask, $$state.get('$$filters'));
        }

        return $$task;
      });

      return $$state.merge({
        $$tasks: $$updatedTasks
      });

    case actionTypes.REMOVE_TASK:
      const deletedTaskId = action.task.id;
      const $$remainingTasks = $$state.get('$$tasks').filterNot(function($$task) {
        return deletedTaskId === $$task.get('id')
      });

      return $$state.merge({
        $$tasks: $$remainingTasks
      });

    case actionTypes.SET_FILTER:
      const $$currentFilterType = $$state.getIn(['$$filters', action.name]);

      let $$newFilterType;
      if($$currentFilterType.has(action.value)) {
        $$newFilterType = $$currentFilterType.delete(action.value);
      } else {
        $$newFilterType = $$currentFilterType.add(action.value);
      }

      return $$state.setIn(['$$filters', action.name], $$newFilterType);

    case actionTypes.SET_VISIBLE_TASKS:
      let $$newTasks = setVisibleTasks($$state.get('$$tasks'), $$state.get('$$filters'));

      return $$state.merge({
        $$tasks: $$newTasks,
      });

    case actionTypes.CREATE_NEW_TASK:
      let $$newTask = Immutable.fromJS(action.newTask);
      $$newTask = $$newTask.set('isIncluded', true);
      const $$newTaskList = $$state.get('$$tasks').unshift($$newTask);

      return $$state.merge({
        $$tasks: $$newTaskList,
        selectedTaskId: $$newTask.get('id')
      });

    case actionTypes.SET_SELECTED_TASK_ID:
      return $$state.merge({
        selectedTaskId: action.selectedTaskId
      });

    case actionTypes.SET_KEYWORD_SEARCH_TERM:
      return $$state.merge({
        keywordSearchTerm: action.keywordSearchTerm
      });

    default: {
      return $$state;
    }
  }
}

export function getParams() {

}
