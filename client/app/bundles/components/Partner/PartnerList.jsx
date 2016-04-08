import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Immutable from 'immutable';
import _ from 'lodash';

import BaseComponent from 'libs/components/BaseComponent';
import PartnerListHeaders from './PartnerListHeaders';
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
    sortPartners: PropTypes.func.isRequired,
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
            putPartner,
            sortPartners,
            $$selectedPartner } = this.props;

    const $$partners = $$partnersStore.get('$$partners');
    const selectedSortType = $$partnersStore.get('selectedSortType');

    return (
      <div>
        <ul className={this.getPartnerListCss()}>
          <PartnerListHeaders
                          selectedSortType={selectedSortType}
                          location={location}
                          sortPartners={sortPartners}
          />
          <div className={css.partnerListContainer}>
            {$$partners.map($$partner => {
              return(
                <PartnerItem
                        $$partner={$$partner}
                        $$selectedPartner={$$selectedPartner}
                        selectPartner={selectPartner}
                        updatePartner={updatePartner}
                        putPartner={putPartner}
                        key={"partnerItem" + $$partner.get('id')}
                />
              )
            })}
          </div>
        </ul>
      </div>
    )
  }

  getPartnerListCss() {
    const { $$selectedPartner } = this.props;

    return $$selectedPartner ? css.partnerListCompact : css.partnerListExpanded;
  }
};
