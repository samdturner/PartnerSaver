import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './CreateTask.scss';
import Icon from 'react-fa'

export default class extends BaseComponent {
  static propTypes = {
    selectedTask: ImmutablePropTypes.map.isRequired,
    closeTaskWindow: PropTypes.func.isRequired
  };

  render() {
    const { $$task } = this.props;

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
        <span className={css.businessTitleDisplay}>13/06/2014</span>
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
    return(
      <textarea className={`${css.taskTitle}` + " form-control"}
                placeholder="Task title"
                rows="3"></textarea>
    )
  }

  getTaskDescriptionInput() {
    return(
      <textarea className={`${css.taskDescription}` + " form-control"}
                placeholder="Task description"
                rows="3"></textarea>
    )
  }
};
