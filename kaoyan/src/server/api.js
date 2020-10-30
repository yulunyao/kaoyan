let BASE_URL = 'http://49.234.4.115:7001/api/v2'

export default {
  /**
   * 各类请求的BASE_URL
   */
  BASE_URL, 
  POST_LOGIN: BASE_URL + '/users/login',
  POST_USER_INFO: BASE_URL + '/users/token',
  POST_SUBJECTS: BASE_URL + '/subjects'
}
