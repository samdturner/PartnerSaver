import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './PartnerEditor.scss';
import Icon from 'react-fa'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this,
      'getRelationshipSelector',
      'getPartnerNameInput',
      'getPartnerNotesInput',
      'handleUpdateText',
      'updatePartner',
      'putPartner',
      'handleDeletePartner'
    );
    this.putPartner = _.debounce(this.putPartner, 200);
  }

  static propTypes = {
    $$selectedPartner: ImmutablePropTypes.map.isRequired,
    closePartnerWindow: PropTypes.func.isRequired,
    updatePartner: PropTypes.func.isRequired,
    putPartner: PropTypes.func.isRequired,
    deletePartner: PropTypes.func.isRequired
  };

  render() {
    const { $$selectedPartner } = this.props;

    return this.getEditorContent();
  }

  getEditorContent() {
    return(
      <ReactCSSTransitionGroup
                        transitionName="new-item-wrapper"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}>
        {this.getEditor()}
      </ReactCSSTransitionGroup>
    )
  }

  getEditor() {
    if (!this.props.$$selectedPartner) {
      return null;
    }

    return(
      <div className={css.newPartnerWrapper}
           key="new-item-wrapper">
        <div key="new-partner-container"
             className={css.newPartnerContainer}>
          <div className={css.header}>
            <a className="close"
               onClick={this.props.closePartnerWindow}>&times;</a>
            {this.getRelationshipSelector()}
          </div>
          <div className={`${css.secondHeader}` + " clearfix"}>
            <a className={`${css.deletePartnerBtn}` + " btn btn-danger btn-xs"}
               onClick={this.handleDeletePartner}>
              Delete
            </a>
          </div>
          <div className={`${css.thirdHeader}` + " clearfix"}>
            {this.getPartnerNameInput()}
          </div>
          <div>
            {this.getPartnerNotesInput()}
          </div>
        </div>
      </div>
    )
  }

  getRelationshipSelector() {
    return(
      <div className={css.partnerSelectorContainer}>
        <div className={css.iconContainer}>
          <Icon name="briefcase" className={css.icon} />
        </div>
        <span className={css.iconLabel}>Royal Bank of Canada</span>
      </div>
    )
  }

  getPartnerNameInput() {
    const title = this.props.$$selectedPartner.get('title');

    return(
      <input
          className="form-control"
          value={title}
          onChange={this.handleUpdateText}
          name="title"
          placeholder="Partner name"
          rows="3"
      />
    )
  }

  getPartnerNotesInput() {
    const description = this.props.$$selectedPartner.get('description');

    return(
      <textarea
            className={`${css.partnerNotes}` + " form-control"}
            value={description}
            onChange={this.handleUpdateText}
            name="description"
            placeholder="Notes"
            rows="3"
      ></textarea>
    )
  }

  handleUpdateDate(newDate) {
    const newDateStr = newDate.format("YYYY-MM-DD");
    this.updatePartner("deadline", newDateStr);
  }

  handleUpdateText(event) {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;

    this.updatePartner(name, value);
  }

  updatePartner(name, value) {
    const { $$selectedPartner } = this.props;
    const $$updatedPartner = $$selectedPartner.set(name, value);

    this.props.updatePartner($$updatedPartner);
    this.putPartner($$updatedPartner);
  }

  putPartner($$updatedPartner) {
    this.props.putPartner($$updatedPartner);
  }

  handleDeletePartner() {
    const { $$selectedPartner } = this.props;
    this.props.closePartnerWindow();
    this.props.deletePartner($$selectedPartner);
  }
};
