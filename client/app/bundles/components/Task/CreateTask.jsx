import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './CreateTask.scss';
import Icon from 'react-fa'

export default class extends BaseComponent {
  render() {
    const { $$task } = this.props;

    return(
      <div className={css.newTaskContainer}>
        <div className={css.header}>
          <a className="close">&times;</a>
          {this.getPartnerSelector()}
          {this.getDeadlineSelector()}
        </div>
        {this.getTaskTypeToggle()}
        <a href="#" className={`${css.deleteTaskBtn}` + " btn btn-danger btn-sm"}>Delete</a>
      </div>
    )
  }

  getPartnerSelector() {
    return(
      <div className={css.partnerSelectorContainer}>
        <div className={css.businessIconContainer}>
          <Icon name="briefcase" className={css.businessIcon} />
        </div>
        <span className={css.businessTitleDisplay}>Royal Bank of Canada</span>
      </div>
    )
  }

  getDeadlineSelector() {
    return(
      <div className={css.deadlineSelectorContainer}>
        <div className={css.businessIconContainer}>
          <Icon name="calendar" className={css.businessIcon} />
        </div>
        <span className={css.businessTitleDisplay}>13/06/2014</span>
      </div>
    )
  }

  getTaskTypeToggle() {
    return(
      <div className={`${css.taskTypeToggleContainer}` + " btn-group btn-group-justified"}>
        <a href="#" className="btn btn-default btn-sm">Deliverable</a>
        <a href="#" className="btn btn-success btn-sm">Reward</a>
      </div>
    )
  }
};
