import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as tasksActionCreators from '../actions/tasksActionCreators';
import TaskFilters from '../components/Task/TaskFilters';
import TaskList from '../components/Task/TaskList';
import TaskEditor from '../components/Task/TaskEditor';
import BaseComponent from 'libs/components/BaseComponent';

import css from './TasksContainer.scss';

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
      'setSortType',
      'selectTask',
      'closeTaskWindow',
      'updateTask',
      'putTask',
      'deleteTask',
      'updateFilter',
      'getFetchParams'
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

  render() {
    const { $$store, location } = this.props;

    return (
      <div>
        <div className={`${css.tasksFiltersContainer} clearfix`}>
          <TaskFilters
                  updateFilter={this.updateFilter}
          />
        </div>
        <div className={`${css.tasksContainer} clearfix`}>
          <TaskList $$store={$$store}
                    location={location}
                    setSortType={this.setSortType}
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

  componentWillReceiveProps(nextProps) {
    const { $$store, taskActions } = this.props;
    const $$params = $$store.get('$$params');

    const $$nextParams = nextProps.$$store.get('$$params');

    debugger;

    if($$params !== $$nextParams) {
      taskActions.getTasks(this.getFetchParams($$nextParams));
    }
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
    const { selectedTaskId } = this.state;
    if(!selectedTaskId) {
      return null;
    }

    const $$tasks = this.props.$$store.get('$$tasks');
    return $$tasks.find(function($$task) {
      return selectedTaskId === $$task.get('id');
    });
  }

  setSortType(newSortType) {
    const { taskActions } = this.props;
    taskActions.setSortType(newSortType);
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

  updateFilter(name, value) {
    const { taskActions } = this.props;
    taskActions.updateFilter(name, value);
  }

  getFetchParams($$nextParams) {
    const $$filters = $$nextParams.get('$$filters');

    return $$nextParams.set('filters', $$filters)
                       .delete('$$filters')
                       .toJS();
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksContainer);
