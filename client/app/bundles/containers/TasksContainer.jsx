import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as tasksActionCreators from '../actions/tasksActionCreators';
import TaskList from '../components/Task/TaskList';
import CreateTask from '../components/Task/CreateTask';
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
    _.bindAll(this, 'sortTasks', 'getFetchParams');
  }

  static propTypes = {
    $$store: PropTypes.object.isRequired,
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
    return (
      <div>
        <TaskList {...this.props}
                  sortTasks={this.sortTasks} />
        <CreateTask />
      </div>
    );
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksContainer);
