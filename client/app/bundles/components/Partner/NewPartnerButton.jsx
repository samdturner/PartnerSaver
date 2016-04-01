import React, { PropTypes } from 'react';

import BaseComponent from 'libs/components/BaseComponent';
import css from './NewPartnerButton.scss';
import Icon from 'react-fa'

export default class extends BaseComponent {
  static propTypes = {
    postPartner: PropTypes.func.isRequired
  };

  render() {
    return(
      <a
        className={`${css.newPartnerButton} btn btn-primary btn-sm`}
        onClick={this.props.postPartner}>
        <i className="fa fa-plus"></i>
        Add Partner
      </a>
    )
  }
};
