import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskList.scss';
import TaskItem from './TaskItem';
import TaskListHeader from './TaskListHeader';

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
    selectTask: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <ul className={css.taskList}>
          <li className={css.taskListHeaderRow}>
            {this.getTaskHeaders()}
          </li>
          {this.getTasks()}
        </ul>
      </div>
    )
  }

  getTaskHeaders() {
    const headerAttrs = [
      {
        sortType: 'partner',
        label: 'Partner'
      },
      {
        sortType: 'deadline',
        label: 'Due Date'
      },
      {
        sortType: 'title',
        label: 'Task'
      }
    ];

    const { $$store, location, sortTasks } = this.props;

    return headerAttrs.map((header, idx) => {
      return(
        <TaskListHeader $$store={$$store}
                        location={location}
                        sortTasks={sortTasks}
                        sortType={header.sortType}
                        label={header.label}
                        key={"taskListHeader" + idx}
        />
      )
    })
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
          />
        )
      })
    )
  }
};
