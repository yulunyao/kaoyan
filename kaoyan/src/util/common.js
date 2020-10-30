
// import Router from '@/router'
import Store from '@/store'
// import { List } from 'ant-design-vue'
import Vue from 'vue' 

/** 公共方法 */
export default {
  /**
     * 在深层数据结构中取值（为了替代类似 res && res.data && res.data.content这种写法）
     * @param {Object} obj [必填-需要取值的目标对象（例：res）]
     * @param {String} path [必填-数据结构路径（例：'data.content'）]
     * @param {Any} defaultValue [可选-如果取不到值则默认返回该值]
     */
  confirm(obj, path, defaultValue = null) {
    if (!obj || typeof(obj) != 'object' || !path || typeof(path) != 'string') return
    const reducer = (accumulator, currentValue) =>
      (accumulator && accumulator[currentValue]) ?
        accumulator[currentValue] :
        defaultValue

    const path2 = path.split('.')
    return path2.reduce(reducer, obj)
  },
  /**
     * 判断一维数组中是否存在某个值
     * @param {String} value 需要校验的字符串
     * @param {Array} validList 被查找的一维数组
     * @return {Boolean}   是否存在的结果
     */
  oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true
      }
    }
    return false
  },
  /**
     * 密码校验(6位以上数字字母的组合)
     * @param {String} txt [需校验的文本]
     */
  checkPassword(num) {
    if (!num && num != 0) return false
    const filter = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/
    return filter.test(num)
  },
  /**
     *  -----  柯里化版本 （为了不再重复输入obj这个参数） -----
     * 在深层数据结构中取值（为了替代类似 res && res.data && res.data.content这种写法）
     * @param {Object} obj [必填-需要取值的目标对象（例：res）]
     */
  confirm_currying(obj) {
    if (!obj || typeof(obj) != 'object') return
    return (path, defaultValue = null) => {
      if (!path || typeof(path) != 'string') return
      const reducer = (accumulator, currentValue) =>
        (accumulator && accumulator[currentValue]) ?
          accumulator[currentValue] :
          defaultValue
      path2 = path.split('.')
      return path2.reduce(reducer, obj)
    }
  },

  /**
     * 转换为金钱格式(千分位且保留两位小数)
     * @param {Number | String} num [需转换的数字或字符串]
     */
  toMoney(num) {
    if (!num) {
      return 0.00
    }
    num2 = this.toFloat(num).toFixed(2)
    const arr = num2.toString().split('.')
    let int = (arr[0] || 0).toString(),
      result = ''
    while (int.length > 3) {
      result = ',' + int.slice(-3) + result
      int = int.slice(0, int.length - 3)
    }
    if (int) {
      result = int + result
    }
    return `${result}.${arr[1]}`
  },

  /**
     * 手机号码校验
     * @param {String} num [需校验的手机号码]
     */
  checkPhone(num) {
    if (!num) return false
    const filter = /^1[3-9][0-9]{9}$/
    return filter.test(num)
  },

  /**
     * 固定电话号码校验
     * @param {String} num [需校验的固话]
     */
  checkTel(num) {
    if (!num) return false
    const filter = /^(?:0[1-9][0-9]{1,2}-)?[2-8][0-9]{6,7}$/
    return filter.test(num)
  },

  /**
     * 身份证号码校验
     * @param {String} num [需校验的身份证号码]
     */
  checkID(num) {
    if (!num) return false
    const filter = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
    return filter.test(num)
  },

  /**
     * 数字校验(整数或者小数)
     * @param {String} num [需校验的数字]
     */
  checkNumber(num) {
    if (!num && num != 0) return false
    const filter = /^[0-9]+\.{0,1}[0-9]{0,2}$/
    return filter.test(num)
  },

  /**
     * 文本校验(只能为中文、英文、数字组合，不允许其他特殊符号)
     * @param {String} txt [需校验的文本]
     */
  checkContent(txt) {
    const filter = /^[\u4E00-\u9FA5A-Za-z0-9]+$/
    return filter.test(txt)
  },
  /**
     * 将当前列表搜索条件，以及分页存储vuex
     * @param {String} routeName 要存储搜索条件的列表页面路由名称
     * @param {Object} page 分页信息
     * @param {Object} param 搜索参数
     */
  storeSearchParams(routeName, page, param) {
    if (!!routeName && !!page && !!param) {
      const searchParams = {
        'routeName': routeName,
        'params': param,
        'pagination': page
      }
      Store.commit('SET_SEARCHPARAMS', searchParams)
    }
  },
  /**
   *     将当前的列表自定义字段 checked 的列表存储
   *
   */

  storeCheckedList(list) {
    if (!!list) {
      // Store.commit('SET_CHECKEDLIST', [])
      Store.commit('SET_CHECKEDLIST', list)
    }
  },
  // 顿号隔开各个选项的正则校验
  validateCode(rule, value, callback) {
    if (!value || value == undefined || value.split(',').join('').length === 0) {
      callback('选项不能为空!')
    } else {
      if (/^\、|(\、{2,})|\、$/.test(value)) {
        callback('请输入正确的选项并用顿号 "、" 隔开!不能用顿号开头和结尾')
      } else{
        callback()
      }
    }
  },
  //多选，单选，下拉 为已定义的选项
  validateDef(rule, value, callback) {
    if (!value || value == undefined) {
      callback()
    } else {
      if ( /^\、|(\、{2,})|\、$/.test(value)) {
        callback('请输入正确的选项并用顿号 "、" 隔开!不能用顿号开头和结尾')
      } else{
        callback()
      }
    }
  },
  //保留两位小数正则
  validateNum2(rule, value, callback) {
    if (!value || value == undefined || value.split(',').join('').length === 0) {
      callback()
    } else {
      if ( /^-?(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/.test(value)) {
        callback()
      } else{
        callback('保留两位小数')
      }
    }
  },
  // 保留一位小数正则
  validateNum1(rule, value, callback) {
    if (!value || value == undefined || value.split(',').join('').length === 0) {
      callback()
    } else {
      if ( /^-?(([1-9]+)|([0-9]+\.[0-9]{1}))$/.test(value)) {
        callback()
      } else{
        callback('保留一位小数')
      }
    }
  },
  // 纯数字正则
  validateNum(rule, value, callback) {
    if (!value || value == undefined) {
      callback()
    } else {
      if ( /^-?[1-9]\d*$/.test(value)) {
        callback()
      } else{
        callback('只能输入整数')
      }
    }
  },
  //  将各个table中选中列的展示项储存cookie
  //      tbl 为表名, selKeysList为选中的项 ,allKeysList 为全部选项
  saveColumnsCookie(tbl, selKeysList, allKeysList){
    const arr = []
    selKeysList.forEach(col => {
      allKeysList.forEach(item => {
        if (col == item.key) {
          arr.push(
            {
              'key': col,
              'keyName': item.keyName,
            }
          )
        }
      })
    })
    Vue.prototype.$cookie.set(tbl, arr)
  },
}
