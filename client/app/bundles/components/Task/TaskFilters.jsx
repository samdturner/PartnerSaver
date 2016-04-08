import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import FilterPanel from '../Util/FilterPanel';
import css from './TaskFilters.scss';

export default class extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this,
      'getMonthFilter',
      'getTaskTypeFilters',
      'getStatusFilter',
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
        {this.getStatusFilter()}
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
      <FilterPanel
              options={months}
              filterName='$$months'
              filters={this.props.$$filters.get('$$months')}
              header='Month Deadline'
              updateFilter={this.props.updateFilter}
      />
    )
  }

  getStatusFilter() {
    const statusTypes = [
      "Incomplete",
      "In Progress",
      "Complete"
    ];

    return(
      <FilterPanel
              options={statusTypes}
              filterName='$$statusTypes'
              filters={this.props.$$filters.get('$$statusTypes')}
              header='Status'
              updateFilter={this.props.updateFilter}
      />
    )
  }

  getTaskTypeFilters() {
    const taskTypes = [
      "Deliverable",
      "Reward"
    ];

    return(
      <div>
        <span className={css.taskTypeFilterHeader}>
          Filter by
        </span>
        <FilterPanel
                options={taskTypes}
                filterName='$$category'
                filters={this.props.$$filters.get('$$category')}
                header='Task Type'
                updateFilter={this.props.updateFilter}
        />
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
