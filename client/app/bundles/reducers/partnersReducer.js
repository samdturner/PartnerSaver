import Immutable from 'immutable';
import redux from 'redux';

import moment from 'moment';

import * as actionTypes from '../constants/partnersConstants';

export const $$initialState = Immutable.fromJS({
  $$partners: [],
  selectedPartnerId: null
});

export default function partnersReducer($$state = $$initialState, action = null) {
  const { type } = action;

  switch(action.type) {
    case actionTypes.FETCH_PARTNERS_SUCCESS:
      return $$state.merge({
        $$tasks: Immutable.fromJS(action.partners)
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

    default: {
      return $$state;
    }
  }
}
