import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskList.scss';
import TaskItem from './TaskItem';
import TaskListHeaders from './TaskListHeaders';

export default class TaskList extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    _.bindAll(this, 'getTasks');
  }

  static propTypes = {
    $$store: ImmutablePropTypes.map.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object
    }).isRequired,
    sortTasks: PropTypes.func.isRequired,
    $$selectedTask: ImmutablePropTypes.map,
    selectTask: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    putTask: PropTypes.func.isRequired
  };

  render() {
    const { $$store, location, sortTasks } = this.props;

    return (
      <div>
        <ul className={css.taskList}>
          <TaskListHeaders $$store={$$store}
                          location={location}
                          sortTasks={sortTasks}
          />
          {this.getTasks()}
        </ul>
      </div>
    )
  }

  getTasks() {
    const $$tasks = this.props.$$store.get('$$tasks');
    const { $$selectedTask, selectTask } = this.props;

    return(
      $$tasks.map($$task => {
        return(
          <TaskItem $$task={$$task}
                    $$selectedTask={$$selectedTask}
                    selectTask={selectTask}
                    key={"taskItem" + $$task.get('id')}
                    updateTask={this.props.updateTask}
                    putTask={this.props.putTask}
          />
        )
      })
    )
  }
};
