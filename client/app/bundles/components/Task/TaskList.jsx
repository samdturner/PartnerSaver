import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskList.scss';
import TaskItem from './TaskItem';

export default class TaskList extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      $$tasks: Immutable.fromJS([])
    }

    _.bindAll(this, 'getTasks');
  }

  componentWillMount() {
    const { taskActions, $$tasks } = this.props;

    taskActions.fetchTasks();
  }

  render() {
    return (
      <ul className={css.taskList}>
        {this.getTasks()}
      </ul>
    )
  }

  getTasks() {
    const $$tasks = this.props.$$store.get('$$tasks');

    return(
      $$tasks.map($$task => {
        return(
          <TaskItem $$task={$$task} />
        )
      })
    )
  }
};
