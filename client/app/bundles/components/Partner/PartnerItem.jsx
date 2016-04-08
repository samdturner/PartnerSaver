import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './PartnerItem.scss';

export default class extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this,
      'handleItemClick',
      'getPointer',
      'updatePartner',
      'putPartner'
    );
  }

  static propTypes = {
    $$partner: ImmutablePropTypes.map.isRequired,
    selectPartner: PropTypes.func.isRequired,
    updatePartner: PropTypes.func.isRequired,
    putPartner: PropTypes.func.isRequired,
    $$selectedPartner: ImmutablePropTypes.map.isRequired
  };

  render() {
    const { $$partner } = this.props;

    const relationshipStatusArr = [
      'Clusterfuck',
      'Needs Improvement',
      'Best Friends'
    ];

    let relationshipStatusIdx = $$partner.get('relationship_status');
    let relationshipStatus = relationshipStatusArr[relationshipStatusIdx];

    return(
      <li className={css.partnerRow}
          onClick={this.handleItemClick}>
        <div className={css.partnerName}>
          <span>{$$partner.get('name')}</span>
        </div>
        <div className={css.partnerRelationshipStatus}>
          <span>{relationshipStatus}</span>
        </div>
        <div className={css.partnerNote}>
          <span>{$$partner.get('note')}</span>
        </div>
        {this.getPointer()}
        <div className={`text-muted ${css.partnerEditBtn}`}>
          <span>EDIT</span>
        </div>
      </li>
    )
  }

  handleItemClick(event) {
    const partnerId = this.props.$$partner.get('id');

    this.props.selectPartner(partnerId);
  }

  getPointer() {
    const { $$selectedPartner, $$partner } = this.props;

    if($$selectedPartner &&
          $$partner.get('id') === $$selectedPartner.get('id')) {
      return <div className={css.selectedPartnerPointer} />;
    }

    return null;
  }

  updatePartner(name, value) {
    const { $$partner } = this.props;
    const $$updatedTask = $$partner.set(name, value);

    this.props.updatePartner($$updatedTask);
    this.putPartner($$updatedTask);
  }

  putPartner($$updatedTask) {
    this.props.putPartner($$updatedTask);
  }
};
