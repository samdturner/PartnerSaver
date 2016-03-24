import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent';
import css from './NewTaskButton.scss';
import Icon from 'react-fa'

export default class extends BaseComponent {
  static propTypes = {
    postTask: PropTypes.func.isRequired
  };

  render() {
    return(
      <a
        className={`${css.newTaskButton} btn btn-primary btn-sm`}
        onClick={this.props.postTask}>
        <i className="fa fa-plus"></i>
        Add Deliverable / Reward
      </a>
    )
  }
};
