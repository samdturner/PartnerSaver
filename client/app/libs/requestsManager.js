import request from 'axios';
import metaTagsManager from './metaTagsManager';

const TASKS_URL = 'api/tasks';

export default {

  fetchTasks(params) {
    return request({
      method: 'GET',
      url: TASKS_URL,
      params: params,
      responseType: 'json'
    });
  },

  updateTask(params) {
    const putUrl = TASKS_URL + "/" + params.id;
    return request({
      method: 'PUT',
      url: putUrl,
      params: params,
      responseType: 'json'
    });
  },

  deleteTask(params) {
    const deleteUrl = TASKS_URL + "/" + params.id;
    return request({
      method: 'DELETE',
      url: deleteUrl,
      params: params,
      responseType: 'json'
    });
  }

};
