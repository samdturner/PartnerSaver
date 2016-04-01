import request from 'axios';
import metaTagsManager from './metaTagsManager';

const TASKS_URL = 'api/tasks';
const PARTNERS_URL = 'api/partners';

export default {

  fetchTasks(params) {
    return request({
      method: 'GET',
      url: TASKS_URL,
      params: params,
      responseType: 'json'
    });
  },

  postTask(params) {
    return request({
      method: 'POST',
      url: TASKS_URL,
      params: params,
      responseType: 'json'
    });
  },

  updateTask(params) {
    const taskPutUrl = TASKS_URL + "/" + params.id;
    return request({
      method: 'PUT',
      url: taskPutUrl,
      params: params,
      responseType: 'json'
    });
  },

  deleteTask(params) {
    const taskDeleteUrl = TASKS_URL + "/" + params.id;
    return request({
      method: 'DELETE',
      url: taskDeleteUrl,
      params: params,
      responseType: 'json'
    });
  },

  fetchPartners(params) {
    return request({
      method: 'GET',
      url: PARTNERS_URL,
      params: params,
      responseType: 'json'
    });
  },

  deletePartner(params) {
    const partnerDeleteUrl = PARTNERS_URL + "/" + params.id;
    return request({
      method: 'DELETE',
      url: partnerDeleteUrl,
      params: params,
      responseType: 'json'
    });
  },

  putPartner(params) {
    const partnerPutUrl = PARTNERS_URL + "/" + params.id;
    return request({
      method: 'PUT',
      url: partnerPutUrl,
      params: params,
      responseType: 'json'
    });
  }
};
