import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tasksActionCreators from '../actions/tasksActionCreators';
import TaskList from '../components/Task/TaskList';
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
  static propTypes = {
    $$tasks: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired
  };

  render() {
    return (
      <TaskList {...this.props} />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksContainer);
