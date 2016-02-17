import React from 'react';
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

  render() {
    return (
      <div>
        <ul className={css.taskList}>
          <li className={css.taskListHeaderRow}>
            <TaskListHeader {...this.props}
                            sortType='partner'
                            label='Partner'
            />
            <TaskListHeader {...this.props}
                            sortType='deadline'
                            label='Due Date'
            />
            <TaskListHeader {...this.props}
                            sortType='description'
                            label='Task'
            />
          </li>
          {this.getTasks()}
        </ul>
      </div>
    )
  }

  getTasks() {
    const $$tasks = this.props.$$store.get('$$tasks');

    return(
      $$tasks.map($$task => {
        return(
          <TaskItem {...this.props}
                    $$task={$$task}
                    key={$$tasks.get('id')} />
        )
      })
    )
  }
};
