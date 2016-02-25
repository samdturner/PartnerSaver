import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskEditor.scss';
import Icon from 'react-fa'

export default class extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this,
      'getPartnerSelector',
      'getDeadlineSelector',
      'getTaskTypeToggle',
      'getTaskStatusBtn',
      'getTaskTitleInput',
      'getTaskDescriptionInput',
      'handleUpdateTask'
    );
  }

  static propTypes = {
    $$selectedTask: ImmutablePropTypes.map.isRequired,
    closeTaskWindow: PropTypes.func.isRequired
  };

  render() {
    const { $$selectedTask } = this.props;

    return(
      <div className={css.newTaskContainer}>
        <div className={css.header}>
          <a className="close"
             onClick={this.props.closeTaskWindow}>&times;</a>
          {this.getPartnerSelector()}
          {this.getDeadlineSelector()}
        </div>
        <div className={`${css.secondHeader}` + " clearfix"}>
          {this.getTaskTypeToggle()}
          <a href="#" className={`${css.deleteTaskBtn}` + " btn btn-danger btn-xs"}>Delete</a>
        </div>
        <div className={`${css.thirdHeader}` + " clearfix"}>
          {this.getTaskStatusBtn()}
          {this.getTaskTitleInput()}
        </div>
        <div>
          {this.getTaskDescriptionInput()}
        </div>
      </div>
    )
  }

  getPartnerSelector() {
    return(
      <div className={css.partnerSelectorContainer}>
        <div className={css.iconContainer}>
          <Icon name="briefcase" className={css.icon} />
        </div>
        <span className={css.businessTitleDisplay}>Royal Bank of Canada</span>
      </div>
    )
  }

  getDeadlineSelector() {
    return(
      <div className={css.deadlineSelectorContainer}>
        <div className={css.iconContainer}>
          <Icon name="calendar" className={css.icon} />
        </div>
        <span className={css.businessTitleDisplay}>
          {this.props.$$selectedTask.get('pretty_deadline')}
        </span>
      </div>
    )
  }

  getTaskTypeToggle() {
    return(
      <div className={`${css.taskTypeToggleContainer}` + " btn-group btn-group-justified"}>
        <a href="#" className={`${css.taskTypeBtn}` + " btn btn-default btn-xs"}>Deliverable</a>
        <a href="#" className={`${css.taskTypeBtn}` + " btn btn-success btn-xs"}>Reward</a>
      </div>
    )
  }

  getTaskStatusBtn() {
    return(
      <div className={css.taskStatusIconContainer}>
        <Icon name="times" className={css.taskStatusIcon} />
        <div className={css.taskTypeTooltip}>
          <div className={css.taskType}>
            <span>Incomplete</span>
            <Icon name="times" />
          </div>
          <div className={css.taskType}>
            <span>In Progress</span>
            <Icon name="tasks" />
          </div>
          <div className={css.taskType}>
            <span>Complete</span>
            <Icon name="check" />
          </div>
          <div className={css.tooltipArrow} />
        </div>
      </div>
    )
  }

  getTaskTitleInput() {
    const title = this.props.$$selectedTask.get('title');

    return(
      <textarea className={`${css.taskTitle}` + " form-control"}
                value={title}
                onChange={this.handleUpdateTask}
                name="title"
                placeholder="Task title"
                rows="3"></textarea>
    )
  }

  getTaskDescriptionInput() {
    const description = this.props.$$selectedTask.get('description');

    return(
      <textarea className={`${css.taskDescription}` + " form-control"}
                value={description}
                onChange={this.handleUpdateTask}
                name="description"
                placeholder="Task description"
                rows="3"></textarea>
    )
  }

  handleUpdateTask(event) {
    const name = event.target.name;
    const value = event.target.value;

    const { $$selectedTask } = this.props;
    const $$updatedTask = $$selectedTask.set(name, value);
    this.props.updateTask($$updatedTask);
  }
};
