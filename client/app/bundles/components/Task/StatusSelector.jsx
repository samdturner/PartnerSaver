import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './StatusSelector.scss';
import Icon from 'react-fa'

export default class extends BaseComponent {
  static propTypes = {
    $$task: ImmutablePropTypes.map.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  render() {
    const status = this.props.$$task.get('status');
    const statusOptions = [
      {
        statusLabel: "Incomplete",
        icon: "times"
      },
      {
        statusLabel: "In Progress",
        icon: "tasks"
      },
      {
        statusLabel: "Complete",
        icon: "check"
      }
    ];

    return(
      <div className={css.taskStatusIconContainer}
           onClick={this.handleContainerClick}>
        <div className={css.categoriesContainer}>
          <div className={css.categories}>
            {statusOptions.map((option, idx) => {
                return(
                  <div className={css.category}
                       onClick={this.props.onSelect.bind(this, "status", idx)}
                       key={idx}>
                    <div className={css.categoryLabelContainer}>
                      <span>{option.statusLabel}</span>
                    </div>
                    <Icon name={option.icon} />
                  </div>
                )
              })}
          </div>
        </div>
        <Icon name={statusOptions[status]["icon"]} className={css.taskStatusIcon} />
      </div>
    )
  }

  handleContainerClick(event) {
    event.stopPropagation();
  }
};
