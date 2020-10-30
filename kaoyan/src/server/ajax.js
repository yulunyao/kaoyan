import axios from 'axios'
import qs from 'qs'
import api from './api'
import Store from '@/store'
import Cookie from '@/util/local-cookie'
import router from '@/router'
import Common from '@/util/common'
import { Modal } from 'ant-design-vue'

// 配置请求的根域名和超时时间
const Axios = axios.create({
  baseURL: api.BASE_URL,
  timeout: 150000,
})
const {CancelToken} = axios
let cancelRequest = null
let currentRouterName ='', currentApi='', currentMethod=''

// 处理请求状态码
const reponseCodeHandler = (res) => {
  const code = res.data && res.data.code
  if ('string' == typeof code) {
    if (code == '200') {

    } else if (code == '911') {
      Cookie.remove('token')
      Cookie.remove('refresh_token')
      
      router.push({name: 'login'})

    } else if (code == '900') {
      router.push({ name: 'noauth' })
    } else if (code == '429') {//同一对外IP，2s内请求超过100次
      router.push({ name: 'upperLimitErr' })
    }else if (code == '710' || code == '720') {
      if(Common.oneOf(res.config.method.toLocaleLowerCase(), ['post', 'put', 'delete'])){
        Modal.error({
          title: '提交错误',
          content: !res.data.msg?'':res.data.msg,
          okText: '确认',
          cancelText: '取消',
        })
      }
    }else if (code == '912') {
      //在refresh token 里的返回里已做处理，这里不做额外提示
    }else if (code == '500') {
      router.push({ name: 'networkErr' })
    } else{
      if(Common.oneOf(currentMethod.toLocaleLowerCase(), ['post', 'put', 'delete'])){
        Modal.error({
          title: '提交错误',
          content: '系统异常',
          okText: '确认',
          cancelText: '取消',
        })
      }
    }
  }
}

const showErrPage= (api, routername) => {
  if(Common.oneOf(routername, ['login', 'register', 'bindPhone'])){
    if(!Common.oneOf(api, ['/service-release/release/public/news'])){
      router.push({
        name: 'outerNetworkerr'
      })
    }
  }else if(!!routername && routername.length>0){
    router.push({
      name: 'innerNetworkerr'
    })
  }else{
    router.push({
      name: 'outerNetworkerr'
    })
  }
}

// 根据报错的状态码进行错误处理
const errorHandler = (err) => {
  const errStatus = (err.response && err.response.status) || (err.data && err.data.errcode)
  if (errStatus) {
    switch (errStatus) {
    case 404: // 网络请求不存在,跳转统一报错页面
      showErrPage(currentApi, currentRouterName)
      break
    /** 强说home页的请求报500就跳过去了，无法进行下一步操作，故此先注释掉 */
    // case 500:
    //   const code = err.response.data && err.response.data.code
    //   showErrPage(currentApi,currentRouterName)
    //   break
    default: // 其他错误，统一到网络异常页面
      showErrPage(currentApi, currentRouterName)
      break
    }
    /**超时了就跳转了且无法进行下一步操作，故此先注释掉 */
  // } else if (err.toString().indexOf('timeout') != -1) { // 统一到网络异常页面
  //   showErrPage(currentApi,currentRouterName)
  } else if (err.toString().indexOf('Network Error') != -1) { // 统一到网络异常页面
    showErrPage(currentApi, currentRouterName)
  }
}

Axios.interceptors.request.use(config => {
  const token = Cookie.get('token') || Store.state.token
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

Axios.interceptors.response.use(
  response => {
    if(response.status === 200){
      reponseCodeHandler(response)
      return Promise.resolve(response.data)
    }else{
      return Promise.resolve(response.data)
    }
  }, error => {
    if(currentMethod.toLowerCase() != 'get'){
      errorHandler(error)
    }
    return Promise.reject(error)
  }
)

/**
 * 请求
 * @param {String} method [请求方法]
 * @param {String} url [请求地址]
 * @param {Object} params [请求参数]
 * @param {String} contentType [请求头，默认为'application/json;charset=UTF-8']
 * @param {Boolean} hideLoading [隐藏请求时的loading图，默认为false]
 */
const request = ({ method, url, params, contentType = 'application/json;charset=UTF-8', hideLoading = false, routername }) => {
  if (!url || typeof(url) != 'string') {
    throw new Error('接口URL不正确')
  }
  // 存储当前调用接口所在的路由和API地址
  currentApi = url
  currentRouterName = !routername?'':routername
  currentMethod = method

  // transformResponse()执行完再执行then()。transformResponse函数用于提前处理返回的数据。返回的result对象比transformResponse函数的data对象包含的数据多。
  // if (method == 'get') {
  //   let timestamp = Date.now()
  //   url = (url.indexOf('?') != -1) ? (url + '&timestamp=' + timestamp) : (url + '?timestamp=' + timestamp)
  //   url = encodeURI(url) //针对IE下地址传值带中文，对其转义
  // }

  if (!params || typeof(params) == 'string' || typeof(params) == 'number') {
    params = {}
  }
  let config = {
    method,
    url,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': contentType,
    },
    cancelToken: new CancelToken((c) => {
      cancelRequest = c
    }),
  }
  if (method === 'GET') {
    config = Object.assign(config, { params })
  } else {
    if (contentType.toLowerCase().indexOf('x-www-form-urlencoded') >= 0) {
      config = Object.assign(config, { data: qs.stringify(params) })
    } else {
      config = Object.assign(config, { data: params })
    }
  }
  if (!hideLoading) {
    Store.commit('SET_LOADING', true)
  }

  return new Promise((resolve, reject) => {
    Axios(config)
      .then(res => {
        resolve(res)
        Store.commit('SET_LOADING', false)
      }).catch(err => {
        reject(err)
        Store.commit('SET_LOADING', false)
      })
  })
}

export default {
  /**
     * 取消请求
     * @param {String} txt [取消请求时需要显示在控制台的提示信息]
     */
  cancel(txt = '取消请求') {
    Store.commit('SET_LOADING', false)
    if (typeof(cancelRequest) === 'function') {
      return cancelRequest(txt)
    }
  },
  get(args) {
    return request({ method: 'GET', ...args })
  },
  post(args) {
    return request({ method: 'POST', ...args })
  },
  put(args) {
    return request({ method: 'PUT', ...args })
  },
  delete(args) {
    return request({ method: 'DELETE', ...args })
  },
  all(...ajaxs) {
    return Promise.all(ajaxs)
  },
}
