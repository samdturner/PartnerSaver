import Immutable from 'immutable';
import redux from 'redux';

import moment from 'moment';

import * as actionTypes from '../constants/partnersConstants';

export const $$initialState = Immutable.fromJS({
  $$partners: []
});

export default function partnersReducer($$state = $$initialState, action = null) {
  const { type } = action;

  switch(action.type) {
    case actionTypes.FETCH_PARTNERS_SUCCESS:
      return $$state.merge({
        $$tasks: Immutable.fromJS(action.partners)
      });

    default: {
      return $$state;
    }
  }
}
