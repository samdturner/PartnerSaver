import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './PartnerEditor.scss';
import Icon from 'react-fa'
import Dropdown from '../Util/Dropdown';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this,
      'getRelationshipSelector',
      'handleRelationshipSelect',
      'getPartnerNameInput',
      'getPartnerNotesInput',
      'handleUpdateText',
      'updatePartner',
      'putPartner',
      'handleDeletePartner'
    );
    this.putPartner = _.debounce(this.putPartner, 200);
    this.state = { isRelationshipSelectorOpen: false };
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
          <a className={`${css.donePartnerBtn}` + " btn btn-success"}
             onClick={this.props.closePartnerWindow}>
            Done
          </a>
        </div>
      </div>
    )
  }

  getRelationshipSelector() {
    const { $$selectedPartner } = this.props;
    const relationshipStatusArr = [
      'Clusterfuck',
      'Needs Improvement',
      'Best Friends'
    ];

    let relationshipStatusIdx = $$selectedPartner.get('relationship_status');
    let relationshipStatus = "+ Add Relationship Status"
    if(relationshipStatusIdx !== null) {
      relationshipStatus = relationshipStatusArr[relationshipStatusIdx];
    }

    return(
      <div className={css.relationshipSelectorContainer}>
        <div className={css.iconContainer}>
          <Icon name="heartbeat" className={css.icon} />
        </div>
        <span className={css.iconLabel}>{relationshipStatus}</span>
        <Dropdown
              options={this.getDropdownOptions()}
              onSelect={this.handleRelationshipSelect}
        />
      </div>
    )
  }

  getDropdownOptions() {
    const { $$selectedPartner } = this.props;
    let labels = ["Clusterfuck", "Needs Improvement", "Best Friends"];
    let options = [];

    options = labels.map(function(label, idx) {
      let newObject = {};
      newObject.value = idx;
      newObject.label = label;
      newObject.selected = idx === $$selectedPartner.get("relationship_status");
      return newObject;
    });

    return options;
  }

  handleRelationshipSelect(statusId) {
    const { $$selectedPartner } = this.props;
    const $$updatedPartner = $$selectedPartner.set('relationship_status', statusId);
    this.props.updatePartner($$updatedPartner);
    this.props.putPartner($$updatedPartner);
  }

  getPartnerNameInput() {
    let name = this.props.$$selectedPartner.get('name');

    return(
      <input
          className="form-control"
          value={name || ""}
          onChange={this.handleUpdateText}
          name="name"
          placeholder="Partner name"
          rows="3"
      />
    )
  }

  getPartnerNotesInput() {
    let note = this.props.$$selectedPartner.get('note');

    return(
      <textarea
            className={`${css.partnerNotes}` + " form-control"}
            value={note || ""}
            onChange={this.handleUpdateText}
            name="note"
            placeholder="Notes"
            rows="5"
      ></textarea>
    )
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
