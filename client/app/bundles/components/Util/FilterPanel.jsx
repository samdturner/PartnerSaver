import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent';
import css from './Dropdown.scss';
import Icon from 'react-fa'

export default class extends BaseComponent {
  static propTypes = {
    options: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  render() {
    const statusTypes = [
      "Incomplete",
      "In Progress",
      "Complete"
    ];

    return(
      <div className={`${css.filterContainer} well well-sm`}>
        <strong className={css.filterTitle}>
          Status
        </strong>
        {statusTypes.map(function(statusType, idx) {
          const value = idx;
          return(
            <div>
              <label className={css.filterLabel}>
                <input
                    type="checkbox"
                    onChange={this.props.updateFilter.bind(this, '$$statusTypes', value)}
                    checked={this.props.$$filters.get('$$statusTypes').has(value)}
                /> {statusType}
              </label>
            </div>
          )
        }.bind(this))}
      </div>
    )
  }
};
