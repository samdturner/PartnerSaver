import requestsManager from 'libs/requestsManager';
import * as actionTypes from '../constants/partnersConstants';

export function fetchPartnersSuccess(partners) {
  return {
    type: actionTypes.FETCH_PARTNERS_SUCCESS,
    partners
  }
}

export function setSelectedPartnerId(partnerId) {
  return {
    type: actionTypes.SET_SELECTED_PARTNER_ID,
    selectedPartnerId: partnerId
  }
}

export function removePartner(partner) {
  return {
    type: actionTypes.REMOVE_PARTNER,
    partner
  }
}

export function updatePartner(partner) {
  return {
    type: actionTypes.UPDATE_PARTNER,
    partner
  }
}

export function createNewPartner(newPartner) {
  return {
    type: actionTypes.CREATE_NEW_PARTNER,
    newPartner
  }
}

export function setSortType(newSortType) {
  return {
    type: actionTypes.SET_PARTNER_SORT_TYPE,
    newSortType
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

export function deletePartner(partner) {
  return dispatch => {
    dispatch(removePartner(partner));
    return(
      requestsManager
        .deletePartner(partner)
    )
  }
}

export function putPartner(partner) {
  return dispatch => {
    return(
      requestsManager
        .putPartner(partner)
    )
  }
}

export function postPartner(partner) {
  return dispatch => {
    return(
      requestsManager
        .postPartner(partner)
        .then(res => dispatch(createNewPartner(res.data)))
    )
  }
}

export function sortPartners(params) {
  return dispatch => {
    dispatch(setSortType(params.selectedSortType));
    return(
      requestsManager
        .fetchPartners(params)
        .then(res => dispatch(fetchPartnersSuccess(res.data)))
    )
  }
}
