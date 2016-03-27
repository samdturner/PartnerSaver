import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskFilters.scss';

export default class extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this,
      'getMonthFilter',
      'getTaskTypeFilters',
      'getBtnClassName',
      'keywordSearch'
    );
  }

  static propTypes = {
    $$filters : ImmutablePropTypes.map.isRequired,
    updateFilter: PropTypes.func.isRequired,
    keywordSearch: PropTypes.func.isRequired
  };

  render() {
    return(
      <div className={css.tasksFiltersContainer}>
        {this.getTaskSearchBar()}
        {this.getTaskTypeFilters()}
        {this.getMonthFilter()}
      </div>
    )
  }

  getTaskSearchBar() {
    return(
      <input
          type="text"
          className={`${css.searchBar} form-control`}
          onChange={this.keywordSearch}
          placeholder="Search..."
      />
    )
  }

  keywordSearch(event) {
    this.props.keywordSearch(event.target.value);
  }

  getMonthFilter() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    return(
      <div className={`${css.filterContainer} well well-sm`}>
        <strong className={css.filterTitle}>
          Month Deadline
        </strong>
        {months.map(function(month, idx) {
          const value = idx + 1;
          return(
            <div>
              <label className={css.filterLabel}>
                <input
                    type="checkbox"
                    onChange={this.props.updateFilter.bind(this, '$$months', value)}
                    checked={this.props.$$filters.get('$$months').has(value)}
                /> {month}
              </label>
            </div>
          )
        }.bind(this))}
      </div>
    )
  }

  getTaskTypeFilters() {
    return(
      <div>
        <span className={css.taskTypeFilterHeader}>
          Refine by
        </span>
        <div className="btn-group btn-group-justified">
          <a
           className={this.getBtnClassName(0)}
           name="category"
           onClick={this.props.updateFilter.bind(this, "$$category", 0)}>
             Deliverables
          </a>
          <a
           className={this.getBtnClassName(1)}
           name="category"
           onClick={this.props.updateFilter.bind(this, "$$category", 1)}>
             Rewards
          </a>
        </div>
      </div>
    )
  }

  getBtnClassName(value) {
    const className = "btn btn-default btn-xs";
    const { $$filters } = this.props;

    return $$filters.get("$$category").has(value) ?
                      `${className} ${css.selectedCategory}` :
                      `${className} ${css.unselectedCategory}`;
  }
}
