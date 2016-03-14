import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './TaskFilters.scss';

export default class extends BaseComponent {
  render() {
    const className = "btn btn-default btn-xs";
    return(
      <div className={css.tasksFiltersContainer}>
        <div className="btn-group btn-group-justified">
          <a href="#"
             className={className}
             name="category"
             value={['1', '2']}
             onClick={this.props.updateFilter.bind(this, "category", [0, 1])}>
            All
          </a>
          <a href="#"
             className={className}
             name="category"
             onClick={this.props.updateFilter.bind(this, "category", [0])}>
             Deliverables
            </a>
          <a href="#"
             className={className}
             name="category"
             onClick={this.props.updateFilter.bind(this, "category", [1])}>
             Rewards
            </a>
        </div>
      </div>
    )
  }
}
