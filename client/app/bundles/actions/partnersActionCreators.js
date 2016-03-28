import requestsManager from 'libs/requestsManager';
import * as actionTypes from '../constants/partnersConstants';

export function fetchPartnersSuccess(partners) {
  return {
    type: actionTypes.FETCH_TASKS_SUCCESS,
    partners
  }
}

export function getPartners(params) {
  return dispatch => {
    return(
      requestsManager
        .fetchPartners(params)
        .then(res => dispatch(fetchPartnersSuccess(res.data)))
    )
  }
}
