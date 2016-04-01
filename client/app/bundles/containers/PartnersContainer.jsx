import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as partnersActionCreators from '../actions/partnersActionCreators';
import PartnerList from '../components/Partner/PartnerList';
import PartnerEditor from '../components/Partner/PartnerEditor';
import NewPartnerButton from '../components/Partner/NewPartnerButton';
import BaseComponent from 'libs/components/BaseComponent';

import css from './PartnersContainer.scss';

function mapStateToProps(state, ownProps) {
  return { $$partnersStore: state.$$partnersStore }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    partnerActions: bindActionCreators(partnersActionCreators, dispatch)
  };
}

export default class PartnersContainer extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this,
      'selectPartner',
      'updatePartner',
      'putPartner',
      'closePartnerWindow',
      'deletePartner',
      'postPartner'
    );
  }

  static propTypes = {
    $$partnersStore: ImmutablePropTypes.map.isRequired,
    partnerActions: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object,
    }).isRequired
  };

  render() {
    const { $$partnersStore, location } = this.props;

    return (
      <div>
        <div className={`${css.partnersContainer} clearfix`}>
          <NewPartnerButton postPartner={this.postPartner} />
          <PartnerList
                  $$partnersStore={$$partnersStore}
                  location={location}
                  $$selectedPartner={this.getSelectedPartner()}
                  selectPartner={this.selectPartner}
                  updatePartner={this.updatePartner}
                  putPartner={this.putPartner}
          />
          {this.getPartnerWindow()}
        </div>
      </div>
    );
  }

  selectPartner(partnerId) {
    const { partnerActions } = this.props;
    partnerActions.setSelectedPartnerId(partnerId);
  }

  updatePartner($$partner) {
    const { partnerActions } = this.props;
    const partner = $$partner.toJS();
    partnerActions.updatePartner(partner);
  }

  putPartner($$partner) {
    const { partnerActions } = this.props;
    const partner = $$partner.toJS();
    partnerActions.putPartner(partner);
  }

  getSelectedPartner() {
    const { $$partnersStore } = this.props;
    const selectedPartnerId = $$partnersStore.get('selectedPartnerId');

    if(!selectedPartnerId) {
      return null;
    }

    const $$partners = this.props.$$partnersStore.get('$$partners');
    return $$partners.find(function($$partner) {
      return selectedPartnerId === $$partner.get('id');
    });
  }

  getPartnerWindow() {
    const $$selectedPartner = this.getSelectedPartner();

    return(
      <PartnerEditor
                $$selectedPartner={$$selectedPartner}
                closePartnerWindow={this.closePartnerWindow}
                updatePartner={this.updatePartner}
                putPartner={this.putPartner}
                deletePartner={this.deletePartner}
                key="partnerEditor"
      />
    )
  }

  closePartnerWindow() {
    const { partnerActions } = this.props;
    partnerActions.setSelectedPartnerId(null);
  }

  deletePartner($$partner) {
    const { partnerActions } = this.props;
    const partner = $$partner.toJS();
    partnerActions.deletePartner(partner);
  }

  postPartner(event) {
    const { partnerActions } = this.props;
    partnerActions.postPartner({});
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PartnersContainer);
