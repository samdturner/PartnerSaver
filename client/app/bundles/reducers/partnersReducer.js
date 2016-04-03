import Immutable from 'immutable';
import redux from 'redux';

import moment from 'moment';

import * as actionTypes from '../constants/partnersConstants';

export const $$initialState = Immutable.fromJS({
  $$partners: [],
  selectedPartnerId: null,
  selectedSortType: 'name'
});

export default function partnersReducer($$state = $$initialState, action = null) {
  const { type } = action;

  switch(action.type) {
    case actionTypes.FETCH_PARTNERS_SUCCESS:
      return $$state.merge({
        $$partners: Immutable.fromJS(action.partners)
      });

    case actionTypes.SET_SELECTED_PARTNER_ID:
      return $$state.merge({
        selectedPartnerId: action.selectedPartnerId
      });

    case actionTypes.REMOVE_PARTNER:
      const deletedPartnerId = action.partner.id;
      const $$remainingPartners = $$state.get('$$partners').filterNot(function($$partner) {
        return deletedPartnerId === $$partner.get('id')
      });

      return $$state.merge({
        $$partners: $$remainingPartners
      });

    case actionTypes.UPDATE_PARTNER:
      const $$updatedPartner = Immutable.fromJS(action.partner);
      const updatedPartnerId = $$updatedPartner.get('id');
      const $$updatedPartners = $$state.get('$$partners').map(function($$partner) {
        if(updatedPartnerId === $$partner.get('id')) {
          return $$updatedPartner;
        }

        return $$partner;
      });

      return $$state.merge({
        $$partners: $$updatedPartners
      });

    case actionTypes.CREATE_NEW_PARTNER:
      let $$newPartner = Immutable.fromJS(action.newPartner);
      const $$newPartnerList = $$state.get('$$partners').unshift($$newPartner);

      return $$state.merge({
        $$partners: $$newPartnerList,
        selectedPartnerId: $$newPartner.get('id')
      });

    case actionTypes.SET_PARTNER_SORT_TYPE:
      return $$state.set('selectedSortType', action.newSortType);

    default: {
      return $$state;
    }
  }
}
