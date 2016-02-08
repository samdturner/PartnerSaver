import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskItem.scss';

export default class extends BaseComponent {
  getTaskItemCss() {
    var isOverdue = this.props.$$task.get('isOverdue');
    return isOverdue ? css.taskItem : css.taskItemOverdue;
  }

  render() {
    const { $$task } = this.props;

    return(
      <li className={this.getTaskItemCss()}>
        <div className={css.taskPartner}>
          <span>Cenovus</span>
        </div>
        <div className={css.taskDeadline}>
          <span>{$$task.get('deadline')}</span>
        </div>
        <div className={css.taskDescription}>
          <span>{$$task.get('description')}</span>
        </div>
      </li>
    )
  }
};
