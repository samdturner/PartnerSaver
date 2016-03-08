import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as tasksActionCreators from '../actions/tasksActionCreators';
import TaskList from '../components/Task/TaskList';
import TaskEditor from '../components/Task/TaskEditor';
import BaseComponent from 'libs/components/BaseComponent';

function mapStateToProps(state, ownProps) {
  return { $$store: state.$$store }
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
      'getFetchParams',
      'selectTask',
      'closeTaskWindow',
      'updateTask',
      'putTask',
      'deleteTask'
    );
    this.state = { selectedTaskId: null };
  }

  static propTypes = {
    $$store: ImmutablePropTypes.map.isRequired,
    taskActions: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired
  };

  componentDidMount() {
    const { taskActions } = this.props;
    taskActions.sortTasks(this.getFetchParams());
  }

  render() {
    const { $$store, location } = this.props;

    return (
      <div>
        <TaskList $$store={$$store}
                  location={location}
                  sortTasks={this.sortTasks}
                  $$selectedTask={this.getSelectedTask()}
                  selectTask={this.selectTask}
                  updateTask={this.updateTask}
                  putTask={this.putTask}
        />
        {this.getTaskWindow()}
      </div>
    );
  }

  getTaskWindow() {
    const $$selectedTask = this.getSelectedTask();
    if(!$$selectedTask) {
      return null;
    }

    return(
      <TaskEditor $$selectedTask={$$selectedTask}
                  closeTaskWindow={this.closeTaskWindow}
                  updateTask={this.updateTask}
                  putTask={this.putTask}
                  deleteTask={this.deleteTask}
      />
    )
  }

  getSelectedTask() {
    const { selectedTaskId } = this.state;
    if(!selectedTaskId) {
      return null;
    }

    const $$tasks = this.props.$$store.get('$$tasks');
    return $$tasks.find(function($$task) {
      return selectedTaskId === $$task.get('id');
    });
  }

  sortTasks(newSortType) {
    const { taskActions } = this.props;
    const newParams = { selectedSortType: newSortType };
    taskActions.sortTasks(this.getFetchParams(newParams));
  }

  getFetchParams(newParams) {
    const { taskActions, $$store } = this.props;
    const selectedSortType = $$store.getIn(['selectedSortType']);
    const currentParams = { selectedSortType: selectedSortType };
    return _.assign(currentParams, newParams);
  }

  selectTask(taskId) {
    this.setState({ selectedTaskId: taskId });
  }

  closeTaskWindow() {
    this.setState({ selectedTaskId: null });
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksContainer);
