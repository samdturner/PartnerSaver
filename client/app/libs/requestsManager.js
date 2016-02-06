import request from 'axios';
import metaTagsManager from './metaTagsManager';

const TASKS_URL = 'tasks';

export default {

  /**
   * Retrieve list of entities from server using AJAX call.
   *
   * @returns {Promise} - Result of ajax call.
   */
  fetchTasks() {
    return request({
      method: 'GET',
      url: TASKS_URL,
      responseType: 'json',
    });
  }

  /**
   * Submit new entity to server using AJAX call.
   *
   * @param {Object} entity - Request body to post.
   * @returns {Promise} - Result of ajax call.
   */
  // submitEntity(entity) {
  //   return request({
  //     method: 'POST',
  //     url: API_URL,
  //     responseType: 'json',
  //     headers: {
  //       'X-CSRF-Token': metaTagsManager.getCSRFToken(),
  //     },
  //     data: entity,
  //   });
  // },

};
