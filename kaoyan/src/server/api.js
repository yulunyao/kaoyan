let BASE_URL = 'http://49.234.4.115:7001/api/v2'

export default {
  /**
   * 各类请求的BASE_URL
   */
  BASE_URL, 
  POST_LOGIN: BASE_URL + '/users/login',
  POST_USER_INFO: BASE_URL + '/users/token',
  POST_SUBJECTS: BASE_URL + '/subjects',
  GET_SUBJECTS_LIST: BASE_URL + '/subjects',
  POST_BOOKS_LIST: BASE_URL + '/subjects/book',
  POST_BOOKS_PAGE: BASE_URL + '/subjects/updatebook',
  GET_STUDY_HISTORY: BASE_URL + '/subjects/history',
  DELETE_SUBJECT: BASE_URL + '/subjects'
}
