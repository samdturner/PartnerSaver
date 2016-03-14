import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskListHeaders.scss';

export default class TaskListHeaders extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'getClassName', 'handleSortClick');
  }

  static propTypes = {
    selectedSortType: PropTypes.string.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object
    }).isRequired,
    setSortType: PropTypes.func.isRequired
  };

  render() {
    const headerAttrs = [
      {
        sortType: 'partner',
        label: 'Partner',
        className: css.partnerHeader
      },
      {
        sortType: 'deadline',
        label: 'Due Date',
        className: css.dueDateHeader
      },
      {
        sortType: 'title',
        label: 'Task',
        className: css.titleHeader
      }
    ];

    return(
      <li className={css.taskListHeaders}>
        <div className={css.placeholderHeader}></div>
        {headerAttrs.map((header, idx) => {
          return (
            <div className={`${header.className} ${this.getClassName(header.sortType)}`}
                 onClick={this.handleSortClick.bind(this, header.sortType)}
                 key={idx}>
              {header.label}
            </div>
          )
        })}
      </li>
    )
  }

  getClassName(sortType) {
    const { selectedSortType } = this.props;
    const descSortType = sortType + ' desc';
    
    if(selectedSortType === sortType) {
      return css.sortArrowDesc;
    } else if(selectedSortType === descSortType) {
      return css.sortArrowAsc;
    }

    return "";
  }

  handleSortClick(sortType) {
    const { selectedSortType } = this.props;
    const descSortType = sortType + ' desc';

    let newSortType;
    if(sortType === selectedSortType) {
      newSortType = descSortType;
    } else {
      newSortType = sortType;
    }

    this.props.setSortType(newSortType);
  }
};
