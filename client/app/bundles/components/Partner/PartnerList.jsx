import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import css from './PartnerList.scss';
import PartnerItem from './PartnerItem';

export default class PartnerList extends BaseComponent {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'getPartnerListCss');
  }

  static propTypes = {
    $$partnersStore: ImmutablePropTypes.map.isRequired,
    location: PropTypes.shape({
      state: PropTypes.object
    }).isRequired,
    $$selectedPartner: ImmutablePropTypes.map.isRequired,
    selectPartner: PropTypes.func.isRequired,
    updatePartner: PropTypes.func.isRequired,
    putPartner: PropTypes.func.isRequired
  };

  render() {
    const { $$partnersStore,
            location,
            selectPartner,
            updatePartner,
            putPartner } = this.props;

    const $$partners = $$partnersStore.get('$$partners');

    return (
      <div>
        <ul className={this.getPartnerListCss()}>
          {$$partners.map($$partner => {
            return(
              <PartnerItem
                      $$partner={$$partner}
                      selectPartner={selectPartner}
                      updatePartner={updatePartner}
                      putPartner={putPartner}
                      key={"partnerItem" + $$partner.get('id')}
              />
            )
          })}
        </ul>
      </div>
    )
  }

  getPartnerListCss() {
    const { $$selectedPartner } = this.props;

    return $$selectedPartner ? css.partnerListCompact : css.partnerListExpanded;
  }
};
