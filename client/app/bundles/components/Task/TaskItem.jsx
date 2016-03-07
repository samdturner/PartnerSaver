import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskItem.scss';

import StatusSelector from './StatusSelector';

export default class extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this,
      'handleItemClick',
      'getTaskItemCss',
      'updateTask',
      'putTask'
    );
  }

  static propTypes = {
    $$task: ImmutablePropTypes.map.isRequired,
    $$selectedTask: ImmutablePropTypes.map
  };

  render() {
    const { $$task } = this.props;

    return(
      <li className={this.getTaskItemCss()}
          onClick={this.handleItemClick}>
        <div className={css.taskStatus}>
          <StatusSelector
                      $$task={this.props.$$task}
                      onSelect={this.updateTask}
          />
        </div>
        <div className={css.taskPartner}>
          <span>Cenovus</span>
        </div>
        <div className={css.taskDeadline}>
          <span>{$$task.get('deadline')}</span>
        </div>
        <div className={css.taskDescription}>
          <span>{$$task.get('title')}</span>
        </div>
      </li>
    )
  }

  handleItemClick(event) {
    const taskId = this.props.$$task.get('id');

    this.props.selectTask(taskId);
  }

  getTaskItemCss() {
    var is_overdue = this.props.$$task.get('is_overdue');
    return is_overdue ? css.taskItemOverdue : css.taskItem;
  }

  updateTask(name, value) {
    const { $$selectedTask } = this.props;
    const $$updatedTask = $$selectedTask.set(name, value);

    this.props.updateTask($$updatedTask);
    this.putTask($$updatedTask);
  }

  putTask($$updatedTask) {
    this.props.putTask($$updatedTask);
  }
};
