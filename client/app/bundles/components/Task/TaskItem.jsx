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
      'getPartnerName',
      'handleItemClick',
      'getPointer',
      'getTaskItemCss',
      'updateTask',
      'putTask'
    );
  }

  static propTypes = {
    $$task: ImmutablePropTypes.map.isRequired,
    $$partner: ImmutablePropTypes.map.isRequired,
    $$selectedTask: ImmutablePropTypes.map,
    updateTask: PropTypes.func.isRequired,
    putTask: PropTypes.func.isRequired
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
          <span>{this.getPartnerName()}</span>
        </div>
        <div className={css.taskDeadline}>
          <span>{$$task.get('deadline')}</span>
        </div>
        <div className={css.taskDescription}>
          <span>{$$task.get('title')}</span>
        </div>
        {this.getPointer()}
      </li>
    )
  }

  getPartnerName() {
    const { $$partner } = this.props;
    if($$partner) {
      return $$partner.get('name');
    }

    return "";
  }

  handleItemClick(event) {
    const taskId = this.props.$$task.get('id');

    this.props.selectTask(taskId);
  }

  getPointer() {
    const { $$selectedTask, $$task } = this.props;

    if($$selectedTask &&
          $$task.get('id') === $$selectedTask.get('id')) {
      return <div className={css.selectedTaskPointer} />;
    }

    return null;
  }

  getTaskItemCss() {
    var is_overdue = this.props.$$task.get('is_overdue');
    return is_overdue ? css.taskItemOverdue : css.taskItem;
  }

  updateTask(name, value) {
    const { $$task } = this.props;
    const $$updatedTask = $$task.set(name, value);

    this.props.updateTask($$updatedTask);
    this.putTask($$updatedTask);
  }

  putTask($$updatedTask) {
    this.props.putTask($$updatedTask);
  }
};
