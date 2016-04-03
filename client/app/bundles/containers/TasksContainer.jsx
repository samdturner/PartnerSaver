import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as tasksActionCreators from '../actions/tasksActionCreators';
import TaskFilters from '../components/Task/TaskFilters';
import TaskList from '../components/Task/TaskList';
import TaskEditor from '../components/Task/TaskEditor';
import NewTaskButton from '../components/Task/NewTaskButton';
import BaseComponent from 'libs/components/BaseComponent';

import css from './TasksContainer.scss';

function mapStateToProps(state, ownProps) {
  return {
    $$tasksStore: state.$$tasksStore,
    $$partnersStore: state.$$partnersStore
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    taskActions: bindActionCreators(tasksActionCreators, dispatch)
  };
}

export default class TasksContainer extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this,
      'getTaskWindow',
      'getSelectedTask',
      'sortTasks',
      'selectTask',
      'closeTaskWindow',
      'updateTask',
      'putTask',
      'deleteTask',
      'updateFilter',
      'postTask',
      'keywordSearch'
    );
  }

  static propTypes = {
    $$tasksStore: ImmutablePropTypes.map.isRequired,
    taskActions: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired
  };

  componentWillMount() {
    const { taskActions } = this.props;
    taskActions.setVisibleTasks();
  }

  render() {
    const { $$tasksStore, $$partnersStore, location } = this.props;
    const $$partners = $$partnersStore.get('$$partners');

    return (
      <div>
        <div className={`${css.tasksFiltersContainer} clearfix`}>
          <TaskFilters
                  $$filters={$$tasksStore.get('$$filters')}
                  updateFilter={this.updateFilter}
                  keywordSearch={this.keywordSearch}
          />
        </div>
        <div className={`${css.tasksContainer} clearfix`}>
          <NewTaskButton postTask={this.postTask} />
          <TaskList $$tasksStore={$$tasksStore}
                    $$partners={$$partners}
                    location={location}
                    sortTasks={this.sortTasks}
                    $$selectedTask={this.getSelectedTask()}
                    selectTask={this.selectTask}
                    updateTask={this.updateTask}
                    putTask={this.putTask}
          />
          {this.getTaskWindow()}
        </div>
      </div>
    );
  }

  getTaskWindow() {
    const $$selectedTask = this.getSelectedTask();

    return(
      <TaskEditor $$selectedTask={$$selectedTask}
                  closeTaskWindow={this.closeTaskWindow}
                  updateTask={this.updateTask}
                  putTask={this.putTask}
                  deleteTask={this.deleteTask}
                  key="taskEditor"
      />
    )
  }

  getSelectedTask() {
    const { $$tasksStore } = this.props;
    const selectedTaskId = $$tasksStore.get('selectedTaskId');

    if(!selectedTaskId) {
      return null;
    }

    const $$tasks = this.props.$$tasksStore.get('$$tasks');
    return $$tasks.find(function($$task) {
      return selectedTaskId === $$task.get('id');
    });
  }

  sortTasks(newSortType) {
    const { taskActions, $$tasksStore } = this.props;

    const params = {
      keywordSearchTerm: $$tasksStore.get('keywordSearchTerm'),
      selectedSortType: newSortType
    };

    taskActions.sortTasks(params);
  }

  selectTask(taskId) {
    const { taskActions } = this.props;
    taskActions.setSelectedTaskId(taskId);
  }

  closeTaskWindow() {
    const { taskActions } = this.props;
    taskActions.setSelectedTaskId(null);
  }

  updateTask($$task) {
    const { taskActions } = this.props;
    const task = $$task.toJS();
    taskActions.updateTask(task);
  }

  putTask($$task) {
    const { taskActions } = this.props;
    const task = $$task.toJS();
    taskActions.putTask(task);
  }

  deleteTask($$task) {
    const { taskActions } = this.props;
    const task = $$task.toJS();
    taskActions.deleteTask(task);
  }

  updateFilter(name, value) {
    const { taskActions } = this.props;
    taskActions.updateFilter(name, value);
  }

  postTask(event) {
    const { taskActions } = this.props;
    taskActions.postTask({});
  }

  keywordSearch(keywordSearchTerm) {
    const { taskActions, $$tasksStore } = this.props;

    const params = {
      keywordSearchTerm,
      selectedSortType: $$tasksStore.get('selectedSortType')
    };

    taskActions.fetchTasksByKeyword(params);
  }
}

TasksContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksContainer);
