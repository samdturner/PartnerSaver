import request from 'axios';
import metaTagsManager from './metaTagsManager';

const TASKS_URL = 'api/tasks';

export default {

  fetchTasks(params) {
    return request({
      method: 'GET',
      url: TASKS_URL,
      params: params,
      responseType: 'json',
    });
  }

};
