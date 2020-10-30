export default {
  setContent(state, data) { 
    state.content = data
  },
  setLoading(state, val) {
    state.showLoading = val
  },
  setRoutes(state, data) {
    state.routes = data
  },
  setWebviewSrc(state, src) {
    state.webviewSrc = src
  },
  SET_LOADING(state, val) {
    state.showLoading = val
  },
  SET_MENU(state, {authMenuAll, authCodeList, isAllPerm}) {
    state.menuList = JSON.parse(JSON.stringify(authMenuAll)) // 保存菜单
    state.permissionCodeList = authCodeList // 保存权限code数组
    state.hasAllRight = isAllPerm // 保存是否拥有全部权限
  },
  SET_SEARCHPARAMS(state, searchParams) {
    state.listSearchParams[searchParams.routeName] = JSON.parse(JSON.stringify(searchParams))
  },

  SET_CHECKEDLIST(state, list) { // 列表自定义字段的选中列表 
    state.checkedList = list
  },
  SET_OPENKEYS(state, openKeys){
    state.openKeys = openKeys
  },
  SET_DEFAULTMENU_STATUS(state, data) { // 菜单的默认展开、选中状态
    state.defaultMenuStatus = data
  },
  SET_TABNAME(state, data) {
    state.tabName = data
  },
  SET_USERNAME(state, name) {
    state.userName = name
  },
  SET_USERINFO(state, userInfo) {
    state.userInfos = JSON.parse(JSON.stringify(userInfo))
  },
  SET_CLEAR(state) {
    state.token = null
    state.showLoading = false
    state.menuList = []
    state.permissionCodeList = []
    state.hasAllRight = false
    state.userName = ''
    state.userInfos = null
  },
  SET_TABNAME(state, tabName) {
    state.tabName = tabName
  },
}
