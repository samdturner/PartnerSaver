import React from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskListHeader.scss';

export default class TaskListHeader extends BaseComponent {
  constructor(props, context) {
    super(props, context);

    _.bindAll(this, 'getClassName', 'handleSortClick');
  }

  render() {
    return (
      <div className={this.getClassName()}
           onClick={this.handleSortClick}>
        {this.props.label}
      </div>
    )
  }

  getClassName() {
    const { sortType } = this.props;

    let className;

    switch(sortType) {
      case 'partner':
        className = `${css.partnerHeader}`;
        break;
      case 'deadline':
        className = `${css.dueDateHeader}`;
        break;
      case 'description':
        className = `${css.descriptionHeader}`;
        break;
      default:
        className = `${css.dueDateHeader}`;
        break;
    }

    const selectedSortType = this.props.$$store.get('selectedSortType');
    const descSortType = sortType + ' desc';
    if(selectedSortType === sortType) {
      className+= ` ${css.sortArrowDesc}`;
    } else if(selectedSortType === descSortType) {
      className+= ` ${css.sortArrowAsc}`;
    }

    return className;
  }

  handleSortClick(event) {
    const { sortType } = this.props;
    const descSortType = sortType + ' desc';
    const selectedSortType = this.props.$$store.get('selectedSortType');

    let newSortType;
    if(sortType === selectedSortType) {
      newSortType = descSortType;
    } else {
      newSortType = sortType;
    }

    this.props.sortTasks(newSortType);
  }
};
