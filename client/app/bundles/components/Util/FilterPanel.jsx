import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import BaseComponent from 'libs/components/BaseComponent';
import css from './FilterPanel.scss';

export default class extends BaseComponent {
  static propTypes = {
    options: PropTypes.array.isRequired,
    filterName: PropTypes.string.isRequired,
    filters: ImmutablePropTypes.set.isRequired,
    header: PropTypes.string.isRequired,
    updateFilter: PropTypes.func.isRequired,
  };

  render() {
    const { options, filterName, filters } = this.props;

    return(
      <div className={`${css.filterContainer} well well-sm`}>
        <strong className={css.filterTitle}>
          {this.props.header}
        </strong>
        {options.map(function(option, idx) {
          return(
            <div>
              <label className={css.filterLabel}>
                <input
                    type="checkbox"
                    onChange={this.props.updateFilter.bind(this, filterName, idx)}
                    checked={filters.has(idx)}
                /> {option}
              </label>
            </div>
          )
        }.bind(this))}
      </div>
    )
  }
};
